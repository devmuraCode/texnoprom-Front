import { http } from "@/services";
import { useQuery } from "@tanstack/react-query";

export interface IProduct {
  id: string,
  discounted_price: string,
  created_at: string,
  updated_at: string,
  title: string,
  description: string,
  mainimg: string,
  stock_quantity: number,
  discount_percent: string,
  package_code: string,
  code: string,
  price: string,
  installment: string;
  vat_percent: string,
  brandcategory: string,
  brands: string
  category: string;
  brand: string;
}
interface IProps {
  categoryId: string | null;
}

export const useProductByCategory = ({ categoryId }: IProps) => {
  return useQuery<IProduct[]>({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      try {
        const response = await http.request.get(`/products/categories/${categoryId}`);
        if (response && response.data) {
          return response.data.results;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: ");
      }
    },
    enabled: !!categoryId,
  });
};
