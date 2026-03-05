import { type HTMLAttributes } from "react";

type BadgeVariant = "default" | "blue" | "green" | "amber" | "zinc";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
  blue: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800",
  green:
    "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-800",
  amber:
    "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-800",
  zinc: "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-200 dark:ring-zinc-800",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
