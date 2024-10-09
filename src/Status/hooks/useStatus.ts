import http from "@/services/http";
import { useQuery } from "@tanstack/react-query";

export interface IBrand {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  logo: string;
  category_id: string;
}

export interface IProps {
    user_id: string | null;
}

export const useStatus = ({ user_id }: IProps) => {
  return useQuery<IBrand[]>({
    queryKey: ["user", user_id],
    queryFn: async () => {
      try {
        const response = await http.request.get(
          `/orders/${user_id}`
        );
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: ");
      }
    },
    enabled: !!user_id,
  });
};
