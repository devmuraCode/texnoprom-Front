
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

interface IProps {
  collectionId: string | null;
}

export const useCategory = ({ collectionId } : IProps) => {
  return useQuery<ICategory[]>({
    queryKey: ["categiry", collectionId],
    queryFn: async () => {
      try {
        const response = await httpsClient.get(`/categories/collections/${collectionId}`);
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
