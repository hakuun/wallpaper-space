"use client";

import {
	ArrowDownTrayIcon,
	ArrowTopRightOnSquareIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	HomeIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";

import downloadPhoto from "@/utils/downloadPhoto";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import { ImageProps } from "@/types/wallpaper";
import { useScreen } from "@/hooks/useScreen";
import { Loader } from "@/components/ui/loader";

interface SharedModalProps {
	index: number;
	images: ImageProps[];
	currentPhoto: ImageProps;
	changePhotoId: (id: string) => void;
	closeModal: () => void;
	direction?: number;
	isFirst: boolean;
	isLast: boolean;
	isLoading?: boolean;
}

export default function SharedModal({
	index,
	images,
	isLast,
	isFirst,
	isLoading,
	direction,
	currentPhoto,
	closeModal,
	changePhotoId,
}: SharedModalProps) {
	const [loaded, setLoaded] = useState(false);
	const { innerHeight, innerWidth } = useScreen();

	function getImageSize(image: ImageProps): { width: number; height: number } {
		const { width, height } = image;
		let w = 0,
			h = 0;
		const ratio = width / height;
		if (ratio > 0) {
			h = innerHeight;
			w = (innerHeight * width) / height;
		} else {
			w = innerWidth;
			h = (innerWidth * height) / width;
		}

		return { width: w, height: h };
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			changePhotoPrev();
		},
		onSwipedRight: () => {
			changePhotoNext();
		},
		trackMouse: true,
	});

	function changePhotoNext() {
		if (isLast) return;
		const id = images[index + 1].id;
		changePhotoId(id);
	}

	function changePhotoPrev() {
		if (isFirst) return;
		const id = images[index - 1].id;
		changePhotoId(id);
	}

	return (
		<MotionConfig
			transition={{
				x: { type: "spring", stiffness: 300, damping: 30 },
				opacity: { duration: 0.2 },
			}}
		>
			<div
				style={{ aspectRatio: `${innerWidth}/${innerHeight}` }}
				className="relative z-50 flex w-full h-full items-center "
				{...handlers}
			>
				{/* Main image */}
				<div className="w-full h-full overflow-hidden">
					<div
						style={{ aspectRatio: `${innerWidth}/${innerHeight}` }}
						className="relative flex items-center justify-center"
					>
						<AnimatePresence initial={false} custom={direction}>
							<motion.div
								key={currentPhoto.id}
								custom={direction}
								variants={variants}
								initial="enter"
								animate="center"
								exit="exit"
								className="absolute"
							>
								<Image
									width={getImageSize(currentPhoto).width}
									height={getImageSize(currentPhoto).height}
									src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,q_80,w_1280/${currentPhoto.publicId}.${currentPhoto.format}`}
									alt="Wallpaper Space"
									onLoadingComplete={() => setLoaded(true)}
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Buttons + bottom nav bar */}
				<div className="absolute inset-0 mx-auto flex w-[15/16] h-full items-center justify-center">
					{/* Buttons */}
					{loaded && (
						<div
							style={{ aspectRatio: `${innerWidth}/${innerHeight}` }}
							className="relative max-h-full w-full"
						>
							<>
								{!isFirst && (
									<button
										className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
										style={{ transform: "translate3d(0, 0, 0)" }}
										onClick={changePhotoPrev}
										title="previous"
									>
										<ChevronLeftIcon className="h-6 w-6" />
									</button>
								)}
								{!isLast && (
									<button
										className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
										style={{ transform: "translate3d(0, 0, 0)" }}
										onClick={changePhotoNext}
										title="next"
									>
										<ChevronRightIcon className="h-6 w-6" />
									</button>
								)}
							</>

							<div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
								<a
									href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentPhoto.publicId}.${currentPhoto.format}`}
									className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
									target="_blank"
									title="Open fullsize version"
									rel="noreferrer"
								>
									<ArrowTopRightOnSquareIcon className="h-5 w-5" />
								</a>
								<button
									onClick={() =>
										downloadPhoto(
											`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentPhoto.publicId}.${currentPhoto.format}`,
											`${index}.jpg`
										)
									}
									className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
									title="Download fullsize version"
								>
									<ArrowDownTrayIcon className="h-5 w-5" />
								</button>
							</div>
							<div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
								<button
									onClick={closeModal}
									className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
								>
									<HomeIcon title="back to homepage" className="h-5 w-5" />
								</button>
							</div>
						</div>
					)}
					{/* Bottom Nav bar */}
					<div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
						<motion.div
							initial={false}
							className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
						>
							<AnimatePresence initial={false}>
								{images.map(({ publicId, format, id }) => (
									<motion.button
										initial={{
											width: "0%",
											x: `${Math.max((index - 1) * -100, 17 * -100)}%`,
										}}
										animate={{
											scale: id === currentPhoto.id ? 1.25 : 1,
											width: "100%",
											x: `${Math.max(index * -100, 17 * -100)}%`,
										}}
										exit={{ width: "0%" }}
										onClick={() => changePhotoId(id)}
										key={id}
										className={`${
											id === currentPhoto.id
												? "z-20 rounded-md shadow shadow-black/50"
												: "z-10"
										} ${isFirst ? "rounded-l-md" : ""} ${
											isLast ? "rounded-r-md" : ""
										} relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
									>
										<Image
											alt="small photos on the bottom"
											width={180}
											height={120}
											className={`${
												id === currentPhoto.id
													? "brightness-110 hover:brightness-110"
													: "brightness-50 contrast-125 hover:brightness-75"
											} h-full transform object-cover transition`}
											src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_180/${publicId}.${format}`}
										/>
									</motion.button>
								))}
								{isLoading && (
									<motion.button
										initial={{
											width: "0%",
											x: `${Math.max((index - 1) * -100, 17 * -100)}%`,
										}}
										animate={{
											scale: 1,
											width: "100%",
											x: `${Math.max(index * -100, 17 * -100)}%`,
										}}
										exit={{ width: "0%" }}
										className="colors-white text-2xl text-colors-black"
									>
										<Loader />
									</motion.button>
								)}
							</AnimatePresence>
						</motion.div>
					</div>
				</div>
			</div>
		</MotionConfig>
	);
}
