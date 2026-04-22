import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsletterForm({ 
  className, 
  variant = "dark" 
}: { 
  className?: string; 
  variant?: "dark" | "light" 
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isDark = variant === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API Call
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  if (status === "success") {
    return (
      <div className={cn("flex flex-col items-start gap-4 p-6 border", isDark ? "border-white/20 bg-white/5" : "border-[color:var(--color-ink)]/20 bg-black/5", className)}>
        <CheckCircle2 className={cn("size-6", isDark ? "text-[color:var(--color-leaf-bright)]" : "text-[color:var(--color-leaf)]")} />
        <div>
          <h4 className={cn("font-display text-xl font-bold", isDark ? "text-white" : "text-[color:var(--color-ink)]")}>
            Acesso requisitado com sucesso.
          </h4>
          <p className={cn("font-mono text-sm mt-2", isDark ? "text-white/70" : "text-[color:var(--color-ink-3)]")}>
            Entraremos em contato assim que abrirmos a alocação do seu território.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", className)}>
      <div className="flex w-full items-center">
        <input
          type="email"
          required
          placeholder="Seu melhor e-mail corporativo ou pessoal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={cn(
            "h-14 w-full flex-1 rounded-none border-2 border-r-0 px-4 font-mono text-sm shadow-none outline-none transition-colors",
            isDark 
              ? "border-white/30 bg-transparent text-white placeholder:text-white/40 focus:border-[color:var(--color-leaf-bright)]" 
              : "border-[color:var(--color-ink)]/30 bg-transparent text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink)]/40 focus:border-[color:var(--color-leaf)]"
          )}
        />
        <Button 
          type="submit" 
          disabled={status === "loading"}
          className={cn(
            "h-14 rounded-none border-2 px-6 shadow-none flex items-center justify-center font-mono text-xs font-bold uppercase tracking-widest",
            isDark
              ? "border-[color:var(--color-leaf-bright)] bg-[color:var(--color-leaf-bright)] text-[color:var(--color-ink)] hover:bg-white hover:border-white"
              : "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-white hover:bg-[color:var(--color-paper-2)] hover:text-[color:var(--color-ink)]"
          )}
        >
          {status === "loading" ? <Loader2 className="size-5 animate-spin" /> : "Garantir Vaga"}
        </Button>
      </div>
      <p className={cn("font-mono text-[0.65rem] uppercase tracking-widest", isDark ? "text-white/50" : "text-[color:var(--color-ink-4)]")}>
        *Operação restrita neste estágio. Receba priority access.
      </p>
    </form>
  );
}

export function WaitlistCTA({ personaLabel, href, isDark = false, className }: { personaLabel: string; href?: string; isDark?: boolean; className?: string; }) {
  return (
    <div className={cn("p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative", isDark ? "bg-white/5 border border-white/20" : "bg-black/5 border border-[color:var(--color-ink)]/20", className)}>
      <div className="relative z-10 flex flex-col items-start gap-2 max-w-xl">
        <span className={cn("font-mono text-[0.65rem] font-bold uppercase tracking-widest px-2 py-1 border inline-flex items-center gap-2", isDark ? "border-white/30 text-white/70" : "border-[color:var(--color-ink)]/30 text-[color:var(--color-ink-3)]")}>
          <span className={cn("size-1.5 rounded-full animate-pulse", isDark ? "bg-white/70" : "bg-[color:var(--color-ink)]")} />
          Priority Access - Waitlist
        </span>
        <h4 className={cn("font-display text-2xl font-bold mt-2", isDark ? "text-white" : "text-[color:var(--color-ink)]")}>
          Operação em fase de Pilots.
        </h4>
        <p className={cn("font-mono text-xs leading-relaxed", isDark ? "text-white/70" : "text-[color:var(--color-ink-3)]")}>
          O {personaLabel} não é aberto ao público geral. Selecionamos os próximos participantes com base na capacidade operacional dos HUBs via ODS Fit Score. Garanta sua prioridade.
        </p>
      </div>
      {href ? (
        <Button asChild size="lg" className={cn("shrink-0 relative z-10 rounded-none border-2 font-mono text-xs font-bold uppercase tracking-widest", isDark ? "bg-white text-black border-white hover:bg-[color:var(--color-paper-2)]" : "bg-[color:var(--color-ink)] text-white border-[color:var(--color-ink)] hover:bg-[color:var(--color-paper-2)] hover:text-black")}>
          <a href={href}>
            Solicitar acesso piloto <ArrowRight className="ml-2 size-4" />
          </a>
        </Button>
      ) : (
        <NewsletterForm variant={isDark ? "dark" : "light"} className="w-full md:w-auto relative z-10" />
      )}
    </div>
  );
}
