import { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axios";
import { useAuth } from "./AuthContext";

/* ---------- TYPES ---------- */

export interface WishlistItem {
  _id: string;
  productId: string;
  productTitle: string;
  image: string;
  price: number;
  rating?: number;
  oldPrice?: number;
  Discount?: number;
}

export interface WishlistPayload {
  productId: string;
  productTitle?: string;
  image?: string;
  price?: number;
  rating?: number;
  oldPrice?: number;
  Discount?: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  toggleItem: (payload: WishlistPayload) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => Promise<void>;
  loading: boolean;
}

/* ---------- CONTEXT ---------- */

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

/* ---------- PROVIDER ---------- */

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  /* 🔹 Fetch wishlist ONCE when user logs in */
  useEffect(() => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await api.get("/wishlist");
        setItems(res.data?.wishlist ?? []);
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isAuthenticated]);

  /* 🔹 Toggle (Add / Remove) */
  const toggleItem = async (payload: WishlistPayload) => {
    if (!isAuthenticated) {
      throw new Error("NOT_AUTHENTICATED");
    }

    const { productId } = payload;

    if (isInWishlist(productId)) {
      // optimistic remove
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      await api.delete(`/wishlist/${productId}`);
    } else {
      // optimistic add
      const res = await api.post("/wishlist", payload);
      setItems((prev) => [res.data.wishlistItem, ...prev]);
    }
  };

  /* 🔹 Remove only (used by Wishlist page ❌ button) */
  const removeItem = async (productId: string) => {
    if (!isAuthenticated) return;

    // optimistic UI
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    await api.delete(`/wishlist/${productId}`);
  };

  /* 🔹 Clear */
  const clearWishlist = async () => {
    if (!isAuthenticated) return;
    await api.delete("/wishlist");
    setItems([]);
  };

  /* 🔹 Check */
  const isInWishlist = (productId: string) =>
    items.some((i) => i.productId === productId);

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleItem,
        removeItem,
        isInWishlist,
        clearWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

/* ---------- HOOK ---------- */

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return ctx;
};
