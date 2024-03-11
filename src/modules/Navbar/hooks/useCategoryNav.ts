import { httpsClient } from "@/httpClient/httpClient";
import { useQuery } from "@tanstack/react-query";

export interface ICategory {
  id: string,
  created_at: string,
  updated_at: string,
  title: string,
  description: string,
  img: string,
  category: string
}

export const useCategoryNav = () => {
  return useQuery<ICategory[]>({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const response = await httpsClient.get(`/categories/`);
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching category: ");
      }
    },
  });
};
