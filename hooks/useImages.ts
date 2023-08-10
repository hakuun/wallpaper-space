import { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";
import { ImageProps, Params } from "@/types/wallpaper";

export function useImages(PAGE_SIZE = 10) {
	const fetcher: Fetcher<ImageProps[], string> = (url: string) =>
		fetch(url)
			.then((res) => res.json())
			.then((json) => json.records);

	const { data, mutate, error, size, setSize, isValidating, isLoading } =
		useSWRInfinite(
			(index) =>
				`http://localhost:3002/api/wallpaper?pageSize=${PAGE_SIZE}&page=${
					index + 1
				}`,
			fetcher
		);

	const images: ImageProps[] = data ? data.flat() : [];
	const isLoadingMore =
		isValidating ||
		isLoading ||
		(size > 0 && data && typeof data[size - 1] === "undefined");
	const isEmpty = data?.[0]?.length === 0;
	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
	const isRefreshing = isValidating && data && data.length === size;

	return {
		mutate,
		setSize,
    size,
		images,
    isEmpty,
		isRefreshing,
		isReachingEnd,
		isError: error,
		isLoading: isLoadingMore,
	};
}
