import { cn } from "@/lib/utils";

export interface LoadingSkeletonProps {
  className?: string;
  /** Número de linhas/itens de skeleton a renderizar */
  lines?: number;
  /** Variante visual */
  variant?: "text" | "card" | "list" | "table";
  tone?: "paper" | "ink";
}

/**
 * LoadingSkeleton — estado de carregamento padronizado.
 *
 * Substitui spinner/skeleton divergente em 3 dashboards. Usa shimmer editorial.
 *
 * @example
 * <LoadingSkeleton variant="card" lines={3} />
 */
export function LoadingSkeleton({
  className,
  lines = 3,
  variant = "text",
  tone = "paper",
}: LoadingSkeletonProps) {
  const base =
    tone === "ink"
      ? "bg-white/8 animate-pulse-soft"
      : "bg-[color:var(--color-paper-3)] animate-pulse-soft";

  if (variant === "card") {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Carregando"
        className={cn(
          "rounded-2xl border border-[color:var(--color-border)] bg-white p-6 md:p-8",
          tone === "ink" && "border-white/10 bg-[color:var(--color-ink-2)]",
          className
        )}
      >
        <div className={cn("h-3 w-20 rounded", base)} />
        <div className={cn("mt-6 h-8 w-3/4 rounded", base)} />
        <div className="mt-5 space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-3 rounded",
                base,
                i === lines - 1 ? "w-2/3" : "w-full"
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Carregando"
        className={cn("flex flex-col gap-3", className)}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-4 rounded-xl border border-[color:var(--color-border)] bg-white p-4",
              tone === "ink" && "border-white/10 bg-[color:var(--color-ink-2)]"
            )}
          >
            <div className={cn("size-10 shrink-0 rounded-full", base)} />
            <div className="flex-1 space-y-2">
              <div className={cn("h-3 w-1/3 rounded", base)} />
              <div className={cn("h-3 w-2/3 rounded", base)} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Carregando"
        className={cn("overflow-hidden rounded-xl border border-[color:var(--color-border)]", className)}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-4 border-b border-[color:var(--color-border)] bg-white px-5 py-4 last:border-b-0",
              tone === "ink" && "border-white/10 bg-[color:var(--color-ink-2)]"
            )}
          >
            <div className={cn("h-3 w-1/5 rounded", base)} />
            <div className={cn("h-3 w-2/5 rounded", base)} />
            <div className={cn("h-3 w-1/6 rounded", base)} />
            <div className={cn("ml-auto h-3 w-16 rounded", base)} />
          </div>
        ))}
      </div>
    );
  }

  // text variant
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando"
      className={cn("space-y-2", className)}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 rounded",
            base,
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

export default LoadingSkeleton;
