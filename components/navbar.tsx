import { ThemeToggle } from "@/components/theme-toggle";
import { NavbarMain } from "@/components/navbar-main";
import { Logo } from "@/components/logo";

export async function Navbar() {

	return (
		<div className="bg-inherit w-full fixed z-50 p-4 border-b flex gap-8 justify-between items-center">
			<Logo className="w-6 h-6 blod" width={30} height={30} />

			<NavbarMain />

			<ThemeToggle />
		</div>
	);
}
