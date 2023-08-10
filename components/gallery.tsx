"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { useLastViewedPhoto } from "@/hooks/useGlobalState";
import { Loader } from "@/components/ui/loader";
import { useImages } from "@/hooks/useImages";

export default function Gallery() {
	const {
		setSize,
		size,
		images,
		isEmpty,
		isError,
		isLoading,
		isReachingEnd,
		isRefreshing,
	} = useImages();

	const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
	const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

	useLayoutEffect(() => {
		function handleScroll() {
			if (isLoading || isReachingEnd || isRefreshing) return;
			const { scrollTop, clientHeight, scrollHeight } =
				document.documentElement;
			const scrollBottom = scrollHeight - scrollTop - clientHeight;
			if (scrollBottom < 100) {
				setSize(size + 1);
			}
		}
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isLoading, isReachingEnd, isRefreshing, setSize, size]);

	useEffect(() => {
		if (lastViewedPhoto) {
			lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
			setLastViewedPhoto(null);
		}
	}, [lastViewedPhoto, setLastViewedPhoto]);

	return (
		<>
			{isEmpty ? <p>Yay, no wallpaper found.</p> : null}

			<div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
				<div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
					AD
				</div>
				{images.map(({ id, publicId, format }) => (
					<Link
						key={id}
						href={`/?photoId=${id}`}
						as={`/p/${id}`}
						ref={id === lastViewedPhoto ? lastViewedPhotoRef : null}
						shallow
						className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
					>
						<Image
							alt="wallpaper space"
							className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-100"
							style={{ transform: "translate3d(0, 0, 0)" }}
							src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${publicId}.${format}`}
							width={720}
							height={480}
							sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
						/>
					</Link>
				))}
			</div>
			{isLoading && (
				<p className="flex justify-center items-center text-2xl">
					<Loader />
				</p>
			)}
			{isReachingEnd && (
				<p className="flex justify-center items-center text-2xl">
					No more data to display
				</p>
			)}
			{isError && (
				<p className="flex justify-center items-center text-2xl">
					Error: {isError}
				</p>
			)}
		</>
	);
}
