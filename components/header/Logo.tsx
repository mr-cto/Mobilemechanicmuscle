"use client";

import Link from "next/link";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useRef } from "react";

export function Logo() {
  const logoRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={logoRef} className="relative overflow-hidden rounded-xl p-1">
      <BorderBeam
        duration={5}
        className="from-[#9E7AFF] via-[#FE8BBB] to-[#FDCC92]"
      />
      <Link href="/" className="flex items-center space-x-3 relative z-10 py-1">
        <img
          src="/assets/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="rounded-full ring-2 ring-white/20"
        />
        <span className="text-xl font-bold">Mobile Mechanic Muscle</span>
      </Link>
    </div>
  );
}
