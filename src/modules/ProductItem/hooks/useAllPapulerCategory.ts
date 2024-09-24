import { http } from "@/services";
import { useQuery } from "@tanstack/react-query";

export interface IProduct {
    id: string;
    title: string;
    img: string;
    collection: string;
}

export const useAllPapulerCategory = () => {
  return useQuery<IProduct[]>({
    queryKey: ["papularCategory"],
    queryFn: async () => {
      try {
        const response = await http.request.get("/categories/popular/");
        if (response && response.data) {
          return response.data[0]?.category || []; 
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        // @ts-ignore
        throw new Error(`Error fetching popular categories: ${error.message}`);
      }
    },
  });
};
