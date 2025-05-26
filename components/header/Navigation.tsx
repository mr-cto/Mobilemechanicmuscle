"use client";

import Link from "next/link";
import { colors } from "./styles";
import { BillingButton } from "@/components/BillingButton";

const navItems = [
  { href: "/services", text: "Services", hoverColor: colors.pink },
  { href: "/admin/dashboard", text: "Admin", hoverColor: colors.orange },
];

interface NavItemProps {
  href: string;
  text: string;
  hoverColor: string;
}

interface ColorConfig {
  textClass: string;
  gradientClass: string;
}

const colorConfigs: Record<string, ColorConfig> = {
  [colors.purple]: {
    textClass: "hover:text-[#9E7AFF]",
    gradientClass: "from-[#9E7AFF]/10",
  },
  [colors.pink]: {
    textClass: "hover:text-[#FE8BBB]",
    gradientClass: "from-[#FE8BBB]/10",
  },
  [colors.orange]: {
    textClass: "hover:text-[#FDCC92]",
    gradientClass: "from-[#FDCC92]/10",
  },
};

function NavItem({ href, text, hoverColor }: NavItemProps) {
  const colorConfig = colorConfigs[hoverColor] || colorConfigs[colors.purple];

  return (
    <div className="group">
      <Link
        href={href}
        className={`relative px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-300 hover:bg-white/5 hover:shadow-lg ${colorConfig.textClass}`}
      >
        {text}
        <div
          className={`absolute inset-0 rounded-lg bg-gradient-to-r ${colorConfig.gradientClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      </Link>
    </div>
  );
}

export function Navigation() {
  return (
    <>
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}

      {/* Billing dropdown with flyout */}
      <div className="group">
        <BillingButton
          variant="text"
          className="relative px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-300 hover:bg-white/5 hover:shadow-lg hover:text-[#9E7AFF]"
        >
          Billing
        </BillingButton>
      </div>
    </>
  );
}
