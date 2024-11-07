import http from "@/services/http";
import { useQuery } from "@tanstack/react-query";

export interface ILightHouse {
  id: string;
  img: string;
}

interface IProps {
  productSlug: string | undefined;
}

export const useLightHouse = ({ productSlug }: IProps) => {
  return useQuery<ILightHouse[]>({
    queryKey: ["lighthouse", productSlug],
    queryFn: async () => {
      try {
        const response = await http.request.get(`/photos/${productSlug}`);
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error: any) {
        throw new Error("Error fetching photos: " + error.message);
      }
    },
    enabled: !!productSlug,
  });
};
