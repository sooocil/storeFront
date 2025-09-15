"use client";


import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

import { useProducts } from "@/hooks/useProducts";

export default function HomePage() {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading)

    // while data is loading/fetching show skeleton from shadcn ui 
    return (
      <div>
        <div>
          <div className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-8 w-20 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-64 shadow-sm w-full" />
            ))}
          </div>
          <div className="text-center mt-4">
            <Skeleton className="h-6 w-1/4 mx-auto" />
          </div>
        </div>
      </div>
    );
  if (isError) return <div>Error loading products.</div>;

  //h this featured will show only 8 products from top
  const featured = products?.slice(0, 8);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {featured?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <a
        href="/products"
        className="text-teal-600 mt-4 text-center block hover:underline"
      >
        View All Products
      </a>
    </div>
  );
}
