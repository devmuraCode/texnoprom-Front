import { httpsClient } from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";

export interface IProduct {
    id: string,
    created_at: string,
    updated_at: string,
    title: string,
    description: string,
    mainimg: string,
    price: string,
    stock_quantity: number,
    category: string,
    brand: string
}
interface IProps {
    productId: string | null;
}



export const useProductDetail = ({ productId } : IProps) => {
  return useQuery<IProduct[]>({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        const response = await httpsClient.get(`/products/${productId}`);
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: " );
      }
    },
  });
};
