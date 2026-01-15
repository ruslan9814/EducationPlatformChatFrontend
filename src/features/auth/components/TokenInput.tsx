"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function TokenInput() {
  const { token, setToken, clearToken, decoded } = useAuth();
  const [value, setValue] = useState(token ?? "");

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setToken(value.trim() || null);
  };

  const handleClear = () => {
    setValue("");
    clearToken();
  };

  const userLabel = decoded?.sub ? `Authenticated as: ${decoded.sub}` : token ? "Token set" : "Not authenticated";

  return (
    <form onSubmit={handleSave} className="flex items-center gap-2 text-sm">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="JWT access_token"
        className="w-80 px-2 py-1 rounded border border-slate-700 bg-slate-900 text-xs text-slate-100 placeholder:text-slate-500"
      />
      <button
        type="submit"
        className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-xs font-medium"
      >
        Save
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-xs"
      >
        Clear
      </button>
      <span className="ml-2 text-xs text-slate-400 whitespace-nowrap">{userLabel}</span>
    </form>
  );
}
