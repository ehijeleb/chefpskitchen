import type { MenuGroup as MenuGroupType } from "@/data/menu";
import { Reveal } from "@/components/reveal";
import { SwooshDivider } from "@/components/brand";

export function MenuGroup({ group }: { group: MenuGroupType }) {
  return (
    <Reveal as="section" id={group.id} className="scroll-mt-28">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl sm:text-4xl">{group.title}</h2>
        <SwooshDivider width={104} />
      </div>

      <ul className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
        {group.dishes.map((dish) => (
          <li key={dish.name} className="border-b border-border pb-5">
            <h3 className="font-display text-xl leading-tight">{dish.name}</h3>
            <p className="mt-1.5 text-[0.95rem] italic leading-relaxed text-ink-muted">
              {dish.description}
            </p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
