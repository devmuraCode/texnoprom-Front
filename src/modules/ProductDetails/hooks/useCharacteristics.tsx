import http from "@/services/http";
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
  productSlug: string | undefined;
}

export const useCharacteristics = ({ productSlug }: IProps) => {
  return useQuery<ICharacteristics[]>({
    queryKey: ["characteristics", productSlug],
    queryFn: async () => {
      try {
        const response = await http.request.get(
          `/characteristics/${productSlug}/`
        );
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error: any) {
        throw new Error("Error fetching characteristics: " + error.message);
      }
    },
    enabled: !!productSlug,
  });
};
