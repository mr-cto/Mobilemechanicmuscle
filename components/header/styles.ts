export const colors = {
  purple: "#9E7AFF",
  pink: "#FE8BBB",
  orange: "#FDCC92",
} as const;

export const commonButtonStyles = {
  base: "px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-300",
  hover: "hover:bg-white/5 hover:shadow-lg",
} as const;

export const flyoutStyles = {
  panel:
    "absolute right-0 mt-2 w-72 rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10 shadow-2xl backdrop-blur-sm",
  animation:
    "opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0",
} as const;
