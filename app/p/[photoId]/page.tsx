import Carousel from "@/components/carousel";
import { getImage } from "@/actions/get-images";

interface PhotoProps {
	params: {
		photoId: string;
	};
}

export default async function PhotoPage({ params }: PhotoProps) {
	const currentPhoto = await getImage(params.photoId);


	if (!currentPhoto) return `Wallpaper not found`;

	return (
		<>
			<main className="mx-auto p-4">
				<Carousel currentPhoto={currentPhoto} />
			</main>
		</>
	);
}
