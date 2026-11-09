import { cn } from "@/lib/utils";

type WebProps = {
  className?: string;
  center?: number;
  rings?: number;
  spokes?: number;
  opacity?: number;
};

export function RadialWeb({
  className,
  center = 300,
  rings = 7,
  spokes = 18,
  opacity = 1,
}: WebProps) {
  const step = (Math.PI * 2) / spokes;
  const radii = Array.from({ length: rings }, (_, index) => 46 + index * 38);

  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      style={{ opacity }}
    >
      <g stroke="currentColor" strokeWidth="0.75">
        {Array.from({ length: spokes }, (_, index) => {
          const angle = index * step;
          return (
            <line
              key={`spoke-${index}`}
              x1={center}
              y1={center}
              x2={center + Math.cos(angle) * 300}
              y2={center + Math.sin(angle) * 300}
            />
          );
        })}
        {radii.map((radius, ringIndex) => {
          const points = Array.from({ length: spokes }, (_, index) => {
            const angle = index * step + (ringIndex % 2) * (step / 4);
            return `${center + Math.cos(angle) * radius},${
              center + Math.sin(angle) * radius
            }`;
          }).join(" ");
          return (
            <polygon
              key={`ring-${ringIndex}`}
              points={points}
              strokeOpacity={0.36 + ringIndex * 0.08}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function WebCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M0 40 Q 180 55 360 0" opacity="0.4" />
        <path d="M0 96 Q 200 116 400 40" opacity="0.5" />
        <path d="M0 164 Q 214 180 400 104" opacity="0.36" />
        <path d="M0 236 Q 212 252 400 186" opacity="0.28" />
        <path d="M0 312 Q 200 326 400 280" opacity="0.2" />
        <path d="M40 0 Q 55 180 0 360" opacity="0.4" />
        <path d="M96 0 Q 116 200 40 400" opacity="0.5" />
        <path d="M164 0 Q 180 214 104 400" opacity="0.36" />
        <path d="M236 0 Q 252 212 186 400" opacity="0.28" />
        <path d="M312 0 Q 326 200 280 400" opacity="0.2" />
      </g>
    </svg>
  );
}

export function WebDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center gap-4",
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/12 to-white/15" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand/70" fill="none">
        <path
          d="M12 4v16M5 8l14 8M19 8 5 16"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/12 to-white/15" />
    </div>
  );
}

export function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-10 w-10", className)}
    >
      <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
