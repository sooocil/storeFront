"use client";

//here this page will show all product fetched from api "..."

import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calculate pagination
  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products?.slice(startIndex, endIndex);

  if (isLoading)
    return (
      <div>
        <div className="mb-4"></div>
        <Skeleton className="h-8 w-80 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-64 shadow-sm w-full" />
          ))}
        </div>
      </div>
    );
  if (isError) return <div>Error loading products.</div>;

  if (!products || products.length === 0) {
    return <div className="p-4 text-center">No products found.</div>;
  }
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
