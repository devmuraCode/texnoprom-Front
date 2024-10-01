import { http } from "@/services";
import { useQuery } from "@tanstack/react-query";

export interface IProduct {
  id: string;
  discounted_price: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  installment: string;
  mainimg: string;
  stock_quantity: number;
  discount_percent: string;
  package_code: string;
  code: string;
  price: string;
  vat_percent: string;
  category: string;
  brandcategory: string;
  brands: string;
}

export const useGetDayProduct = () => {
  return useQuery<IProduct[]>({
    queryKey: ["productByDay"],
    queryFn: async () => {
      try {
        const response = await http.request.get(`/products/dayproduct/`);
        if (response && response.data) {
          return response.data[0].products;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: ");
      }
    },
  });
};
