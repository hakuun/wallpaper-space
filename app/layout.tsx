import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from "@/providers/theme-provider";
// import { AuthProvider } from "@/providers/auth-provider";
import { ToastProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallpaper Space",
  description: "Switch Wallpaper Switch Mood",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
        <ThemeProvider attribute="class" enableSystem={false}>
          {children}
          <Analytics />
          <ToastProvider />
        </ThemeProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
