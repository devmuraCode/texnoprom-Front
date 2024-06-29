import http from "@/services/http";
import { useQuery } from "@tanstack/react-query";

export interface ICategory {
    id: string,
    created_at: string,
    updated_at: string,
    title: string,
    description: string,
    img: string
}

export const useAllCategory = () => {
  return useQuery<ICategory[]>({
    queryKey: ["allcategory"],
    queryFn: async () => {
      try {
        const response = await http.request.get(`/categories/`);
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: ");
      }
    },
  });
};
