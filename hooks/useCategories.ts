import { Category } from "@/types/category";
import useSwr, { Fetcher } from "swr";

export function useCategories() {
	const fetcher: Fetcher<Category[], string> = (url: string) =>
		fetch(url)
			.then((res) => res.json())

	const {data, error, isLoading} = useSwr(`${process.env.NEXT_PUBLIC_API_URL}/categories`,fetcher);

  return {
    data,
    error,
    isLoading
  }
}
