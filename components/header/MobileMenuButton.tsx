"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";

export function MobileMenuButton() {
  return (
    <div className="md:hidden">
      <ShimmerButton className="p-2 text-white rounded-lg bg-gray-900/50 backdrop-blur-sm before:from-white/5 before:via-white/10 before:to-white/5 hover:bg-gray-800/50 transition-colors">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ShimmerButton>
    </div>
  );
}
