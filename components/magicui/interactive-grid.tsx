"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridProps {
  className?: string;
  containerClassName?: string;
  cellClassName?: string;
  variant?: "dots" | "lines";
}

export function InteractiveGrid({
  className,
  containerClassName,
  cellClassName,
  variant = "lines",
}: InteractiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();

      const x = ((clientX - left) / width) * 100;
      const y = ((clientY - top) / height) * 100;

      container.style.setProperty("--x-percentage", `${x}%`);
      container.style.setProperty("--y-percentage", `${y}%`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(circle_at_var(--x-percentage,0%)_var(--y-percentage,0%),rgba(30,64,175,0.15),transparent_50%)]",
          variant === "dots" ? "[background-size:30px_30px]" : "",
          variant === "lines"
            ? "[mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"
            : "",
          "transition-transform duration-200",
          className
        )}
      />
      <div className={cn("relative z-10", cellClassName)}></div>
    </div>
  );
}
