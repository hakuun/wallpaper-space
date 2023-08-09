"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SharedModal from "./shared-modal";
import { useLastViewedPhoto } from "@/hooks/useGlobalState";
import { ImageProps } from "@/types/wallpaper";

interface CarouselProps {
	currentPhoto: ImageProps;
	images: ImageProps[];
}

export default function Carousel({ currentPhoto, images }: CarouselProps) {
	const router = useRouter();
	const [index, setIndex] = useState(0);
	const [isLast, setIsLast] = useState(false);
	const [isFirst, setIsFirst] = useState(false);
	const [, setLastViewedPhoto] = useLastViewedPhoto();
	const [currentImage, setCurrentImage] = useState(currentPhoto);

	useEffect(() => {
		const index = images.findIndex((img) => img.id === currentImage.id);
		setIndex(index);
		setIsFirst(() =>
			images.some((img, index) => img.id === currentImage.id && index === 0)
		);
		setIsLast(() =>
			images.some(
				(img, index) =>
					img.id === currentImage.id && index === images.length - 1
			)
		);
	}, [currentImage, images]);

	function closeModal() {
		setLastViewedPhoto(currentImage.id);
		router.push("/");
	}

	function changePhotoId(id: string) {
		const image = images.find((img) => img.id === id);
		if (!image) return;
		setCurrentImage(image);
		window.history.pushState({}, "", `${window.location.origin}/p/${id}`);
	}

	return (
		<main className="fixed inset-0 flex items-center justify-center">
			<button
				className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur blur-2xl"
				onClick={closeModal}
			>
				<Image
					placeholder="blur"
					blurDataURL={currentImage.blurDataURL}
					src={currentImage.url}
					className="pointer-events-none h-full w-full"
					alt="blurred background"
					fill
					priority={true}
				/>
			</button>
			<SharedModal
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
