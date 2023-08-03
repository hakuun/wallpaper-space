import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { Navbar } from "@/components/navbar";
import prisma from "@/lib/prisma";

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

	
  const categories = await prisma.category.findMany()

	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<ThemeProvider attribute="class" enableSystem={false}>
						<Navbar  categories={categories} />
						{children}
						<ToastProvider />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
