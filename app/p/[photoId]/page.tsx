import prisma from "@/lib/prisma";
import Carousel from "@/components/carousel";

interface PhotoProps {
  params: {
    photoId: string;
  };
}

export default async function PhotoPage({ params }: PhotoProps) {
  const currentPhoto = await prisma.wallpaper.findUnique({
    where: {
      id: params.photoId,
    },
  });

  const images = await prisma.wallpaper.findMany({
    where: {
      isPublished: true,
    },
  });

  if (!currentPhoto) return `Wallpaper not found`;

  return (
    <>
      <main className="mx-auto p-4">
        <Carousel images={images} currentPhoto={currentPhoto} />
      </main>
    </>
  );
}
