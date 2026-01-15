export type DecodedJwt = {
  sub?: string;
  [key: string]: unknown;
};

export function decodeJwt(token: string | null | undefined): DecodedJwt | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(atob(parts[1]));
    return payload as DecodedJwt;
  } catch {
    return null;
  }
}
