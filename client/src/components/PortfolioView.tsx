import { Briefcase, Star, Award } from "lucide-react";
import { ODSBadge } from "@/components/ODSBadge";

export type PortfolioProject = {
  id: number;
  title: string;
  company: string;
  skills?: string[];
  odsAlignment?: number[];
  rating?: number;
  completedAt?: string;
  description?: string;
};

type PortfolioViewProps = {
  projects: PortfolioProject[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          fill={i < rating ? "#FFD700" : "transparent"}
          stroke={i < rating ? "#FFD700" : "#FFFFFF20"}
        />
      ))}
      <span className="ml-1.5 text-[11px] font-mono text-[#FFD700] font-bold">{rating}/5</span>
    </div>
  );
}

function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <div className="flex flex-col bg-[#0A0A0A] border border-white/8 rounded-xl p-5 gap-4 hover:border-[#00FF41]/20 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold text-[#FAFAFA] leading-tight line-clamp-2">
            {project.title}
          </h3>
        </div>
        <span className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-black tracking-[0.15em] uppercase px-2 py-1 rounded border border-[#00FF41]/20 text-[#00FF41] bg-[#00FF41]/5">
          <Award className="w-3 h-3" />
          Concluído
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-white/40">
        <Briefcase className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
        <span className="font-semibold truncate">{project.company}</span>
      </div>

      {project.description && (
        <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{project.description}</p>
      )}

      {project.odsAlignment && project.odsAlignment.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.odsAlignment.slice(0, 5).map((ods) => (
            <ODSBadge key={ods} ods={ods} size="sm" />
          ))}
        </div>
      )}

      {project.skills && project.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-semibold px-2 py-0.5 rounded border border-white/8 text-white/40"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {project.rating !== undefined && project.rating > 0 && (
        <div className="pt-1 border-t border-white/5">
          <StarRating rating={project.rating} />
        </div>
      )}

      {project.completedAt && (
        <p className="text-[11px] text-white/25 font-medium -mt-1">{project.completedAt}</p>
      )}
    </div>
  );
}

export function PortfolioView({ projects }: PortfolioViewProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
          <Award className="w-7 h-7 text-white/20" />
        </div>
        <div>
          <p className="text-[#FAFAFA] font-bold text-lg mb-1">Seu portfolio está vazio.</p>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">
            Conclua um squad para aparecer aqui e construir seu repertório com entrega real.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((project) => (
        <PortfolioCard key={project.id} project={project} />
      ))}
    </div>
  );
}
