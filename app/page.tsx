import { getImages } from "@/actions/get-images";
import Gallery from "@/components/gallery";

export default async function HomePage() {

	return (
		<main className="">
			<Gallery  />
		</main>
	);
}
