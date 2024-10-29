
import http from "@/services/http";
import { useQuery } from "@tanstack/react-query";

export interface ICategory {
  category_id: string,
  category_title: string,
  category_slug: string
  children: [
    {
      brand_id: string,
      brand_title: string
      brand_slug: string
    }
  ]
}

interface IProps {
  collectionSlug: string | undefined;
}

export const useCategory = ({ collectionSlug } : IProps) => {
  return useQuery<ICategory[]>({
    queryKey: ["categiry", collectionSlug],
    queryFn: async () => {
      if (!collectionSlug) return [];
      try {
        const response = await http.request.get(`/categories/brands/collection/${collectionSlug}/`);
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: " );
      }
    },
    enabled: !!collectionSlug
  });
};
