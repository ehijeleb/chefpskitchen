import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------------------
   Container — consistent page gutters + max width
   --------------------------------------------------------------------------- */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return <div className={cn("mx-auto w-full px-5 sm:px-8", max, className)}>{children}</div>;
}

/* ---------------------------------------------------------------------------
   Eyebrow — letter-spaced small-caps label (echoes the KITCHEN lockup)
   --------------------------------------------------------------------------- */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

/* ---------------------------------------------------------------------------
   SectionHeading — eyebrow + display heading + optional intro
   --------------------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: ElementType;
  className?: string;
}) {
  const Tag = as;
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className="text-balance text-3xl sm:text-4xl lg:text-5xl">{title}</Tag>
      {intro ? (
        <p
          className={cn(
            "mt-1 max-w-2xl text-lg leading-relaxed text-ink-muted",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Button — link or button, three variants, real pressed state
   --------------------------------------------------------------------------- */
type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight " +
  "transition-[transform,background-color,border-color,color] duration-150 [transition-timing-function:var(--ease-out)] " +
  "active:scale-[0.97] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-gold text-on-accent hover:brightness-[1.06] shadow-sm",
  outline:
    "border border-border-strong text-ink hover:border-terracotta hover:text-accent-text bg-transparent",
  ghost: "text-ink hover:text-accent-text bg-transparent",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-base",
};

type ButtonAsLink = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

export function ButtonLink({ href, variant = "primary", size = "md", className, children, ...rest }: ButtonAsLink) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ComponentPropsWithoutRef<"button">;

export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
