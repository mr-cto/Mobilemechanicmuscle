"use client";

import { Logo } from "@/components/header/Logo";
import { Navigation } from "@/components/header/Navigation";
import { BookNow } from "@/components/header/BookNow";
import { MobileMenuButton } from "@/components/header/MobileMenuButton";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-950/95 via-gray-900/95 to-gray-950/95 text-white p-4 shadow-xl sticky top-0 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />

        <nav className="hidden md:flex items-center gap-3 relative">
          <Navigation />
          <BookNow />
        </nav>

        <MobileMenuButton />
      </div>
    </header>
  );
}
