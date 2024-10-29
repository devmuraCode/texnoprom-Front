
import http from "@/services/http";
import { useQuery } from "@tanstack/react-query";

export interface ICollection {
    id: string,
    created_at: string,
    updated_at: string,
    title: string,
    description: string,
    img: string
    slug: string
}

export const useCollectionsCard = () => {
  return useQuery<ICollection[]>({
    queryKey: ["collections"],
    queryFn: async () => {
      try {
        const response = await http.request.get("/collections/");
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
