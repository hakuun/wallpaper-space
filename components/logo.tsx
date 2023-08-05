"use client";

import { cn } from "@/lib/utils";
import LogoIcon from "@/public/icons/logo.svg";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface LogoProps {
	width?: number;
	height?: number;
	className?: string;
}

export function Logo({ width = 28, height = 28, className }: LogoProps) {
	const [isMounted, setIsMounted] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) null;

	return (
		<div
			className={cn("cursor-pointer flex items-center", className)}
			onClick={() => router.push("/")}
		>
			<LogoIcon width={width} height={height} />
		</div>
	);
}
