"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return (document.documentElement.getAttribute("data-theme") as Theme) ?? "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("cpk-theme", next);
    } catch {
      /* private mode — fine, just won't persist */
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle colour theme"}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle colour theme"}
      className={[
        "inline-grid size-10 place-items-center rounded-full border border-border text-ink",
        "transition-[transform,background-color,border-color] duration-200 [transition-timing-function:var(--ease-out)]",
        "hover:border-border-strong hover:bg-surface-raised active:scale-95",
        "focus-visible:outline-none",
        className ?? "",
      ].join(" ")}
    >
      {/* Both icons rendered; CSS chooses by theme to stay SSR-safe and crossfade. */}
      <Sun
        aria-hidden
        className="size-[18px] transition-opacity duration-200 dark:hidden"
        strokeWidth={1.75}
      />
      <Moon
        aria-hidden
        className="hidden size-[18px] transition-opacity duration-200 dark:block"
        strokeWidth={1.75}
      />
    </button>
  );
}
