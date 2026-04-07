import { useState, useEffect } from "react";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  User, 
  BookOpen, 
  Code, 
  Globe, 
  Linkedin, 
  Github, 
  Briefcase, 
  Save, 
  Sparkles,
  GraduationCap,
  Calendar,
  Phone,
  Layout,
  HeartPulse,
  Scale,
  Factory,
  Lightbulb,
  Droplets,
  Trees,
  Target,
  Users as UsersIcon,
  Globe2,
  Building2,
  Zap as ZapIcon
} from "lucide-react";

interface FormPerfilTalentoProps {
  initialData?: any;
  onSuccess?: () => void;
}

const skillsOptions = [
  "React", "TypeScript", "Node.js", "Python", "UI/UX", "Data Science", 
  "Marketing Digital", "Gestão de Projetos", "Comunicação", "Estratégia ESG",
  "Design Thinking", "Inglês Fluente", "Figma", "Sustentabilidade"
];

const odsOptions = [
  { id: 1, label: "Erradicação da Pobreza", color: "bg-[#E5243B]", icon: UsersIcon },
  { id: 2, label: "Fome Zero", color: "bg-[#DDA63A]", icon: Target },
  { id: 3, label: "Saúde e Bem-Estar", color: "bg-[#4C9F38]", icon: HeartPulse },
  { id: 4, label: "Educação de Qualidade", color: "bg-[#C5192D]", icon: BookOpen },
  { id: 5, label: "Igualdade de Gênero", color: "bg-[#FF3A21]", icon: UsersIcon },
  { id: 6, label: "Água Potável e Saneamento", color: "bg-[#26BDE2]", icon: Droplets },
  { id: 7, label: "Energia Limpa e Acessível", color: "bg-[#FCC30B]", icon: Lightbulb },
  { id: 8, label: "Trabalho Decente e Crescimento Econômico", color: "bg-[#A21942]", icon: Briefcase },
  { id: 9, label: "Indústria, Inovação e Infraestrutura", color: "bg-[#FD6925]", icon: Factory },
  { id: 10, label: "Redução das Desigualdades", color: "bg-[#DD1367]", icon: Scale },
  { id: 11, label: "Cidades e Comunidades Sustentáveis", color: "bg-[#FD9D24]", icon: Building2 },
  { id: 12, label: "Consumo e Produção Responsáveis", color: "bg-[#BF8B2E]", icon: ZapIcon },
  { id: 13, label: "Ação Contra a Mudança Global do Clima", color: "bg-[#3F7E44]", icon: Globe2 },
  { id: 14, label: "Vida na Água", color: "bg-[#0A97D9]", icon: Droplets },
  { id: 15, label: "Vida Terrestre", color: "bg-[#56C02B]", icon: Trees },
  { id: 16, label: "Paz, Justiça e Instituições Eficazes", color: "bg-[#00689D]", icon: Scale },
  { id: 17, label: "Parcerias e Meios de Implementação", color: "bg-[#19486A]", icon: UsersIcon },
];

