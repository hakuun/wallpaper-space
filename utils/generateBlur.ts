import { ImageProps } from "@/types/wallpaper";
import { Wallpaper } from "@prisma/client";

const cache = new Map<Wallpaper, string>();

export async function getBase64ImageUrl(image: Wallpaper): Promise<string> {
	let url = cache.get(image);
	if (url) {
		return url;
	}
	const response = await fetch(
		`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_70,w_520/${image.publicId}.${image.format}`
	);

	const contentType = response.headers.get("Content-Type");
	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	url = "data:" + contentType + ";base64," + buffer.toString("base64");
	cache.set(image, url);

	return url;
}

export async function generateImage(wallpaper: Wallpaper): Promise<ImageProps> {
	const blurDataURL = await getBase64ImageUrl(wallpaper);

	return {
		...wallpaper,
		blurDataURL,
	};
}

export async function generateImages(
	wallpaper: Wallpaper[]
): Promise<ImageProps[]> {
	const images = [];

	try {
		for (let i = 0; i < wallpaper.length; i++) {
			const data = await generateImage(wallpaper[i]);
			images.push(data);
		}
	} catch (error) {
		console.error(error);
	}

	return images;
}
