import { httpsClient } from "@/httpClient/httpClient";
import { useQuery } from "@tanstack/react-query";

const initialCategoryId = "074a5620-01cb-4f47-a37b-2c97fe1259cf"; 

export interface IBrand {
    id: string,
    created_at: string,
    updated_at: string,
    title: string,
    logo: string,
    category_id: string
}

interface IProps {
  categoryId: string | null;
}

export const useBrands = ({ categoryId } : IProps) => {

  const categoryToLoad = categoryId || initialCategoryId;

  return useQuery<IBrand[]>({
    queryKey: ["category", categoryToLoad],
    queryFn: async () => {
      try {
        const response = await httpsClient.get(`/brands/category/${categoryToLoad}`);
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: " );
      }
    },
    enabled: !!categoryToLoad
  });
};
