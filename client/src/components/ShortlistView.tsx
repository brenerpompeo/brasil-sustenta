import { ODSFitScoreCard } from "./ODSFitScoreCard"
import { ODSBadge } from "./ODSBadge"
import { Check, User } from "lucide-react"

type ShortlistItem = {
  talent: {
    id: number
    fullName: string
    skills: string[]
    avatar?: string | null
    course?: string | null
    university?: string | null
  }
  skillsFit: number
  odsFit: number
  contextFit: number
  totalScore: number
  odsBadges: number[]
}

type ShortlistViewProps = {
  items: ShortlistItem[]
  onSelectTalent?: (talentId: number) => void
  selectedTalentIds?: number[]
}

function TalentAvatar({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-white/8"
      />
    )
  }

  return (
    <div
      className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-white/5 border border-white/10 text-white/60 font-bold text-sm"
      style={{ fontFamily: "Fraunces, serif" }}
    >
      {initials || <User className="w-5 h-5" />}
    </div>
  )
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 75 ? "#00FF41" : score >= 50 ? "#FFD700" : "#FF003C"

  return (
    <span
      className="font-mono text-lg font-bold leading-none"
      style={{ color, fontFamily: "JetBrains Mono, monospace" }}
    >
      {score}
    </span>
  )
}

export function ShortlistView({
  items,
  onSelectTalent,
  selectedTalentIds = [],
}: ShortlistViewProps) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-[#0A0A0A] border border-white/8 rounded-xl p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
          <User className="w-6 h-6 text-white/30" />
        </div>
        <p className="text-white/40 text-sm">
          Nenhum talento encontrado para este brief
        </p>
        <p className="text-white/20 text-xs mt-1">
          Ajuste os critérios ou aguarde novas candidaturas
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isSelected = selectedTalentIds.includes(item.talent.id)
        const rank = idx + 1

        return (
          <div
            key={item.talent.id}
            className="bg-[#0A0A0A] border border-white/8 rounded-xl p-5 hover:border-white/16 transition-all"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Rank + Avatar */}
              <div className="flex items-start gap-3 sm:items-center flex-shrink-0">
                <span
                  className="text-xs font-mono text-white/20 w-5 text-right mt-1 sm:mt-0"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  #{rank}
                </span>
                <TalentAvatar
                  name={item.talent.fullName}
                  avatarUrl={item.talent.avatar}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3
                      className="font-bold text-white text-base leading-tight"
                      style={{ fontFamily: "Fraunces, serif" }}
                    >
                      {item.talent.fullName}
                    </h3>
                    <p className="text-white/40 text-xs mt-0.5">
                      {item.talent.course && item.talent.university
                        ? `${item.talent.course} · ${item.talent.university}`
                        : item.talent.course || item.talent.university || "Formação não informada"}
                    </p>
                  </div>
                  {/* Score mobile */}
                  <div className="sm:hidden">
                    <ScoreBadge score={item.totalScore} />
                  </div>
                </div>

                {/* Skills chips */}
                {item.talent.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.talent.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="bg-white/5 border border-white/8 text-white/50 text-[11px] px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {item.talent.skills.length > 5 && (
                      <span className="text-white/30 text-[11px] px-1">
                        +{item.talent.skills.length - 5}
                      </span>
                    )}
                  </div>
                )}

                {/* ODS badges */}
                {item.odsBadges.length > 0 && (
                  <div className="flex gap-1.5 mt-2">
                    {item.odsBadges.slice(0, 6).map((ods) => (
                      <ODSBadge key={ods} ods={ods} size="sm" />
                    ))}
                  </div>
                )}
              </div>

              {/* Right panel: Score + Fit bars + Botão */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-3 sm:flex-shrink-0 sm:w-48">
                {/* Score desktop */}
                <div className="hidden sm:block">
                  <ODSFitScoreCard
                    score={{
                      skillsFit: item.skillsFit,
                      odsFit: item.odsFit,
                      contextFit: item.contextFit,
                      totalScore: item.totalScore,
                      explanation: "",
                      odsBadges: [],
                    }}
                    compact
                  />
                </div>

                {/* Botão selecionar */}
                <button
                  onClick={() => onSelectTalent?.(item.talent.id)}
                  disabled={!onSelectTalent}
                  className={[
                    "min-h-[44px] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 flex-shrink-0",
                    isSelected
                      ? "bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30"
                      : "bg-[#00FF41] text-black hover:bg-[#00FF41]/90 active:scale-[0.98]",
                    !onSelectTalent && "opacity-50 cursor-not-allowed",
                  ].join(" ")}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Selecionado
                    </>
                  ) : (
                    "Selecionar"
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
