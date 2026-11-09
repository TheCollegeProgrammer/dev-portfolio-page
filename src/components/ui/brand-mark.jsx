import { cn } from "@/lib/utils";
export function BrandMark({ className, accent = true }) {
    return (<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.92">
        <path d="M27 25 16 19 10 9"/>
        <path d="M26 31 11 30 5 38"/>
        <path d="M28 36 14 44 10 54"/>
        <path d="M31 39 26 52 23 60"/>
        <path d="M37 25 48 19 54 9"/>
        <path d="M38 31 53 30 59 38"/>
        <path d="M36 36 50 44 54 54"/>
        <path d="M33 39 38 52 41 60"/>
      </g>
      <path d="M32 12 41 30 32 46 23 30Z" fill={accent ? "#E62429" : "currentColor"}/>
      <path d="M32 19 36.5 30 32 39.5 27.5 30Z" fill="#08090D"/>
    </svg>);
}
