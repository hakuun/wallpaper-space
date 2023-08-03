"use client";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { useState, useEffect } from "react";
import { Category } from "@prisma/client";

interface NavbarProps {
	categories: Category[];
}

export function Navbar({ categories }: NavbarProps) {
	const [x, setX] = useState(0);
	const [isMounted, setIsMounted] = useState(false);
	const handlers = useSwipeable({
		onSwiped: ({absX,deltaX}) => {
			setX(deltaX > 0 ? 0 : deltaX)
		},
		onSwipeStart: (eventData) => console.log("onSwipeStart!", eventData),
		trackMouse: true,
		preventScrollOnSwipe:true,
		swipeDuration:250
	});
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <div className="p-2 h-[50px] border-b flex justify-between items-center"></div>;
	}

	return (
		<div className="p-2 border-b flex gap-8 justify-between items-center">
			<Logo />

			<div className="overflow-hidden w-full" {...handlers}>
				<motion.div
					className="flex items-center gap-4 "
					animate={{ x }}
				>
					{categories.map((category) => {
						return (
							<div className="cursor-pointer select-none" key={category.id}>
								{category.name}
							</div>
						);
					})}
				</motion.div>
			</div>

			<ThemeToggle />
		</div>
	);
}
