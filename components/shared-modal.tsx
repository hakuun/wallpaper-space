"use client";

import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import downloadPhoto from "@/utils/downloadPhoto";
import { Wallpaper } from "@prisma/client";

interface SharedModalProps {
  index: number;
  images: Wallpaper[];
  currentPhoto: Wallpaper;
  changePhotoId: (id: string) => void;
  closeModal: () => void;
  direction?: number;
  isFirst: boolean;
  isLast: boolean;
}

export default function SharedModal({
  index,
  images,
  isLast,
  isFirst,
  direction,
  currentPhoto,
  closeModal,
  changePhotoId,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  const filteredImages = images.filter((_, i) => {
    const max = index + 15 > images.length - 1 ? images.length - 1 : index + 15;
    const min = index - 15 > 0 ? index - 15 : 0;
    return i >= min && i <= max;
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      changePhotoPrev();
    },
    onSwipedRight: () => {
      changePhotoNext();
    },
    trackMouse: true,
  });

  function changePhotoNext() {
    if (isLast) return;
    const id = images[index + 1].id;
    changePhotoId(id);
  }

  function changePhotoPrev() {
    if (isFirst) return;
    const id = images[index - 1].id;
    changePhotoId(id);
  }

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentPhoto.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <Image
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1280/${currentPhoto.publicId}.${currentPhoto.format}`}
                  width={1280}
                  height={853}
                  priority
                  alt="Wallpaper Space"
                  onLoadingComplete={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Buttons */}
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              <>
                {!isFirst && (
                  <button
                    className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={changePhotoPrev}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                )}
                {!isLast && (
                  <button
                    className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={changePhotoNext}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                )}
              </>

              <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                <a
                  href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentPhoto.publicId}.${currentPhoto.format}`}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  target="_blank"
                  title="Open fullsize version"
                  rel="noreferrer"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
                <button
                  onClick={() =>
                    downloadPhoto(
                      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentPhoto.publicId}.${currentPhoto.format}`,
                      `${index}.jpg`
                    )
                  }
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  title="Download fullsize version"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={closeModal}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
          {/* Bottom Nav bar */}
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <motion.div
              initial={false}
              className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
            >
              <AnimatePresence initial={false}>
                {filteredImages.map(({ publicId, format, id }) => (
                  <motion.button
                    initial={{
                      width: "0%",
                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                    }}
                    animate={{
                      scale: id === currentPhoto.id ? 1.25 : 1,
                      width: "100%",
                      x: `${Math.max(index * -100, 15 * -100)}%`,
                    }}
                    exit={{ width: "0%" }}
                    onClick={() => changePhotoId(id)}
                    key={id}
                    className={`${
                      id === currentPhoto.id
                        ? "z-20 rounded-md shadow shadow-black/50"
                        : "z-10"
                    } ${isFirst ? "rounded-l-md" : ""} ${
                      isLast ? "rounded-r-md" : ""
                    } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                  >
                    <Image
                      alt="small photos on the bottom"
                      width={180}
                      height={120}
                      className={`${
                        id === currentPhoto.id
                          ? "brightness-110 hover:brightness-110"
                          : "brightness-50 contrast-125 hover:brightness-75"
                      } h-full transform object-cover transition`}
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_180/${publicId}.${format}`}
                    />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
