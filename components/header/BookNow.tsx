"use client";

import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export function BookNow() {
  return (
    <div>
      <Link href="/book" className="ml-2">
        <ShimmerButton className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:text-gray-900 font-bold px-6 py-2.5 rounded-full before:from-yellow-200/50 before:via-orange-200/50 before:to-yellow-200/50 shadow-lg hover:shadow-xl">
          Book Now
        </ShimmerButton>
      </Link>
    </div>
  );
}
