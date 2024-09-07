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
  vat_percent: string,
  brandcategory: string,
  brands: string
  installment: string;
  category: string;
  brand: string;
}
interface IProps {
  brandId: string | undefined;
}

export const useProductByBrandCategory = ({ brandId }: IProps) => {
  return useQuery<IProduct[]>({
    queryKey: ["productcategory", brandId],
    queryFn: async () => {
      try {
        const response = await http.request.get(`/products/brandscategory/${brandId}`);
        if (response && response.data) {
          return response.data.results;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: ");
      }
    },
    enabled: !!brandId,
  });
};
