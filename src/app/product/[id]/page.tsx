"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: product, isLoading, isError } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError || !product) return <div className="text-center mt-10">Product not found.</div>;

  const handleBuyNow = () => {
    addToCart(product);
    alert("Redirect to checkout (mock)"); // In assessment, checkout modal can appear here
  };

  return (
    <div className="p-4 max-w-3xl mx-auto flex flex-col gap-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-contain mb-4"
      />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-teal-600 font-bold text-xl">${product.price}</p>
      <p className="text-gray-700">{product.description}</p>

      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
