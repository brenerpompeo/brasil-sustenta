import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, TrendingUp, Target } from "lucide-react";
import { Badge } from "./badge";

interface AiMatchCardProps {
  talentName: string;
  avatarUrl?: string; // We can use the avatar component if exported
  fitScore: number;
  reasoning: string;
  skills: string[];
}

export function AiMatchCard({ talentName, fitScore, reasoning, skills, avatarUrl }: AiMatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-xl"
    >
      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 blur-3xl rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Score Ring */}
        <div className="flex-shrink-0 flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10">
           <div className="relative w-24 h-24 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/10" />
               <motion.circle 
                 cx="50" cy="50" r="45" 
                 fill="none" 
                 stroke="currentColor" 
                 strokeWidth="8" 
                 strokeLinecap="round"
                 className={fitScore >= 80 ? "text-green-400" : fitScore >= 50 ? "text-amber-400" : "text-neutral-400"}
                 strokeDasharray="283"
                 initial={{ strokeDashoffset: 283 }}
                 animate={{ strokeDashoffset: 283 - (283 * fitScore) / 100 }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
               />
             </svg>
             <div className="absolute flex flex-col items-center justify-center">
               <span className="text-2xl font-bold text-white">{fitScore}%</span>
               <span className="text-[10px] text-white/60 uppercase tracking-widest">Match</span>
             </div>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                {talentName}
                {fitScore >= 80 && <CheckCircle2 className="w-5 h-5 text-green-400" />}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.slice(0, 3).map(skill => (
                  <Badge key={skill} variant="secondary" className="bg-white/10 text-white/90 border-white/5 hover:bg-white/20">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 3 && (
                  <Badge variant="outline" className="border-white/10 text-white/50">+{skills.length - 3}</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
               <Sparkles className="w-4 h-4 text-primary-light" />
               <span className="text-xs font-medium text-primary-light">GenAI Fit</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-sm text-white/80 leading-relaxed font-light">
            <span className="font-semibold text-white/90 flex items-center gap-2 mb-1">
              <Target className="w-4 h-4" /> Justificativa da IA:
            </span>
            {reasoning}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
