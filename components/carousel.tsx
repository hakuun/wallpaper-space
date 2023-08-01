"use client";

import { Wallpaper } from "@prisma/client";
import Image from "next/image";

import SharedModal from "./shared-modal";

interface CarouselProps {
  currentPhoto: Wallpaper;
}

export default function Carousel({ currentPhoto }: CarouselProps) {
  function closeModal() {
    // setLastViewedPhoto(currentPhoto.id)
    // router.push('/', undefined, { shallow: true })
  }

  function changePhotoId(newVal: number) {
    return newVal;
  }

  return (
    <main className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
        // onClick={closeModal}
      >
        <Image
          src={currentPhoto.url}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
          fill
          priority={true}
        />
      </button>
      <SharedModal
        index={0}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </main>
  );
}
