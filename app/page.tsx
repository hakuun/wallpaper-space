import Gallery from "@/components/gallery";
import { Navbar } from "@/components/navbar";

export default async function HomePage() {
  return (
    <main className="bg-inherit">
      <Navbar />
      <div className="p-4 pt-[80px]">
        <Gallery />
      </div>
    </main>
  );
}
