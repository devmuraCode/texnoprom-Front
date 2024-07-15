import http from "@/services/http";
import { useQuery } from "@tanstack/react-query";

export interface ILightHouse {
  id: string;
  img: string;
}

interface IProps {
  productId: string | undefined;
}

export const useLightHouse = ({ productId }: IProps) => {
  return useQuery<ILightHouse[]>({
    queryKey: ["lighthouse", productId],
    queryFn: async () => {
      try {
        const response = await http.request.get(`/photos/${productId}`);
        if (response && response.data) {
          return response.data
          
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        // @ts-ignore
        throw new Error("Error fetching characteristics: " + error.message);
      }
    },
    enabled: !!productId,
  });
};
