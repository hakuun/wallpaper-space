"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { isMounted } = useMounted();

  if (!isMounted) return null;

  function toggleThrme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <>
      <div
        className="cursor-pointer flex items-center h-8 w-8"
        onClick={toggleThrme}
      >
        {theme === "light" ? (
          <Sun className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        ) : (
          <Moon className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        )}
      </div>
    </>
  );
}
