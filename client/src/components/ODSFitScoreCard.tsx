import { ODSBadge } from "./ODSBadge"

type FitScore = {
  skillsFit: number
  odsFit: number
  contextFit: number
  totalScore: number
  explanation: string
  odsBadges?: number[]
}

type ODSFitScoreCardProps = {
  score: FitScore
  talentName?: string
  compact?: boolean
}

function ScoreBar({ value, color, label }: { value: number; color: string; label: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/50 font-mono uppercase tracking-wider">{label}</span>
        <span className="text-xs font-mono" style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function ODSFitScoreCard({ score, talentName, compact = false }: ODSFitScoreCardProps) {
  const scoreColor = score.totalScore >= 75 ? "#00FF41" : score.totalScore >= 50 ? "#FFD700" : "#FF003C"

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-2xl font-bold"
          style={{ color: scoreColor, fontFamily: "JetBrains Mono, monospace" }}
        >
          {score.totalScore}
        </span>
        <div className="flex-1 space-y-1">
          <ScoreBar value={score.skillsFit} color="#00FF41" label="Skills" />
          <ScoreBar value={score.odsFit} color="#FFD700" label="ODS" />
          <ScoreBar value={score.contextFit} color="#0047FF" label="Contexto" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0A0A0A] border border-white/8 rounded-xl p-5 space-y-4">
      <div className="flex items-baseline gap-2">
        <span
          className="text-5xl font-bold leading-none"
          style={{ color: scoreColor, fontFamily: "JetBrains Mono, monospace" }}
        >
          {score.totalScore}
        </span>
        <span className="text-white/30 text-sm font-mono">/100</span>
        {talentName && (
          <span className="ml-auto text-sm text-white/60 font-medium">{talentName}</span>
        )}
      </div>

      <div className="space-y-3">
        <ScoreBar value={score.skillsFit} color="#00FF41" label="Skills Fit" />
        <ScoreBar value={score.odsFit} color="#FFD700" label="ODS Fit" />
        <ScoreBar value={score.contextFit} color="#0047FF" label="Context Fit" />
      </div>

      <p className="text-sm text-white/60 leading-relaxed border-t border-white/8 pt-3">
        {score.explanation}
      </p>

      {score.odsBadges && score.odsBadges.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {score.odsBadges.map(ods => (
            <ODSBadge key={ods} ods={ods} size="sm" showLabel />
          ))}
        </div>
      )}
    </div>
  )
}
