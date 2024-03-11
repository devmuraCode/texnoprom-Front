import { httpsClient } from "./../../httpClient/httpClient";
import { useQuery } from "@tanstack/react-query";

export interface IBanners {
  id: string;
  created_at: string;
  updated_at: string;
  title_ru: string;
  title_en: string;
  img: string;
}

export const useBanners = () => {
  return useQuery<IBanners[]>({
    queryKey: ["banners"],
    queryFn: async () => {
      try {
        const response = await httpsClient.get("/banners/");
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        throw new Error("Error fetching banners: " );
      }
    },
  });
};
