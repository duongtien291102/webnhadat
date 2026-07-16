"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle({ isScrolledActive = false }: { isScrolledActive?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder of same size
  }

  const btnClasses = isScrolledActive
    ? 'text-neutral-900 border-neutral-200 hover:bg-neutral-100 dark:text-white dark:border-neutral-800 dark:hover:bg-neutral-800'
    : 'text-white border-white/20 hover:bg-white dark:hover:bg-neutral-800/20';

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`w-9 h-9 flex items-center justify-center rounded-full transition-all border ${btnClasses}`}
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun size={16} strokeWidth={2} />
      ) : (
        <Moon size={16} strokeWidth={2} />
      )}
    </button>
  );
}
