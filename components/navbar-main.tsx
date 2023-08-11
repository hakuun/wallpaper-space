"use client";
import { useSwipeable } from "react-swipeable";

import { useState } from "react";
import { useMounted } from "@/hooks/useMounted";
import { useCategories } from "@/hooks/useCategories";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category";

export function NavbarMain() {
	const [x, setX] = useState(0);
	const { isMounted } = useMounted();
	const [lastX, setLastX] = useState(0);
	const { data } = useCategories();
	const [currentCategory, setCurrentCategory] = useState<string | null>(null);

	const handlers = useSwipeable({
		onSwiping: ({ deltaX }) => {
			const value = lastX + deltaX;
			setX(() => (value > 0 ? 0 : value));
		},
		onSwiped: ({ deltaX }) => {
			const value = lastX + deltaX;
			setLastX(() => (value > 0 ? 0 : value));
		},
		trackMouse: true,
		trackTouch: true,
	});

	function handleCategoryClick(category: Category | null) {
		setCurrentCategory(category && category.id);
    
	}

	if (!isMounted || !data)
		return (
			<div className="p-2 h-[50px] border-b flex justify-between items-center"></div>
		);

	return (
		<div className="overflow-hidden w-full" {...handlers}>
			<div
				className="flex items-center gap-8 "
				style={{ transform: `translateX(${x}px)` }}
			>
				<div
					onClick={() => {
						handleCategoryClick(null);
					}}
					className={cn(
						"transition-all sm:text-sm md:text-md lg:text-lg  cursor-pointer select-none",
						!currentCategory ? "font-bold scale-110" : ""
					)}
				>
					All
				</div>
				{data.map((category) => {
					return (
						<div
							onClick={() => {
								handleCategoryClick(category);
							}}
							className={cn(
								"transition-all sm:text-sm md:text-md lg:text-lg  cursor-pointer select-none",
								currentCategory === category.id ? "font-bold scale-110" : ""
							)}
							key={category.id}
						>
							{category.name}
						</div>
					);
				})}
			</div>
		</div>
	);
}
