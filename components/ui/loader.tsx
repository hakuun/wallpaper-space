"use client";

import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";

export const Loader = ({ className }: { className?: string }) => {
	return <ClipLoader className={cn(className)} color="#3498db" size={50} />;
};
