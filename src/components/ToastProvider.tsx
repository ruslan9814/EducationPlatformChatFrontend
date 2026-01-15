"use client";

import { ReactNode } from "react";

export function ToastProvider({ children }: { children: ReactNode }) {
  // Сейчас только консольные тосты через useToast; сюда можно подвесить UI
  return <>{children}</>;
}
