import { Wallpaper } from "@prisma/client";

export interface ImageProps {
	blurDataURL: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	categoryId: string;
	isPublished: boolean;
	assetId: string;
	publicId: string;
	height: number;
	width: number;
	secureUrl: string;
	url: string;
	format: string;
}
