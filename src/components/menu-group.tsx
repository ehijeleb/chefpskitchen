import type { MenuGroup as MenuGroupType, DietCode } from "@/data/menu";
import { DIET_LABEL } from "@/data/menu";
import { Reveal } from "@/components/reveal";
import { SwooshDivider } from "@/components/brand";

function DietTags({ tags }: { tags?: DietCode[] }) {
  if (!tags?.length) return null;
  return (
    <span className="ml-2 inline-flex gap-1 align-middle">
      {tags.map((t) => (
        <abbr
          key={t}
          title={DIET_LABEL[t]}
          className="rounded-full border border-border-strong px-1.5 py-px text-[0.625rem] font-semibold uppercase not-italic tracking-wide text-ink-muted no-underline"
        >
          {t}
        </abbr>
      ))}
    </span>
  );
}

export function MenuGroup({ group }: { group: MenuGroupType }) {
  return (
    <Reveal as="section" id={group.id} className="scroll-mt-28">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl sm:text-4xl">{group.title}</h2>
        <SwooshDivider width={104} />
      </div>

      {group.note ? (
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{group.note}</p>
      ) : null}

      {group.body ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{group.body}</p>
      ) : null}

      {group.dishes?.length ? (
        <ul className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
          {group.dishes.map((dish) => (
            <li key={dish.name} className="border-b border-border pb-5">
              <h3 className="font-display text-xl leading-tight">
                {dish.name}
                <DietTags tags={dish.tags} />
              </h3>
              {dish.description ? (
                <p className="mt-1.5 text-[0.95rem] italic leading-relaxed text-ink-muted">
                  {dish.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {group.swallow ? (
        <div className="mt-9">
          <p className="eyebrow mb-3">Swallow</p>
          <ul className="flex flex-wrap gap-2">
            {group.swallow.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-surface-raised px-3.5 py-1.5 text-sm text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
          {group.swallow.note ? (
            <p className="mt-3 text-sm italic text-ink-muted">{group.swallow.note}</p>
          ) : null}
        </div>
      ) : null}
    </Reveal>
  );
}
