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

  if (!currentPhoto) return `Wallpaper not found`;

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} />
      </main>
    </>
  );
}
