import prisma from "@/lib/prisma";
import { ImageFlow } from "@/components/image-flow";

export default async function HomePage() {
  const images = await prisma.wallpaper.findMany({
    where: {
      isPublished: true,
    },
  });
  return (
    <main className="mx-auto max-w-[1960px] p-4">
      <ImageFlow images={images} />
    </main>
  );
}
