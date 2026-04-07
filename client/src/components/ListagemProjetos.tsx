import { Button } from "@/components/ui/button";
import { Briefcase, Eye, ChevronRight, RefreshCw, Calendar, CircleDollarSign, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Project {
  id: number;
  companyId: number;
  title: string;
  description: string;
  category: string;
  duration: number;
  teamSize: number;
  requiredSkills: string[] | null;
  budget: number | null;
  status: "draft" | "open" | "in_progress" | "completed" | "cancelled";
  startDate: Date | null;
  endDate: Date | null;
  deliverables: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ListagemProjetosProps {
  projects: Project[];
  isLoading: boolean;
  onRefresh: () => void;
  onSelectProject?: (projectId: number) => void;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "open": return { label: "Aberto", color: "bg-leaf-5 text-leaf", bgGrad: "from-[#1C6B3A] to-[#59C47E]" };
    case "in_progress": return { label: "Em Andamento", color: "bg-sky-3 text-sky", bgGrad: "from-[#1A4A7A] to-[#2E72BC]" };
    case "draft": return { label: "Rascunho", color: "bg-sun-3 text-sun", bgGrad: "from-ink-3 to-ink-4" };
    case "completed": return { label: "Concluído", color: "bg-violet-3 text-violet", bgGrad: "from-violet to-violet-2" };
    case "cancelled": return { label: "Cancelado", color: "bg-ember-3 text-ember", bgGrad: "from-ink to-ink-2" };
    default: return { label: status, color: "bg-paper-3 text-ink-3", bgGrad: "from-ink-3 to-ink-4" };
  }
};

const categoryLabels: Record<string, {label: string, ods: string}> = {
  esg: {label: "ESG", ods: "13"},
  direitos_humanos: {label: "Direitos Humanos", ods: "10"},
  ods: {label: "ODS Variados", ods: "17"},
  comunicacao: {label: "Comunicação", ods: "4"},
  marketing: {label: "Marketing", ods: "8"},
  website: {label: "Website", ods: "9"},
  ui_ux: {label: "UI/UX Design", ods: "9"},
  design_thinking: {label: "Design", ods: "9"},
};

export default function ListagemProjetos({
  projects,
  isLoading,
  onRefresh,
  onSelectProject,
}: ListagemProjetosProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12 rounded-2xl border border-paper-3 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-leaf-3 mx-auto mb-4"></div>
        <p className="font-semibold text-ink-3 uppercase tracking-widest text-[11px]">Carregando seus projetos...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white border text-center border-paper-3 rounded-2xl p-12">
        <Briefcase className="w-16 h-16 text-paper-3 mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-ink mb-2">Nenhum projeto construído</h3>
        <p className="text-sm text-ink-4 mb-6">Criando projetos atraentes você mobiliza talentos universitários incríveis.</p>
        <button className="bg-leaf text-white font-bold text-sm px-6 py-2.5 rounded-lg border-2 border-leaf hover:bg-white hover:text-leaf transition-colors">
          Comece agora
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filtros e Controles (Design System style) */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-paper-3 rounded-xl p-3 mb-6">
        <div className="flex gap-2 items-center flex-wrap">
          <select className="h-9 px-3 text-xs font-semibold bg-white border border-paper-3 rounded-lg text-ink outline-none focus:border-leaf focus:ring-2 focus:ring-leaf-5">
            <option>Todos os status</option>
            <option>Abertos</option>
            <option>Em Andamento</option>
          </select>
          <select className="h-9 px-3 text-xs font-semibold bg-white border border-paper-3 rounded-lg text-ink outline-none focus:border-leaf focus:ring-2 focus:ring-leaf-5">
            <option>Todas as Categorias</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onRefresh} className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 border border-paper-3 text-ink rounded-lg hover:bg-paper-2 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Atualizar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const statusConfig = getStatusConfig(project.status);
          const catConfig = categoryLabels[project.category] || { label: project.category, ods: "17" };

          return (
            <div
              key={project.id}
              className="group bg-white border border-paper-3 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-leaf/10 transition-all duration-300 flex flex-col"
            >
              {/* Cover Image com Gradiente e Status Badge */}
              <div className={`h-[128px] relative flex items-end p-3 bg-gradient-to-br ${statusConfig.bgGrad}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70"></div>
                <span className={`relative z-10 text-[11px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${statusConfig.color}`}>
                  {statusConfig.label}
                </span>
              </div>

              {/* Corpo do Card */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  <span className="inline-block border border-leaf-4 bg-leaf-5 text-leaf text-[11px] font-bold px-2 py-0.5 rounded-full">
                    ODS {catConfig.ods}
                  </span>
                  <span className="inline-block border border-paper-3 bg-paper-2 text-ink-3 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {catConfig.label}
                  </span>
                </div>
                
                <h3 className="font-display text-[15px] font-bold text-ink leading-[1.25] mb-2 line-clamp-2">
                  {project.title}
                </h3>
                
                <p className="text-xs text-ink-3 leading-[1.55] line-clamp-2 mb-3">
                  {project.description}
                </p>
                
                {/* Metadados */}
                <div className="flex flex-col gap-1.5 mt-auto mb-4 text-[11px] font-medium text-ink-3">
                  <span className="flex items-center gap-1.5">
                    <span className="opacity-70 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Data Final:</span> {project.endDate ? format(new Date(project.endDate), "dd MMM yyyy", { locale: ptBR }) : "Não definida"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="opacity-70 flex items-center gap-1"><CircleDollarSign className="w-3.5 h-3.5" /> Orçamento:</span> {project.budget ? `R$ ${project.budget.toLocaleString("pt-BR")}` : "Voluntário"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="opacity-70 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Busca Equipe:</span> {project.teamSize} talentos
                  </span>
                </div>

                {/* Foot/Actions */}
                <div className="flex gap-2 mt-auto pt-3 border-t border-paper-3">
                  <button
                    onClick={() => onSelectProject && onSelectProject(project.id)}
                    className="flex-1 flex items-center justify-center bg-leaf text-white text-xs font-semibold py-2 rounded-lg border-2 border-leaf hover:bg-transparent hover:text-leaf transition-colors"
                  >
                    Analisar Time <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center bg-paper-2 text-ink-2 border border-paper-3 rounded-lg hover:bg-paper-3 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
