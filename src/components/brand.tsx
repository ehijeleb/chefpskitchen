import Image from "next/image";
import { cn } from "@/lib/cn";

/** Wordmark — theme-swapped. Both variants render; CSS shows the right one,
 *  which is SSR-safe (no hydration mismatch) and lets the theme toggle crossfade
 *  instantly. Same aspect ratio (1600x1099) for both files. */
export function Wordmark({
  className,
  priority = false,
  width = 240,
}: {
  className?: string;
  priority?: boolean;
  width?: number;
}) {
  const height = Math.round((width * 1099) / 1600);
  return (
    <span className={cn("inline-block", className)}>
      <Image
        src="/brand/wordmark-light.png"
        alt="Chef P's Kitchen"
        width={width}
        height={height}
        priority={priority}
        className="block h-auto w-full dark:hidden"
      />
      <Image
        src="/brand/wordmark-dark.png"
        alt="Chef P's Kitchen"
        width={width}
        height={height}
        priority={priority}
        aria-hidden
        className="hidden h-auto w-full dark:block"
      />
    </span>
  );
}

/** Circular Ps stamp mark — theme-swapped. (1024x1052) */
export function Stamp({ className, size = 72 }: { className?: string; size?: number }) {
  const height = Math.round((size * 1052) / 1024);
  return (
    <span className={cn("inline-block", className)}>
      <Image
        src="/brand/stamp-light.png"
        alt="Chef P's Kitchen stamp"
        width={size}
        height={height}
        className="block h-auto w-full dark:hidden"
      />
      <Image
        src="/brand/stamp-dark.png"
        alt=""
        width={size}
        height={height}
        aria-hidden
        className="hidden h-auto w-full dark:block"
      />
    </span>
  );
}

/** Small golden brush-stroke flourish used as a section divider. Decorative. */
export function SwooshDivider({ className, width = 132 }: { className?: string; width?: number }) {
  const height = Math.round((width * 277) / 1200);
  return (
    <Image
      src="/brand/swoosh.png"
      alt=""
      aria-hidden
      width={width}
      height={height}
      className={cn("h-auto select-none", className)}
    />
  );
}
