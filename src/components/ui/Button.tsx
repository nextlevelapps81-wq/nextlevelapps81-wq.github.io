import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  children: ReactNode;
}

const variants = {
  primary:
    "bg-accent-purple text-white hover:bg-accent-purple-dark shadow-md hover:shadow-lg glow-purple",
  secondary:
    "bg-accent-pink-soft text-accent-purple hover:bg-accent-pink/20 dark:text-accent-pink",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-bg-card",
  outline:
    "border border-border text-text-primary hover:bg-bg-card hover:border-accent-purple/30",
};

const sizes = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-13 px-8 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
      {children}
    </button>
  );
}
