"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { useCartStore } from "@/store/cartStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import CheckoutModal from "@/components/CheckoutModal";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: product, isLoading, isError } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (isLoading)
    return (
      <Card>
        <Skeleton className="h-96 w-full max-w-3xl mx-auto mt-10" />
        <Skeleton className="h-80 w-full object-contain mb-4" />
      </Card>
    );

  if (isError || !product)
    return <div className="text-center mt-10">Product not found.</div>;

  const handleBuyNow = () => {
    addToCart(product);
    setCheckoutOpen(true); // open checkout modal
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-96 object-contain"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-3xl font-bold text-teal-600">${product.price}</p>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Checkout Modal */}
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
