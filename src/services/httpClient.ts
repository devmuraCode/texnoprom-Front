import { ACCESS_TOKEN_KEY } from "@/features/Auth/modal/constants";
import axios from "axios";

export const httpsClient = axios.create({
  baseURL: "https://back-texnoprom.uz",
});

httpsClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers = Object.assign(config.headers, {
      Authorization: `Bearer ${token}`,
    });
  }
  return config;
}); 