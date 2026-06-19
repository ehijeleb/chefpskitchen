import Image from "next/image";
import type { SignatureDish } from "@/data/dishes";

/** Dish card. No real dish photography ships in the brand pack, so rather than
 *  fake a stock photo (slop), the media area is a warm branded tile: a large
 *  translucent Fraunces initial over a cream/gold wash with the brush mark.
 *  Hover lifts the card and gently scales the tile (hover-capable devices only).
 *  TODO: drop real dish photography into the .media area when available. */
export function DishCard({ dish, index }: { dish: SignatureDish; index: number }) {
  const initial = dish.name.replace(/^Chef P's\s+/, "").charAt(0);

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface-raised
                 transition-[transform,box-shadow,border-color] duration-200 [transition-timing-function:var(--ease-out)]
                 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow)]"
    >
      <div className="media relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-surface-sunken to-surface-raised">
        {/* large translucent initial */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-display text-[7rem] leading-none text-terracotta/15 transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover:scale-105 dark:text-gold/15"
        >
          {initial}
        </span>
        {/* brush mark */}
        <Image
          src="/brand/swoosh.png"
          alt=""
          aria-hidden
          width={600}
          height={139}
          className="absolute bottom-5 left-1/2 w-2/3 -translate-x-1/2 opacity-80 transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover:scale-105"
        />
        <span className="eyebrow absolute left-4 top-4">{dish.category}</span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl leading-tight">{dish.name}</h3>
        <p className="text-sm leading-relaxed text-ink-muted">{dish.description}</p>
      </div>
    </article>
  );
}
