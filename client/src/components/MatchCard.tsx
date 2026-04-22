import { Briefcase, Clock, Zap, ChevronRight } from "lucide-react";
import { ODSBadge } from "@/components/ODSBadge";
import { cn } from "@/lib/utils";

export type FitScore = {
  totalScore: number;
  skillsScore?: number;
  odsScore?: number;
  explanation?: string;
};

export type MatchCardProject = {
  id: number;
  title: string;
  company: string;
  description?: string;
  category?: string;
  requiredSkills?: string[];
  odsAlignment?: number[];
  duration?: string;
  budget?: string;
};

type MatchCardProps = {
  project: MatchCardProject;
  fitScore?: FitScore;
  onApply: (projectId: number) => void;
  isApplying?: boolean;
};

export function MatchCard({ project, fitScore, onApply, isApplying }: MatchCardProps) {
  const hasFitScore = fitScore !== undefined && fitScore.totalScore > 0;
  const scoreColor =
    fitScore && fitScore.totalScore >= 80
      ? "#00FF41"
      : fitScore && fitScore.totalScore >= 60
      ? "#FFD700"
      : "#FAFAFA";

  return (
    <div className="group relative flex flex-col bg-[#0A0A0A] border border-white/8 rounded-xl overflow-hidden transition-all hover:border-[#00FF41]/30 hover:shadow-[0_0_24px_rgba(0,255,65,0.06)]">
      {hasFitScore && (
        <div
          className="absolute top-0 left-0 h-[2px] transition-all"
          style={{
            width: `${fitScore!.totalScore}%`,
            backgroundColor: scoreColor,
          }}
        />
      )}

      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {project.category && (
              <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase text-white/40 mb-1">
                {project.category}
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-[#FAFAFA] leading-tight line-clamp-2">
              {project.title}
            </h3>
          </div>

          {hasFitScore && (
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-lg border border-white/10 bg-[#050505]">
              <span
                className="font-mono text-lg font-black leading-none"
                style={{ color: scoreColor, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {fitScore!.totalScore}
              </span>
              <span className="text-[8px] font-bold text-white/30 tracking-widest uppercase mt-0.5">fit</span>
            </div>
          )}
        </div>

        {/* Empresa */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <Briefcase className="w-3.5 h-3.5 text-[#00FF41]/60 flex-shrink-0" />
          <span className="font-semibold truncate">{project.company}</span>
        </div>

        {/* Descrição */}
        {project.description && (
          <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{project.description}</p>
        )}

        {/* ODS Badges */}
        {project.odsAlignment && project.odsAlignment.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.odsAlignment.slice(0, 6).map((ods) => (
              <ODSBadge key={ods} ods={ods} size="sm" />
            ))}
          </div>
        )}

        {/* Skills */}
        {project.requiredSkills && project.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.requiredSkills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-semibold px-2 py-0.5 rounded border border-[#00FF41]/10 text-white/50 bg-[#00FF41]/5"
              >
                {skill}
              </span>
            ))}
            {project.requiredSkills.length > 6 && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded border border-white/8 text-white/30">
                +{project.requiredSkills.length - 6}
              </span>
            )}
          </div>
        )}

        {/* Fit Score Explanation */}
        {hasFitScore && fitScore!.explanation && (
          <div className="flex items-start gap-2 bg-[#00FF41]/5 border border-[#00FF41]/15 rounded-lg px-3 py-2.5">
            <Zap className="w-3.5 h-3.5 text-[#00FF41] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-white/60 leading-snug">{fitScore!.explanation}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 flex flex-col gap-3">
        {project.duration && (
          <div className="flex items-center gap-1.5 text-[11px] text-white/30 font-medium">
            <Clock className="w-3 h-3" />
            {project.duration}
          </div>
        )}

        <button
          onClick={() => onApply(project.id)}
          disabled={isApplying}
          className={cn(
            "w-full min-h-[44px] flex items-center justify-center gap-2",
            "bg-[#00FF41] text-[#050505] font-black text-[13px] uppercase tracking-widest rounded-lg",
            "hover:bg-[#CCFF00] active:scale-[0.98] transition-all",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Tenho Interesse
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
