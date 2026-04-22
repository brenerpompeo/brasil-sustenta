import { cn } from "@/lib/utils"

const ODS_COLORS: Record<number, { bg: string; label: string }> = {
  1: { bg: "#E5243B", label: "Sem Pobreza" },
  2: { bg: "#DDA63A", label: "Fome Zero" },
  3: { bg: "#4C9F38", label: "Saúde" },
  4: { bg: "#C5192D", label: "Educação" },
  5: { bg: "#FF3A21", label: "Igualdade de Gênero" },
  6: { bg: "#26BDE2", label: "Água Limpa" },
  7: { bg: "#FCC30B", label: "Energia Limpa" },
  8: { bg: "#A21942", label: "Trabalho Decente" },
  9: { bg: "#FD6925", label: "Indústria e Inovação" },
  10: { bg: "#DD1367", label: "Redução das Desigualdades" },
  11: { bg: "#FD9D24", label: "Cidades Sustentáveis" },
  12: { bg: "#BF8B2E", label: "Consumo Responsável" },
  13: { bg: "#3F7E44", label: "Ação Climática" },
  14: { bg: "#0A97D9", label: "Vida na Água" },
  15: { bg: "#56C02B", label: "Vida Terrestre" },
  16: { bg: "#00689D", label: "Paz e Justiça" },
  17: { bg: "#19486A", label: "Parcerias" },
}

type ODSBadgeProps = {
  ods: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

const SIZES = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-8 h-8 text-xs",
  lg: "w-12 h-12 text-sm font-bold",
}

export function ODSBadge({ ods, size = "md", showLabel = false, className }: ODSBadgeProps) {
  const config = ODS_COLORS[ods]
  if (!config) return null

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white flex-shrink-0",
          SIZES[size]
        )}
        style={{ backgroundColor: config.bg }}
        title={`ODS ${ods}: ${config.label}`}
      >
        {ods}
      </div>
      {showLabel && (
        <span className="text-[10px] text-white/50 text-center leading-tight max-w-[48px]">
          {config.label}
        </span>
      )}
    </div>
  )
}
