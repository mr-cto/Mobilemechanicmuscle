"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden transition-all duration-300",
        "before:absolute before:inset-0 before:bg-[length:200%_100%] before:animate-shimmer before:bg-gradient-to-r before:z-10",
        "after:absolute after:inset-0 after:bg-inherit after:z-20",
        "[&>*]:relative [&>*]:z-30",
        className
      )}
      {...props}
    />
  );
});
ShimmerButton.displayName = "ShimmerButton";
