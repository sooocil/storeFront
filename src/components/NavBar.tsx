"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CartModal from "./CartModal";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { data: products = [], isLoading } = useProducts();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setUserEmail(localStorage.getItem("userEmail"));
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleResultClick = (id: number) => {
    setSearch("");
    window.location.href = `/product/${id}`;
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative">
      <div
        onClick={() => (window.location.href = "/")}
        className="cursor-pointer text-2xl font-bold text-teal-600"
      >
        Arcodify
      </div>

      <div className="flex flex-1 mx-4 max-w-md relative">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full"
        >
          <Input
            type="text"
            placeholder="Search all products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-l-md border-gray-300 focus:border-teal-600 focus:ring-teal-600"
          />
          <Button
            type="submit"
            className="bg-black text-white rounded-r-md hover:bg-zinc-800 transition"
          >
            Search
          </Button>
        </form>

        {search && (
          <Card className="absolute top-full mt-2 w-full max-h-64 overflow-y-auto z-10 shadow-lg border border-gray-200">
            <CardContent className="p-2">
              {isLoading ? (
                <p className="text-gray-500 text-center">Loading products...</p>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="p-3 hover:bg-muted/50 cursor-pointer rounded-md transition-colors flex items-center gap-2"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 object-contain rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900 truncate">{product.title}</p>
                      <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No products found</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex items-center gap-4">
        {mounted && userEmail ? (
          <>
            <Button
              onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userEmail");
                window.location.href = "/login";
              }}
              className="bg-red-200 text-red-800 hover:bg-red-300"
            >
              Logout
            </Button>
            <span className="text-gray-700">{userEmail}</span>
          </>
        ) : (
          <Button
            onClick={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("userEmail");
              window.location.href = "/signup";
            }}
            className="bg-zinc-800 text-white hover:bg-zinc-700"
          >
            Signup
          </Button>
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

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}
