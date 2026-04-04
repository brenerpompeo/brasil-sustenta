import { useState } from "react";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { X } from "lucide-react";

interface CreateProjectInput {
  title: string;
  description: string;
  category: "esg" | "direitos_humanos" | "ods" | "comunicacao" | "marketing" | "website" | "ui_ux" | "design_thinking";
  duration: number;
  teamSize: number;
  budget: number;
  deliverables?: string;
}

interface FormularioCriarProjetoProps {
  onSuccess: () => void;
  onCancel: () => void;
}

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

const skillsOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Design",
  "Marketing",
  "Comunicação",
  "Análise de Dados",
  "Gestão de Projetos",
  "Sustentabilidade",
  "Inovação",
];

export default function FormularioCriarProjeto({ onSuccess, onCancel }: FormularioCriarProjetoProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<CreateProjectInput>>({
    title: "",
    description: "",
    duration: 30,
    teamSize: 5,
    budget: 0,
    deliverables: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const createProjectMutation = trpc.company.createProject.useMutation();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title || formData.title.length < 5) {
      newErrors.title = "Título deve ter pelo menos 5 caracteres";
    }
    if (!formData.description || formData.description.length < 20) {
      newErrors.description = "Descrição deve ter pelo menos 20 caracteres";
    }
    if (!formData.category) {
      newErrors.category = "Selecione uma categoria";
    }
    if (!formData.duration || formData.duration < 1) {
      newErrors.duration = "Duração deve ser pelo menos 1 dia";
    }
    if (!formData.teamSize || formData.teamSize < 1) {
      newErrors.teamSize = "Equipe deve ter pelo menos 1 membro";
    }
    if (formData.budget === undefined || formData.budget < 0) {
      newErrors.budget = "Orçamento não pode ser negativo";
    }
    if (selectedSkills.length === 0) {
      newErrors.skills = "Selecione pelo menos uma habilidade";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await createProjectMutation.mutateAsync({
        title: formData.title!,
        description: formData.description!,
        category: formData.category!,
        duration: formData.duration!,
        teamSize: formData.teamSize!,
        budget: formData.budget!,
        deliverables: formData.deliverables,
        requiredSkills: selectedSkills,
      });

      if (result.success) {
        toast.success(result.message);
        onSuccess();
      }
    } catch (error) {
      toast.error("Erro ao criar projeto. Tente novamente.");
      console.error(error);
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <Card className="bg-card border border-border p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Criar Novo Projeto</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-background rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-foreground/60" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Título do Projeto *
          </label>
          <Input
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ex: Desenvolvimento de App de Sustentabilidade"
            className="bg-background border border-border text-foreground"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Descrição do Projeto *
          </label>
          <Textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descreva o projeto, objetivos, escopo e impacto esperado..."
            className="bg-background border border-border text-foreground min-h-[120px]"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Categoria e Duração */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Categoria *
            </label>
            <Select
              value={formData.category || ""}
              onValueChange={(value) => setFormData({ ...formData, category: value as any })}
            >
              <SelectTrigger className="bg-background border border-border text-foreground">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Duração (dias) *
            </label>
            <Input
              value={formData.duration || ""}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
              type="number"
              placeholder="Ex: 30"
              className="bg-background border border-border text-foreground"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>
        </div>

        {/* Tamanho da Equipe e Orçamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tamanho da Equipe *
            </label>
            <Input
              value={formData.teamSize || ""}
              onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 0 })}
              type="number"
              placeholder="Ex: 5"
              className="bg-background border border-border text-foreground"
            />
            {errors.teamSize && (
              <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Orçamento (R$) *
            </label>
            <Input
              value={formData.budget || ""}
              onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
              type="number"
              placeholder="Ex: 5000"
              className="bg-background border border-border text-foreground"
            />
            {errors.budget && (
              <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
            )}
          </div>
        </div>

        {/* Habilidades Necessárias */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Habilidades Necessárias *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skillsOptions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-2 rounded-lg border transition-colors text-sm font-medium ${
                  selectedSkills.includes(skill)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-foreground hover:border-primary/50"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          {errors.skills && (
            <p className="text-red-500 text-sm mt-2">{errors.skills}</p>
          )}
        </div>

        {/* Entregáveis */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Entregáveis (opcional)
          </label>
          <Textarea
            value={formData.deliverables || ""}
            onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
            placeholder="Descreva os entregáveis esperados..."
            className="bg-background border border-border text-foreground min-h-[80px]"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={createProjectMutation.isPending}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {createProjectMutation.isPending ? "Criando..." : "Criar Projeto"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
