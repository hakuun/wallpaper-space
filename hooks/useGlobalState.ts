import { createGlobalState } from "react-hooks-global-state";

import { ImageProps, Params } from "@/types/wallpaper";

interface initialStateProps {
  photoToScrollTo: string | null;
  images: ImageProps[];
  imageParams: Params;
}

const initialState: initialStateProps = {
  photoToScrollTo: null,
  images: [],
  imageParams: {
    page: 1,
    pageSize: 20,
  },
};

const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => {
  return useGlobalState("photoToScrollTo");
};

export const useImages = () => {
  return useGlobalState("images");
};

export const useImageParams = () => {
  return useGlobalState("imageParams");
};
