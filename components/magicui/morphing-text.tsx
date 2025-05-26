"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MorphingTextProps {
  texts: string[];
  className?: string;
  duration?: number;
}

export function MorphingText({
  texts,
  className,
  duration = 2000,
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, duration / 2);
    }, duration);

    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <span
      className={cn(
        "inline-block transition-all duration-500",
        isAnimating ? "opacity-0 transform -translate-y-4" : "opacity-100",
        className
      )}
    >
      {texts[currentIndex]}
    </span>
  );
}
