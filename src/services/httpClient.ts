import axios from "axios";

export const httpsClient = axios.create({
  baseURL: "https://tehnoprom.saitbaev.com",
});