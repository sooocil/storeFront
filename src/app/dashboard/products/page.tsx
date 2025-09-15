"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const { data: products = [], isLoading, error } = useProducts();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Products</h1>
      <Input
        type="text"
        placeholder="Search products by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full max-w-md"
      />
      <div className="rounded-md border border-gray-200 shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-600">Title</TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-600">Price</TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-600">Category</TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-600">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow key="loading">
                <TableCell colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  Loading products...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow key="error">
                <TableCell colSpan={4} className="px-4 py-2 text-center text-red-500">
                  Error: {error.message}
                </TableCell>
              </TableRow>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <TableRow
                  key={product.id}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                  } hover:bg-muted/50 transition-colors`}
                >
                  <TableCell className="px-4 py-2 font-medium text-gray-900">{product.title}</TableCell>
                  <TableCell className="px-4 py-2 text-gray-700">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-2 text-gray-700">{product.category}</TableCell>
                  <TableCell className="px-4 py-2 text-gray-700">{product.rating.rate.toFixed(1)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="no-products">
                <TableCell colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsPage;
