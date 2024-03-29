import { httpsClient } from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";

export interface IBrand {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  logo: string;
  category_id: string;
}

interface IProps {
  categoryId: string | null;
}

export const useBrands = ({ categoryId }: IProps) => {
  return useQuery<IBrand[]>({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      try {
        const response = await httpsClient.get(
          `/brands/category/${categoryId}`
        );
        if (response && response.data) {
          return response.data;
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
