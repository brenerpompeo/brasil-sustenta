import { ReactNode } from "react";
import { Compass, LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
  tone?: "paper" | "ink";
  children?: ReactNode;
}

/**
 * EmptyState — estado vazio padronizado para listagens, dashboards, admin.
 *
 * Substitui padrão inconsistente onde cada dashboard inventava seu próprio
 * "Nenhum dado ainda" com tratamento visual diferente.
 *
 * @example
 * <EmptyState
 *   icon={Users}
 *   title="Nenhum squad ativo"
 *   description="Publique um brief ESG para receber shortlist em até 72h."
 *   actionLabel="Publicar brief"
 *   actionHref="/dashboard/empresa/brief/novo"
 * />
 */
export function EmptyState({
  icon: Icon = Compass,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
  tone = "paper",
  children,
}: EmptyStateProps) {
  const toneCls =
    tone === "ink"
      ? "border-white/10 bg-[color:var(--color-ink-2)] text-white"
      : "border-[color:var(--color-border)] bg-[color:var(--color-card)]";

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed px-6 py-16 text-center",
        toneCls,
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-grid size-16 place-items-center rounded-full",
          tone === "ink"
            ? "bg-white/5 text-white/60"
            : "bg-[color:var(--color-paper-2)] text-[color:var(--color-ink-4)]"
        )}
      >
        <Icon className="size-7" strokeWidth={1.5} />
      </span>

      <div className="max-w-md space-y-2">
        <h3
          className={cn(
            "font-display text-xl font-semibold tracking-tight",
            tone === "ink"
              ? "text-white"
              : "text-[color:var(--color-ink)]"
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "text-sm leading-relaxed",
              tone === "ink"
                ? "text-white/64"
                : "text-[color:var(--color-ink-3)]"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {children}

      {actionLabel && (actionHref || onAction) && (
        actionHref ? (
          <Link
            href={actionHref}
            className="btn-base btn-primary min-h-11 mt-2 text-sm"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="btn-base btn-primary min-h-11 mt-2 text-sm"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}

export default EmptyState;
