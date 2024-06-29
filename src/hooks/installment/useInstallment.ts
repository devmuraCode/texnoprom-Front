import http from "../../services/http";
import { useQuery } from "@tanstack/react-query";

export interface IInstallment {
  id: string;
  title: string;
  logo: string;
  percent: number;
  monthly_payment: number;
}

interface IInstallmentData {
  productId: string | undefined;
  months: number;
}

export const useInstallment = ({ productId, months }: IInstallmentData) => {
  return useQuery<IInstallment[]>({
    queryKey: ["installment", productId, months],
    queryFn: async () => {
      try {
        const response = await http.request.get(`/installmentapi/calculate_installment/?product_id=${productId}&months=${months}`);
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching installments");
      }
    },
  });
};
