import Image from "next/image";
import Link from "next/link";

import prisma from "@/lib/prisma";
import Modal from "@/components/modal";
import { Wallpaper } from "@prisma/client";

export default async function Home() {
  const images = await prisma.wallpaper.findMany({
    where: {
      isPublished: true,
    },
  });

  return (
    <main className="mx-auto p-4">
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-2 xl:columns-3 2xl:columns-4">
        {images.map(({ id, format, url, publicId }) => (
          <Link
            key={id}
            href={`/?photoId=${id}`}
            as={`/p/${id}`}
            // ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            shallow
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <Image
              alt="Next.js Conf photo"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-100"
              style={{ transform: "translate3d(0, 0, 0)" }}
              placeholder="blur"
              blurDataURL={url}
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${publicId}.${format}`}
              width={414}
              height={848}
              sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
