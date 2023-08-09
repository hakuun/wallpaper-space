import { createGlobalState } from "react-hooks-global-state";

import { ImageProps } from "@/types/wallpaper";

interface initialStateProps {
	photoToScrollTo: string | null;
	images: ImageProps[];
}

const initialState: initialStateProps = {
	photoToScrollTo: null,
	images: [],
};

const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => {
	return useGlobalState("photoToScrollTo");
};

export const useImages = () => {
	return useGlobalState("images");
};
