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

export const useAllBrands = () => {
  return useQuery<IBrand[]>({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const response = await httpsClient.get(
          `/brands/`
        );
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: ");
      }
    }
  });
};
