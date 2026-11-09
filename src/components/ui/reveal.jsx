"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
export function Reveal({ children, className, delay = 0, y = 30, start = "top 88%", }) {
    const element = useRef(null);
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const tween = gsap.fromTo(element.current, { y, opacity: 0 }, {
                y: 0,
                opacity: 1,
                delay,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element.current,
                    start,
                    once: true,
                },
            });
            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        });
        return () => mm.revert();
    }, { scope: element });
    return (<div ref={element} className={cn(className)}>
      {children}
    </div>);
}
