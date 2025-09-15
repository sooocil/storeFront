import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return data;
};

export const useProducts = (): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
