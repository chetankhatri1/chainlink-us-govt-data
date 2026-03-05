import { type HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  tighter?: boolean;
}

export function Section({
  as: Tag = "section",
  tighter = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={[
        tighter ? "py-12 lg:py-16" : "py-16 lg:py-24",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={[
        "mb-12",
        centered && "text-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
          {label}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
