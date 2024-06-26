import http from "@/services/http";
import { useQuery } from "@tanstack/react-query";

export interface IProduct {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  mainimg: string;
  price: string;
  stock_quantity: number;
  category: string;
  brand: string;
}

interface IProps {
  productId: string;
}

export const useProductDetail = ({ productId }: IProps) => {
  return useQuery<IProduct>({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        const response = await http.request.get(
          `/products/${productId}/`
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error.message || "Error fetching product details");
      }
    },
    enabled: !!productId,
  });
};
