"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      console.log("Searching for:", search);
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <div className="text-2xl font-bold text-teal-600">Arcodify</div>

      <form onSubmit={handleSearch} className="flex flex-1 mx-4 max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-l px-3 py-1 focus:outline-teal-600"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 rounded-r hover:bg-teal-700"
        >
          Search
        </button>
      </form>

      <div className="relative cursor-pointer">
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>
    </nav>
  );
}
