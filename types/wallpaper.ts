import { Wallpaper } from "@prisma/client";

export interface ImageProps extends Wallpaper {
  blurDataURL: string
}