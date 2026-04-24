"use client";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50";

  const variants = {
    primary:
      "bg-[#45ef56] text-black hover:bg-[#3cdb4e] shadow-[0_0_20px_rgba(69,239,86,0.2)]",
    secondary: "bg-purple-600 text-white hover:bg-purple-700",
    outline:
      "border border-white/10 bg-transparent hover:bg-white/5 text-white",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};
