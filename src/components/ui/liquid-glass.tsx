"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// SVG Filter for glass distortion
export const GlassFilter: React.FC = () => (
  <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
    <defs>
      <filter id="glass-distortion" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="4" seed="42" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="3" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="25" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="0.5" result="blurred" />
        <feComposite in="blurred" in2="SourceGraphic" operator="over" />
      </filter>
    </defs>
  </svg>
);

// Glass Effect Wrapper
export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{
        boxShadow: "0 6px 6px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.08)",
        ...style,
      }}
    >
      {/* Glass refraction layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: "blur(16px) saturate(1.8)",
          WebkitBackdropFilter: "blur(16px) saturate(1.8)",
          filter: "url(#glass-distortion)",
        }}
      />

      {/* Tint layer */}
      <div
        className="absolute inset-0 z-[1] bg-background/20"
        style={{
          boxShadow: "inset 0 0 30px -8px rgba(255,255,255,0.5)",
        }}
      />

      {/* Specular highlight */}
      <div
        className="absolute inset-x-0 top-0 z-[2] h-[40%] opacity-30"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-[3]">
        {children}
      </div>
    </div>
  );
};
