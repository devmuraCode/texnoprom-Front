import { httpsClient } from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";

export interface ICharacteristics {
  id: string;
  product: string;
  items: {
    id: number;
    name: string;
    value: string;
  }[];
}

interface IProps {
  productId: string | undefined;
}

export const useCharacteristics = ({ productId }: IProps) => {
  return useQuery<ICharacteristics[]>({
    queryKey: ["characteristics", productId],
    queryFn: async () => {
      try {
        const response = await httpsClient.get(`/characteristics/${productId}`);
        if (response && response.data) {
          return response.data;
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
