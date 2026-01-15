"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { setTokenGetter } from "@/api/apiClient";
import { decodeJwt, DecodedJwt } from "@/lib/jwtUtils";

type AuthContextValue = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  isAuthenticated: boolean;
  decoded: DecodedJwt | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCESS_TOKEN_KEY = "access_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (stored) {
      setTokenState(stored);
    }
  }, []);

  useEffect(() => {
    setTokenGetter(() => token);
  }, [token]);

  const setToken = (value: string | null) => {
    setTokenState(value);
    if (typeof window !== "undefined") {
      if (value) {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, value);
      } else {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    }
  };

  const clearToken = () => setToken(null);

  const decoded = decodeJwt(token);

  const value: AuthContextValue = {
    token,
    setToken,
    clearToken,
    isAuthenticated: !!token,
    decoded,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
