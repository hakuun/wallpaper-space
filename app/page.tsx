import prisma from "@/lib/prisma";
import { ImageFlow } from "@/components/image-flow";
import { generateImages } from "@/utils/generateBlur";

export default async function HomePage() {
	const data = await prisma.wallpaper.findMany({
		where: {
			isPublished: true,
		},
	});

	const images =  await generateImages(data)

	return (
		<main className="mx-auto max-w-[1960px] p-4">
			<ImageFlow images={images} />
		</main>
	);
}
