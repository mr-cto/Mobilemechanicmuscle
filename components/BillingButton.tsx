"use client";

import { useState, useRef, useEffect } from "react";
import { BillingFlyout } from "./BillingFlyout";
import { ShimmerButton } from "./magicui/shimmer-button";
import { ChevronDown } from "lucide-react";

type BillingButtonProps = {
  initialTab?: "pay" | "lookup";
  variant?: "primary" | "secondary" | "text";
  className?: string;
  children?: React.ReactNode;
};

export function BillingButton({
  initialTab = "pay",
  variant = "primary",
  className = "",
  children,
}: BillingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buttonText = children || "Billing";

  const getButtonStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB] text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity";
      case "secondary":
        return "bg-gray-800 text-white font-medium px-4 py-2 rounded-lg border border-white/10 hover:bg-gray-700 transition-colors";
      case "text":
        return "text-white/90 hover:text-white transition-colors";
      default:
        return "bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB] text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity";
    }
  };

  return (
    <div ref={containerRef} className="relative group">
      {variant === "primary" ? (
        <ShimmerButton
          onClick={() => setIsOpen(!isOpen)}
          className={`${className} flex items-center gap-1`}
        >
          {buttonText}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </ShimmerButton>
      ) : (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`${getButtonStyles()} ${className} flex items-center gap-1`}
        >
          {buttonText}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
      <BillingFlyout
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialTab={initialTab}
        anchorRef={buttonRef}
      />
    </div>
  );
}
