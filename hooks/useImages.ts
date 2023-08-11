import { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";
import qs from "query-string";

import { ImageProps } from "@/types/wallpaper";

export function useImages(
	params = {
		PAGE_SIZE: 10,
		categoryId: "",
	}
) {
	const { PAGE_SIZE, categoryId } = params;

	function genQueryString({
		page,
		pageSize,
		categoryId,
	}: {
		page: number;
		pageSize: number;
		categoryId: string;
	}) {
		return qs.stringify({
			pageSize,
			page,
			categoryId,
		});
	}
	const fetcher: Fetcher<ImageProps[], string> = (url: string) =>
		fetch(url)
			.then((res) => res.json())
			.then((json) => json.records);

	const { data, mutate, error, size, setSize, isValidating, isLoading } =
		useSWRInfinite((index) => {
			const qs = genQueryString({
				page: index + 1,
				pageSize: PAGE_SIZE,
				categoryId,
			});

			return `${process.env.NEXT_PUBLIC_API_URL}/wallpaper?${qs}`;
		}, fetcher);

	const images: ImageProps[] = data ? data.flat() : [];
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
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
