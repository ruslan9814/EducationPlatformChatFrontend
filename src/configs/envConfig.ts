const DEFAULT_API_BASE_URL = "http://localhost:8080";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export const WS_BASE_URL = API_BASE_URL.replace("http", "ws");