export default function FormPerfilTalento({ initialData, onSuccess }: FormPerfilTalentoProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    course: "",
    semester: 1,
    graduationYear: new Date().getFullYear() + 2,
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: [] as string[],
  });

  const updateMutation = trpc.profile.updateTalentProfile.useMutation();

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        bio: initialData.bio || "",
        course: initialData.course || "",
        semester: initialData.semester || 1,
        graduationYear: initialData.graduationYear || new Date().getFullYear() + 2,
        phone: initialData.phone || "",
        linkedin: initialData.linkedin || "",
        github: initialData.github || "",
        portfolio: initialData.portfolio || "",
        skills: initialData.skills || [],
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(formData);
      toast.success("Perfil atualizado com a excelência do Kit 2.0! ✨");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
      {/* ── CARD PRINCIPAL: BIO & IDENTIDADE ── */}
      <Card className="p-8 border-paper-3 bg-white/70 backdrop-blur-xl shadow-xl rounded-[2.5rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky/5 rounded-bl-[100px] -z-0"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-sky/10 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6 text-sky-1" />
          </div>
          <div>
            <h2 className="font-display text-xl font-black text-ink">Identidade Profissional</h2>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-4">Como as empresas te veem</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-ink-3 ml-1">Nome Completo</label>
            <Input 
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              className="bg-white/50 border-paper-3 focus:border-sky-1 rounded-xl h-12 text-sm font-semibold" 
              placeholder="Ex: Lucas Silva Santos"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-ink-3 ml-1">Telefone / WhatsApp</label>
            <Input 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="bg-white/50 border-paper-3 focus:border-sky-1 rounded-xl h-12 text-sm font-semibold" 
              placeholder="(00) 00000-0000"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-ink-3 ml-1">Bio Profissional (Pitch)</label>
            <Textarea 
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value})}
              className="bg-white/50 border-paper-3 focus:border-sky-1 rounded-2xl min-h-[120px] text-sm font-medium leading-relaxed" 
              placeholder="Conte brevemente sua trajetória e seu interesse em projetos de impacto..."
            />
          </div>
        </div>
      </Card>

      {/* ── CARD ACADÊMICO ── */}
      <Card className="p-8 border-paper-3 bg-white/70 backdrop-blur-xl shadow-xl rounded-[2.5rem]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-violet/10 rounded-2xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-violet-2" />
          </div>
          <div>
            <h2 className="font-display text-xl font-black text-ink">Formação & Extensão</h2>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-4">Sua base de conhecimento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-ink-3 ml-1">Curso Superior</label>
            <Input 
              value={formData.course}
              onChange={e => setFormData({...formData, course: e.target.value})}
              className="bg-white/50 border-paper-3 focus:border-violet-2 rounded-xl h-12 text-sm font-semibold" 
              placeholder="Ex: Engenharia de Produção"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-ink-3 ml-1">Semestre Atual</label>
            <Input 
              type="number"
              value={formData.semester}
              onChange={e => setFormData({...formData, semester: parseInt(e.target.value) || 1})}
              className="bg-white/50 border-paper-3 focus:border-violet-2 rounded-xl h-12 text-sm font-semibold" 
            />
          </div>
        </div>
      </Card>

      {/* ── CARD SKILLS & ODS ── */}
      <Card className="p-8 border-paper-3 bg-ink text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-sky-1/10 blur-[80px] pointer-events-none"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-sky-1" />
          </div>
          <div>
            <h2 className="font-display text-xl font-black text-white">Expertise ODS</h2>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">O que você entrega para o mundo</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="text-[11px] font-black uppercase tracking-widest text-white/30 mb-4 block">Habilidades Técnicas</label>
            <div className="flex flex-wrap gap-2">
              {skillsOptions.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all border ${
                    formData.skills.includes(skill)
                      ? "bg-sky-1 border-sky-1 text-white shadow-lg shadow-sky-1/20"
                      : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-black uppercase tracking-widest text-white/30 mb-4 block">Causas & ODS de Afinidade</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {odsOptions.slice(0, 6).map(ods => (
                <div key={ods.id} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-white/10 group cursor-pointer">
                  <div className={`w-8 h-8 ${ods.color} rounded-lg flex-shrink-0 shadow-lg flex items-center justify-center`}>
                    <ods.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white/80 group-hover:text-white leading-tight">{ods.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-white/20 mt-4 italic">* Apenas os 6 principais ODS baseados no seu perfil acadêmico são exibidos para curadoria IA.</p>
          </div>
        </div>
      </Card>

      {/* ── CARD LINKS ── */}
      <Card className="p-8 border-paper-3 bg-white/70 backdrop-blur-xl shadow-xl rounded-[2.5rem]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-ink/5 rounded-2xl flex items-center justify-center">
            <Layout className="w-6 h-6 text-ink-3" />
          </div>
          <div>
            <h2 className="font-display text-xl font-black text-ink">Conexões Externas</h2>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-4">Seu portfólio digital</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-ink-3 ml-1 flex items-center gap-1.5">
              <Linkedin className="w-3 h-3" /> LinkedIn
            </label>
            <Input 
              value={formData.linkedin}
              onChange={e => setFormData({...formData, linkedin: e.target.value})}
              className="bg-white/50 border-paper-3 focus:border-ink rounded-xl h-12 text-sm font-semibold" 
              placeholder="https://linkedin.com/in/seu-perfil"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-ink-3 ml-1 flex items-center gap-1.5">
              <Github className="w-3 h-3" /> GitHub
            </label>
            <Input 
              value={formData.github}
              onChange={e => setFormData({...formData, github: e.target.value})}
              className="bg-white/50 border-paper-3 focus:border-ink rounded-xl h-12 text-sm font-semibold" 
              placeholder="https://github.com/seu-usuario"
            />
          </div>
        </div>
      </Card>

      {/* ── ACTIONS ── */}
      <div className="flex justify-end gap-4 pt-4">
        <Button 
          type="submit" 
          disabled={updateMutation.isPending}
          className="bg-sky-1 hover:bg-sky text-white font-bold text-[15px] px-10 py-6 rounded-2xl shadow-xl shadow-sky-1/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {updateMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <Save className="w-5 h-5" /> Salvar Perfil Profissional
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
