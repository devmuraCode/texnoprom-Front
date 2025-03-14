import { http } from "@/services";
import { useQuery } from "@tanstack/react-query";

export interface IProduct {
  id: string;
  discounted_price: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  mainimg: string;
  stock_quantity: number;
  discount_percent: string;
  package_code: string;
  code: string;
  price: string;
  installment: string;
  vat_percent: string;
  brandcategory: string;
  brands: string;
  category: string;
  brand: string;
}

interface IProps {
  categorySlug: string | undefined;
  page?: number;
}

export const useProductByCategory = ({ categorySlug, page }: IProps) => {
  return useQuery({
    queryKey: ["category", categorySlug, page],
    queryFn: async () => {
      if (!categorySlug) return [];
      try {
        const response = await http.request.get(
          `/products/categories/${categorySlug}/?page=${page}`
        );
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching products by category.");
      }
    },
    enabled: !!categorySlug && !!page,
  });
};
