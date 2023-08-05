"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

import { Wallpaper } from "@prisma/client";
import { useLastViewedPhoto } from "@/hooks/useLastViewedPhoto";

interface ImageFlowProps {
  images: Wallpaper[];
}

export function ImageFlow({ images }: ImageFlowProps) {
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [lastViewedPhoto, setLastViewedPhoto]);

  return (
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
  );
}
