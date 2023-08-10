import Carousel from "@/components/carousel";

interface PhotoProps {
	params: {
		photoId: string;
	};
}

export default async function PhotoPage({ params }: PhotoProps) {
	return (
		<>
			<main className="mx-auto p-4">
				<Carousel currentPhotoId={params.photoId} />
			</main>
		</>
	);
}
