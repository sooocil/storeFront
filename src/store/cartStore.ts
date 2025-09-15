
// here is store for storing cart items with zustand 
import { create } from "zustand";
import { Product } from "@/types/product";

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
}));
