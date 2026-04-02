import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, action: "increase" | "decrease") => void;
  clearCart: () => void;
  total: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  /* ---------------- FETCH CART ---------------- */
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get("/cart");

      return res.data.cartItems.map((item: any) => ({
        id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.images[0],
        quantity: item.quantity,
      }));
    },
  });

  const items = data || [];

  /* ---------------- ADD ITEM ---------------- */
  const addMutation = useMutation({
    mutationFn: async (item: CartItem) => {
      return api.post("/cart/add", {
        productId: item.id,
        quantity: item.quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const addItem = (item: CartItem) => {
    addMutation.mutate(item);
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete("/cart/remove", { data: { productId: id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeItem = (id: string) => {
    removeMutation.mutate(id);
  };

  /* ---------------- UPDATE QUANTITY ---------------- */
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: string;
      action: "increase" | "decrease";
    }) => {
      return api.patch("/cart/update", { productId: id, action });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const updateQuantity = (id: string, action: "increase" | "decrease") => {
    updateMutation.mutate({ id, action });
  };

  /* ---------------- CLEAR CART ---------------- */
  const clearCart = async () => {
    await api.delete("/cart/clear");
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  const total = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
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