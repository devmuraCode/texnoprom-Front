import http from "@/services/http";
import { useQuery } from "@tanstack/react-query";

export interface IStatus {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  logo: string;
  category_id: string;
  is_paid: boolean;
  amount: number;
  delivery_address?: string;
  phone_number?: string;
  products: string[];
}

export const useStatus = () => {
  return useQuery<IStatus[]>({
    queryKey: ["user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Отсутствует токен авторизации");
      }

      try {
        const response = await http.request.post(`/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response?.data) {
          throw new Error("Данные не найдены");
        }

        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Сессия истекла, пожалуйста, войдите снова");
        }
        throw new Error(`Ошибка при загрузке данных: ${error.message}`);
      }
    },
    retry: false,
  });
};
