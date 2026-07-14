import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "brass" | "outline" | "soft";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        variant === "default" && "bg-ink/8 text-ink/80",
        variant === "brass" && "bg-brass/15 text-brass-dark",
        variant === "outline" && "border border-ink/15 text-ink/70",
        variant === "soft" && "bg-cream-dark text-ink/70",
        className
      )}
    >
      {children}
    </span>
  );
}
