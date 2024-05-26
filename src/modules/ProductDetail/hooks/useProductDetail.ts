import { httpsClient } from "@/services/httpClient";
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
    productId: string | null;
}

export const useProductDetail = ({ productId }: IProps) => {
  return useQuery<IProduct>({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) {
        throw new Error("Product ID is null");
      }

      try {
        const token = localStorage.getItem("token");
        const response = await httpsClient.get(`/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error: any) {
        console.error("Error fetching product details:", error);
        throw new Error(error.message || "Error fetching product details");
      }
    },
    enabled: !!productId,
  });
};
