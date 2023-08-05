import prisma from "@/lib/prisma";

import { ThemeToggle } from "@/components/theme-toggle";
import { NavbarMain } from "@/components/navbar-main";
import { Logo } from "@/components/logo";

export async function Navbar() {
	const categories = await prisma.category.findMany();

	return (
		<div className="p-2 border-b flex gap-8 justify-between items-center">
			<Logo className="w-6 h-6" width={20} height={20} />

			<NavbarMain categories={categories} />

			<ThemeToggle />
		</div>
	);
}
