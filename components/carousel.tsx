import { Wallpaper } from "@prisma/client";
import Image from "next/image";

interface CarouselProps {
  currentPhoto: Wallpaper;
}

export default function Carousel({ currentPhoto }: CarouselProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
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
      {/* <SharedModal
            index={index}
            changePhotoId={changePhotoId}
            currentPhoto={currentPhoto}
            closeModal={closeModal}
            navigation={false}
          /> */}
    </div>
  );
}
