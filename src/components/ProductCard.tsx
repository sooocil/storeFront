"use client";

import { Product } from "@/types/product";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col">
      <Link
        href={`/product/${product.id}`}
        className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-2"
        />
        <h3 className="font-semibold text-sm sm:text-base">{product.title}</h3>
        <p className="text-teal-600 font-bold mt-auto">${product.price}</p>
      </Link>
    </div>
  );
}
