import Image from "next/image";

import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
	return (
		<div className="p-2 border-b flex justify-between items-center">
			<div>
				<Image src="/logo.svg" alt="logo" width={52} height={52} />
			</div>
			<ThemeToggle />
		</div>
	);
}
