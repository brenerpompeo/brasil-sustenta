import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Align = "left" | "center";
type Tone = "default" | "bright" | "inverse";

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: Align;
  tone?: Tone;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  /** Marca visual acima do eyebrow (rule-mark verde, estilo editorial) */
  showRule?: boolean;
  /** Nível semântico do título — default h2. Use h1 apenas no hero da página. */
  as?: "h1" | "h2" | "h3";
}

/**
 * SectionHeader — primitivo editorial para cabeçalho de seção.
 *
 * Remove duplicação de eyebrow + title + subtitle repetido em 10+ lugares.
 *
 * @example
 * <SectionHeader
 *   eyebrow="Território"
 *   title="HUBs como base local."
 *   subtitle="A rede cresce por polos regionais..."
 * />
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "default",
  className,
  titleClassName,
  subtitleClassName,
  showRule = false,
  as: Component = "h2",
}: SectionHeaderProps) {
  const alignCls =
    align === "center" ? "text-center items-center" : "text-left items-start";

  const eyebrowCls = cn(
    tone === "bright" ? "text-eyebrow-bright" : "text-eyebrow",
    tone === "inverse" && "text-white/60"
  );

  const titleDefaultCls =
    Component === "h1" ? "text-display" : "text-headline";

  return (
    <header className={cn("flex flex-col", alignCls, className)}>
      {showRule && (
        <span
          aria-hidden="true"
          className="mb-4 inline-block h-[2px] w-10 bg-[color:var(--color-leaf)]"
        />
      )}
      {eyebrow && <span className={eyebrowCls}>{eyebrow}</span>}
      <Component
        className={cn(
          "mt-4 max-w-[22ch]",
          titleDefaultCls,
          tone === "inverse" && "text-white",
          titleClassName
        )}
      >
        {title}
      </Component>
      {subtitle && (
        <p
          className={cn(
            "mt-5 max-w-xl text-body",
            tone === "inverse" && "text-white/70",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}

export default SectionHeader;
