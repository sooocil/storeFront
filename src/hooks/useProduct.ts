

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/types/product";

export const fetchProduct = async (id: string): Promise<Product> => {

  const { data } = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
  
  return data;
};

export const useProduct = (id: string): UseQueryResult<Product, Error> =>
  useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
