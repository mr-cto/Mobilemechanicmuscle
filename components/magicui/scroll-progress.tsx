"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export function ScrollProgress({
  className,
  color = "#1e40af",
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-1 z-50 transition-transform duration-200",
        className
      )}
      style={{
        background: `linear-gradient(to right, ${color}, ${color} ${scrollProgress}%, transparent ${scrollProgress}%)`,
      }}
    />
  );
}
