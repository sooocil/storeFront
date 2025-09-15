


"use client";

//here this page will show all product fetched from api "..."

import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <div className="p-4">
      
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
