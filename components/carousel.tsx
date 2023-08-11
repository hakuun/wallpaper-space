"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SharedModal from "./shared-modal";
import { useLastViewedPhoto } from "@/hooks/useGlobalState";
import { useImages } from "@/hooks/useImages";
import { ImageProps } from "@/types/wallpaper";

interface CarouselProps {
	currentPhotoId: string;
}

export default function Carousel({ currentPhotoId }: CarouselProps) {
	const router = useRouter();
	const [index, setIndex] = useState(0);
	const [isLast, setIsLast] = useState(false);
	const [isFirst, setIsFirst] = useState(false);
	const [, setLastViewedPhoto] = useLastViewedPhoto();
	const [currentImage, setCurrentImage] = useState<ImageProps>();
	const [currentImageId, setcurrentImageId] = useState(currentPhotoId);
	const { images, setSize, size, isReachingEnd, isLoading } = useImages();

	useEffect(() => {
		const current = images.find((img) => img.id === currentImageId);
		const index = images.findIndex((img) => img.id === currentImageId);
		setIndex(index);
		setCurrentImage(current);
		setIsFirst(() =>
			images.some((img, index) => img.id === currentImageId && index === 0)
		);
		setIsLast(() =>
			images.some(
				(img, index) => img.id === currentImageId && index === images.length - 1
			)
		);
	}, [currentImageId, images]);

	if (!currentImage) return <div>Wallpaper Not Found</div>;

	function closeModal() {
		setLastViewedPhoto(currentImageId);
		router.push("/");
	}

	function changePhotoId(id: string) {
		const image = images.find((img) => img.id === id);
		const index = images.findIndex((img) => img.id === id);
		if (!image) return;
		if(index >= images.length - 5 && !isReachingEnd && !isLoading) {
			setSize(size + 1)
		}
		setcurrentImageId(id);
		
		window.history.pushState({}, "", `${window.location.origin}/p/${id}`);
	}

	return (
		<main className="fixed inset-0 flex items-center justify-center">
			<button
				className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur blur-2xl"
				onClick={closeModal}
			>
				<Image
					src={currentImage.url}
					className="pointer-events-none h-full w-full"
					alt="blurred background"
					fill
					priority={true}
				/>
			</button>
			<SharedModal
				isLoading={isLoading}
				isFirst={isFirst}
				isLast={isLast}
				index={index}
				changePhotoId={changePhotoId}
				currentPhoto={currentImage}
				closeModal={closeModal}
				images={images}
			/>
		</main>
	);
}
