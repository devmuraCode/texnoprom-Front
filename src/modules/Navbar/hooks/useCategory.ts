
import http from "@/services/http";
import { useQuery } from "@tanstack/react-query";

export interface ICategory {
  category_id: string,
  category_title: string,
  children: [
    {
      brand_id: string,
      brand_title: string
    },
    {
      brand_id: string,
      brand_title: string
    }
  ]
}

interface IProps {
  collectionId: string | null;
}

export const useCategory = ({ collectionId } : IProps) => {
  return useQuery<ICategory[]>({
    queryKey: ["categiry", collectionId],
    queryFn: async () => {
      if (!collectionId) return [];
      try {
        const response = await http.request.get(`/categories/brands/collection/${collectionId}`);
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: " );
      }
    },
    enabled: !!collectionId
  });
};
