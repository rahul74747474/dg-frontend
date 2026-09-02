import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (
    id: string,
    actionOrQty: "increase" | "decrease" | number
  ) => void;
  clearCart: () => Promise<void>;
  total: number;
  cartCount: number;
  distinctCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  // Debounce timers for per-item rapid quantity updates
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});
  // Confirmed snapshot prior to rapid clicking sequence for rollback
  const confirmedSnapshots = useRef<Record<string, number>>({});

  /* ---------------- FETCH CART ---------------- */
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const res = await api.get("/cart");
      if (!res.data?.cartItems || !Array.isArray(res.data.cartItems)) {
        return [];
      }

      return res.data.cartItems
        .filter((item: any) => item.productId)
        .map((item: any) => ({
          id: item.productId._id || item.productId,
          name: item.productId.name || "Product",
          price: Number(item.productId.price) || 0,
          image:
            item.productId.images?.[0] ||
            item.productId.image ||
            "https://placehold.co/100x100?text=Product",
          quantity: Math.max(1, Number(item.quantity) || 1),
        }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const items: CartItem[] = data || [];

  /* ---------------- ADD ITEM (OPTIMISTIC) ---------------- */
  const addMutation = useMutation({
    mutationFn: async (item: CartItem) => {
      const targetId = item.id || (item as any).productId;
      if (!targetId) {
        throw new Error("Cannot add item to cart without a valid productId");
      }

      return api.post("/cart/add", {
        productId: targetId,
        quantity: item.quantity || 1,
      });
    },
    onMutate: async (newItem: CartItem) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // Snapshot previous cart state for rollback
      const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]) || [];

      const targetId = newItem.id || (newItem as any).productId;
      const existingItemIndex = previousCart.findIndex((i) => i.id === targetId);

      let updatedCart: CartItem[];

      if (existingItemIndex > -1) {
        updatedCart = previousCart.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + (newItem.quantity || 1) }
            : i
        );
      } else {
        updatedCart = [
          ...previousCart,
          {
            id: targetId,
            name: newItem.name,
            price: newItem.price,
            image: newItem.image,
            quantity: newItem.quantity || 1,
          },
        ];
      }

      // Optimistically update cache immediately (0ms lag for navbar and cart)
      queryClient.setQueryData<CartItem[]>(["cart"], updatedCart);

      return { previousCart };
    },
    onError: (err: any, _newItem, context) => {
      // Rollback to previous confirmed state
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      toast.error(err.response?.data?.message || "Failed to add item to cart");
    },
    onSuccess: () => {
      // Invalidate quietly in background if desired, or keep optimistic data
    },
  });

  const addItem = useCallback(
    async (item: CartItem) => {
      return addMutation.mutateAsync(item).then(() => {});
    },
    [addMutation]
  );

  /* ---------------- REMOVE ITEM (OPTIMISTIC) ---------------- */
  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete("/cart/remove", { data: { productId: id } });
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]) || [];

      queryClient.setQueryData<CartItem[]>(
        ["cart"],
        previousCart.filter((i) => i.id !== id)
      );

      return { previousCart };
    },
    onError: (err: any, _id, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      toast.error(err.response?.data?.message || "Failed to remove item");
    },
  });

  const removeItem = useCallback(
    async (id: string) => {
      // Clear any pending debounce timer for this item
      if (debounceTimers.current[id]) {
        clearTimeout(debounceTimers.current[id]);
        delete debounceTimers.current[id];
      }
      delete confirmedSnapshots.current[id];
      return removeMutation.mutateAsync(id).then(() => {});
    },
    [removeMutation]
  );

  /* ---------------- PERSIST QUANTITY TO BACKEND ---------------- */
  const persistQuantityToBackend = useCallback(
    async (productId: string, targetQuantity: number) => {
      try {
        await api.patch("/cart/update", {
          productId,
          quantity: targetQuantity,
        });
        // Success: clear snapshot tracking
        delete confirmedSnapshots.current[productId];
      } catch (err: any) {
        // Rollback this specific product to its confirmed snapshot
        const lastConfirmed = confirmedSnapshots.current[productId];
        if (typeof lastConfirmed === "number") {
          queryClient.setQueryData<CartItem[]>(["cart"], (current) => {
            if (!current) return [];
            if (lastConfirmed <= 0) {
              return current.filter((i) => i.id !== productId);
            }
            return current.map((i) =>
              i.id === productId ? { ...i, quantity: lastConfirmed } : i
            );
          });
          delete confirmedSnapshots.current[productId];
        }
        toast.error(
          err.response?.data?.message || "Failed to update quantity on server"
        );
      }
    },
    [queryClient]
  );

  /* ---------------- UPDATE QUANTITY (INSTANT OPTIMISTIC + DEBOUNCED PERSISTENCE) ---------------- */
  const updateQuantity = useCallback(
    (id: string, actionOrQty: "increase" | "decrease" | number) => {
      const currentCart = queryClient.getQueryData<CartItem[]>(["cart"]) || [];
      const currentItem = currentCart.find((i) => i.id === id);

      if (!currentItem) return;

      // Record original confirmed quantity before rapid clicking starts
      if (confirmedSnapshots.current[id] === undefined) {
        confirmedSnapshots.current[id] = currentItem.quantity;
      }

      let nextQuantity: number;
      if (typeof actionOrQty === "number") {
        nextQuantity = actionOrQty;
      } else if (actionOrQty === "increase") {
        nextQuantity = currentItem.quantity + 1;
      } else {
        nextQuantity = currentItem.quantity - 1;
      }

      // 1. INSTANT OPTIMISTIC LOCAL UPDATE
      let updatedCart: CartItem[];
      if (nextQuantity <= 0) {
        updatedCart = currentCart.filter((i) => i.id !== id);
      } else {
        updatedCart = currentCart.map((i) =>
          i.id === id ? { ...i, quantity: nextQuantity } : i
        );
      }

      queryClient.setQueryData<CartItem[]>(["cart"], updatedCart);

      // 2. DEBOUNCED FINAL-QUANTITY SYNC (350ms)
      // Rapid clicks (+ + + +) repeatedly cancel the previous timer
      // Only the final intended quantity is sent to MongoDB
      if (debounceTimers.current[id]) {
        clearTimeout(debounceTimers.current[id]);
      }

      debounceTimers.current[id] = setTimeout(() => {
        delete debounceTimers.current[id];
        persistQuantityToBackend(id, nextQuantity);
      }, 350);
    },
    [queryClient, persistQuantityToBackend]
  );

  /* ---------------- CLEAR CART ---------------- */
  const clearCart = useCallback(async () => {
    // Clear all pending timers
    Object.values(debounceTimers.current).forEach(clearTimeout);
    debounceTimers.current = {};
    confirmedSnapshots.current = {};

    queryClient.setQueryData<CartItem[]>(["cart"], []);

    try {
      await api.delete("/cart/clear");
    } catch {
      // Even if clear endpoint fails or doesn't exist, invalidate cache
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  }, [queryClient]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  /* ---------------- CALCULATIONS (SINGLE SOURCE OF TRUTH) ---------------- */
  const total = useMemo(
    () =>
      items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      ),
    [items]
  );

  const cartCount = useMemo(
    () => items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    [items]
  );

  const distinctCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        cartCount,
        distinctCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}