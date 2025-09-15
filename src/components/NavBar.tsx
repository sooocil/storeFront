"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setUserEmail(localStorage.getItem("userEmail"));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      console.log("Searching for:", search);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div
          onClick={() => {
            window.location.href = "/";
          }}
          className="hover:cursor-pointer cursor-pointer text-2xl font-bold text-teal-600"
        >
          Arcodify
        </div>

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
            className="bg-black text-white px-4 rounded-r hover:bg-zinc-800 transition hover:cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-4">
          {mounted && userEmail ? (
            <>
              <button
                className="ml-4 px-3 py-1 bg-red-200 rounded"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("userEmail");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>

              {userEmail && <span className="ml-2">{userEmail}</span>}
            </>
          ) : (
            <button
              className="ml-4 px-3 py-1 bg-zinc-800 text-white rounded"
              onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userEmail");
                window.location.href = "/signup";
              }}
            >
              Signup
            </button>
          )}

          <div
            className="relative cursor-pointer flex items-center gap-2"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart size={24} />
            {mounted && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
