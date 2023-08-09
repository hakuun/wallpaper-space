import getImages from "@/actions/get-images";
import ImageFlow from "@/components/image-flow";

export default async function HomePage() {
  const data = await getImages({ page: 1, pageSize: 5 });

  if (!data) return <div>no data</div>;

  return (
    <main className="mx-auto p-4">
      <ImageFlow data={data} />
    </main>
  );
}
