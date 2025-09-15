
// here is store for storing cart items with zustand 
import { create } from "zustand";
import { Product } from "@/types/product";

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: typeof window !== "undefined" 
    ? JSON.parse(localStorage.getItem("cart") || "[]") 
    : [],
  
  addToCart: (product) => {
    set((state) => {
      const updatedCart = [...state.cart, product];
      if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  removeFromCart: (id: number) =>
  set((state) => {
    const index = state.cart.findIndex(item => item.id === id);
    if (index === -1) return state;
    const newCart = [...state.cart];
    newCart.splice(index, 1); 
    return { cart: newCart };
  }),


  clearCart: () => {
    set(() => {
      if (typeof window !== "undefined") localStorage.removeItem("cart");
      return { cart: [] };
    });
  },
}));
