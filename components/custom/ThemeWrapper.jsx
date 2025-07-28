"use client";
import { useTheme } from "@/app/provider";
import { useEffect } from "react";

export default function ThemeWrapper({ children }) {
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  return <>{children}</>;
}
