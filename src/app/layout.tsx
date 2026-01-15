import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "Education Platform Chat",
  description: "Chat service frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ReactQueryProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
