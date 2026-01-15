"use client";

import { useCallback } from "react";

export type ToastType = "info" | "success" | "error";

export function useToast() {
  const showToast = useCallback((message: string, type: ToastType = "info") => {
    // Простая заглушка: можно заменить на красивый UI
    // eslint-disable-next-line no-console
    console[type === "error" ? "error" : "log"](`[${type.toUpperCase()}] ${message}`);
  }, []);

  return { showToast };
}
