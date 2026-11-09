import { BrandMark } from "@/components/ui/brand-mark";
import { marqueeItems } from "@/lib/data/skills";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className="edge-fade relative overflow-hidden border-y border-line/70 bg-surface/25 py-4"
      aria-hidden="true"
    >
      <div className="marquee-track items-center gap-8">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-8"
          >
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted/70">
              {item}
            </span>
            <BrandMark
              className="h-3 w-3 shrink-0 text-brand/50"
              accent={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
