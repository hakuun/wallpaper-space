import prisma from "@/lib/prisma";
import Carousel from "@/components/carousel";
import { generateImage, generateImages } from "@/utils/generateBlur";

interface PhotoProps {
	params: {
		photoId: string;
	};
}

export default async function PhotoPage({ params }: PhotoProps) {
	const currentData = await prisma.wallpaper.findUnique({
		where: {
			id: params.photoId,
		},
	});

	const data = await prisma.wallpaper.findMany({
		where: {
			isPublished: true,
		},
	});

	if (!data || !currentData) return `Wallpaper not found`;

	const currentPhoto = await generateImage(currentData);
	const images = await generateImages(data);

	return (
		<>
			<main className="mx-auto p-4">
				<Carousel images={images} currentPhoto={currentPhoto} />
			</main>
		</>
	);
}
