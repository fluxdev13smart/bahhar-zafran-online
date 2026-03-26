"use client";

import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type LiquidGlassProps = {
    borderRadius?: number;
    tintOpacity?: number;
    blur?: number;
    className?: string;
};

export const LiquidGlass = (props: LiquidGlassProps) => {
    const { borderRadius = 0, tintOpacity = 0.08, blur = 8, className } = props;

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" className="absolute overflow-hidden">
                <defs>
                    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.008 0.008"
                            numOctaves="2"
                            seed="92"
                            result="noise" />
                        <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="blurred"
                            scale="80"
                            xChannelSelector="R"
                            yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
            <div
                className={cn(
                    "absolute inset-0 isolate pointer-events-none",
                    "before:absolute before:inset-0 before:z-0 before:bg-[rgba(255,255,255,var(--lg-tint-opacity))] before:shadow-[inset_0_0_20px_-5px_rgba(255,255,255,0.7)] before:content-['']",
                    "after:absolute after:inset-0 after:isolate after:-z-[1] after:[filter:url(#glass-distortion)] after:backdrop-blur-[var(--lg-blur)] after:content-['']",
                    className,
                )}
                style={
                    {
                        "--lg-border-radius": `${borderRadius}px`,
                        "--lg-tint-opacity": tintOpacity,
                        "--lg-blur": `${blur}px`,
                        borderRadius: `${borderRadius}px`,
                    } as CSSProperties
                }
            />
        </>
    );
};
