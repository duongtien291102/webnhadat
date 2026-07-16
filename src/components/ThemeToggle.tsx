"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function ThemeToggle({ isScrolledActive = false }: { isScrolledActive?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

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

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  const handleThemeChange = () => {
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (reduceMotion || !transitionDocument.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    transitionDocument.startViewTransition(() => setTheme(nextTheme));
  };

  return (
    <button
      onClick={handleThemeChange}
      className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors border active:scale-95 ${btnClasses}`}
      aria-label={nextTheme === "dark" ? "Bật giao diện tối" : "Bật giao diện sáng"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolvedTheme}
          initial={reduceMotion ? false : { opacity: 0, rotate: -35, scale: 0.75 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, rotate: 35, scale: 0.75 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {resolvedTheme === "dark" ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
