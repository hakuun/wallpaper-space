"use client";
import { useSwipeable } from "react-swipeable";

import { useState } from "react";
import { Category } from "@prisma/client";
import { useMounted } from "@/hooks/useMounted";

interface NavbarMainProps {
  categories: Category[];
}

export function NavbarMain({ categories }: NavbarMainProps) {
  const [x, setX] = useState(0);
  const [lastX, setLastX] = useState(0);
  const { isMounted } = useMounted();

  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      const value = lastX + deltaX;
      setX(() => (value > 0 ? 0 : value));
    },
    onSwiped: ({ deltaX }) => {
      const value = lastX + deltaX;
      setLastX(() => (value > 0 ? 0 : value));
    },
    trackMouse: true,
    trackTouch: true,
  });

  if (!isMounted)
    return (
      <div className="p-2 h-[50px] border-b flex justify-between items-center"></div>
    );

  return (
    <div className="overflow-hidden w-full" {...handlers}>
      <div
        className="flex items-center gap-4 "
        style={{ transform: `translateX(${x}px)` }}
      >
        {categories.map((category) => {
          return (
            <div className="cursor-pointer select-none" key={category.id}>
              {category.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
