import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, DollarSign, Calendar, ChevronRight } from "lucide-react";

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
}

const statusLabels: Record<string, { label: string; color: string }> = {
  draft: { label: "Rascunho", color: "bg-gray-500" },
  open: { label: "Aberto", color: "bg-green-500" },
  in_progress: { label: "Em Andamento", color: "bg-blue-500" },
  completed: { label: "Concluído", color: "bg-purple-500" },
  cancelled: { label: "Cancelado", color: "bg-red-500" },
};

const categoryLabels: Record<string, string> = {
  esg: "ESG",
  direitos_humanos: "Direitos Humanos",
  ods: "ODS",
  comunicacao: "Comunicação",
  marketing: "Marketing",
  website: "Website",
  ui_ux: "UI/UX Design",
  design_thinking: "Design Thinking",
};

export default function ListagemProjetos({
  projects,
  isLoading,
  onRefresh,
}: ListagemProjetosProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-foreground/60">Carregando projetos...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Card className="bg-card border border-border p-12 text-center">
        <Briefcase className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Nenhum projeto criado
        </h3>
        <p className="text-foreground/60 mb-6">
          Comece criando seu primeiro projeto ESG
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Meus Projetos ({projects.length})
        </h2>
        <Button
          onClick={onRefresh}
          variant="outline"
          className="text-foreground"
        >
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="bg-card border border-border p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Conteúdo Principal */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {project.title}
                  </h3>
                  <Badge
                    className={`${
                      statusLabels[project.status]?.color || "bg-gray-500"
                    } text-white text-xs whitespace-nowrap`}
                  >
                    {statusLabels[project.status]?.label || project.status}
                  </Badge>
                </div>

                <p className="text-foreground/60 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags de Categoria e Habilidades */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {categoryLabels[project.category] || project.category}
                  </Badge>
                  {(project.requiredSkills || []).slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {(project.requiredSkills || []).length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{(project.requiredSkills || []).length - 3}
                    </Badge>
                  )}
                </div>

                {/* Informações do Projeto */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-foreground/40" />
                    <span className="text-foreground/60">
                      {project.teamSize} membros
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-foreground/40" />
                    <span className="text-foreground/60">
                      {project.duration} dias
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-foreground/40" />
                    <span className="text-foreground/60">
                      R$ {(project.budget || 0).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-foreground/40" />
                    <span className="text-foreground/60">
                      ID: {project.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão de Ação */}
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
