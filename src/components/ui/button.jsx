import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
export const buttonVariants = cva("group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            primary: "bg-brand text-white shadow-[0_0_0_0_rgba(230,36,41,0)] hover:bg-[#f02b31] hover:shadow-[0_12px_40px_-12px_rgba(230,36,41,0.65)]",
            outline: "border border-line bg-white/[0.025] text-ink hover:border-brand/50 hover:bg-white/[0.05]",
            ghost: "border border-transparent text-muted hover:border-line hover:text-ink",
        },
        size: {
            sm: "h-9 px-4",
            md: "h-12 px-6",
            lg: "h-14 px-7",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});
export function ButtonLink({ className, variant, size, ...props }) {
    return (<a className={cn(buttonVariants({ variant, size }), className)} {...props}/>);
}
export function Button({ className, variant, size, ...props }) {
    return (<button className={cn(buttonVariants({ variant, size }), className)} {...props}/>);
}
