import axios from "axios";
import { API_BASE_URL } from "@/configs/envConfig";

let getToken: () => string | null = () => null;

export const setTokenGetter = (fn: () => string | null) => {
  getToken = fn;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
