import { useState } from "react";
import { Link } from "wouter";
import {
  Calendar,
  ChevronDown,
  Github,
  GraduationCap,
  Linkedin,
  Lock,
  Mail,
  User,
  Users,
} from "lucide-react";

import { AuthPortalLayout } from "@/components/AuthPortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLoginUrl } from "@/const";

const LoginJovem = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `${getLoginUrl()}&userType=jovem`;
  };

  const fieldClass =
    "h-12 rounded-[1.15rem] border-paper-3 bg-white text-sm font-medium text-ink shadow-none focus-visible:border-sky/20 focus-visible:ring-sky-5";
  const iconFieldClass = `${fieldClass} pl-11`;
  const compactFieldClass =
    "h-11 rounded-[1.05rem] border-paper-3 bg-white px-4 text-xs font-medium text-ink shadow-none focus-visible:border-sky/20 focus-visible:ring-sky-5";
  const compactIconFieldClass = `${compactFieldClass} pl-9`;
  const labelClass =
    "text-[10px] font-black uppercase tracking-[0.24em] text-ink-4";

  return (
    <AuthPortalLayout
      tone="sky"
      portalLabel="Portal do Talento"
      eyebrow="Entrada jovem"
      icon={GraduationCap}
      title={
        <>
          Sua carreira de <span className="text-sky-1">impacto</span> começa com
          repertório real.
        </>
      }
      description="Entre em squads orientados por desafios concretos, fortaleça seu portfólio e transforme extensão em trajetória profissional."
      features={[
        {
          icon: GraduationCap,
          title: "Experiência aplicada",
          description:
            "Trabalhe em problemas reais e reduza a distância entre teoria e execução.",
        },
        {
          icon: Users,
          title: "Rede qualificada",
          description:
            "Aproxime-se de gestores, lideranças e parceiros com leitura clara do seu potencial.",
        },
        {
          icon: Calendar,
          title: "Ritmo flexível",
          description:
            "Concilie rotina universitária com entregas híbridas, visíveis e rastreáveis.",
        },
      ]}
    >
      <div className="mb-8 space-y-3">
        <p className="editorial-kicker text-sky-1">Trajetória profissional</p>
        <h1 className="mb-0 text-4xl leading-[0.94] sm:text-5xl">
          {isLogin ? "Retome sua jornada." : "Crie seu perfil."}
        </h1>
        <p className="text-base font-medium leading-7 text-ink-3">
          {isLogin
            ? "Acesse oportunidades, squads em andamento e os próximos passos do seu desenvolvimento."
            : "Monte sua vitrine acadêmica e entre em uma rede que conecta estudo, prática e impacto."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className={labelClass}>
                Nome completo
              </Label>
              <div className="relative">
                <User className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
                <Input
                  id="fullName"
                  placeholder="Seu nome completo"
                  className={iconFieldClass}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="course" className={labelClass}>
                  Curso
                </Label>
                <Input
                  id="course"
                  placeholder="Ex: Engenharia Ambiental"
                  className={fieldClass}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester" className={labelClass}>
                  Semestre ou ano
                </Label>
                <div className="relative">
                  <select
                    id="semester"
                    defaultValue=""
                    className="h-12 w-full appearance-none rounded-[1.15rem] border border-paper-3 bg-white px-4 pr-10 text-sm font-medium text-ink outline-none transition-all focus:border-sky/20 focus:ring-[3px] focus:ring-sky-5"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="1">1º ao 3º semestre</option>
                    <option value="2">4º ao 6º semestre</option>
                    <option value="3">7º semestre em diante</option>
                    <option value="4">Pós ou recém-formado</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className={labelClass}>
                  LinkedIn
                </Label>
                <div className="relative">
                  <Linkedin className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-ink-4" />
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/..."
                    className={compactIconFieldClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className={labelClass}>
                  GitHub opcional
                </Label>
                <div className="relative">
                  <Github className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-ink-4" />
                  <Input
                    id="github"
                    placeholder="github.com/..."
                    className={compactIconFieldClass}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>
              E-mail acadêmico ou pessoal
            </Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
              <Input
                id="email"
                type="email"
                placeholder="voce@email.com"
                className={iconFieldClass}
                required
              />
            </div>
          </div>

          {isLogin && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="password" className={labelClass}>
                  Senha
                </Label>
                <button
                  type="button"
                  className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-1 transition-colors hover:text-sky"
                >
                  Recuperar acesso
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={iconFieldClass}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-2 h-[3.25rem] w-full rounded-[1.2rem] bg-ink text-white shadow-[0_22px_44px_rgba(46,91,255,0.12)] hover:bg-ink-2"
        >
          {isLogin ? "Entrar na plataforma" : "Criar perfil de talento"}
        </Button>
      </form>

      <div className="mt-8 border-t border-paper-3 pt-6 text-sm font-medium text-ink-3">
        {isLogin ? "Ainda não faz parte?" : "Já possui perfil de talento?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="font-black uppercase tracking-[0.16em] text-sky-1 transition-colors hover:text-sky"
        >
          {isLogin ? "Cadastre-se grátis" : "Acesse sua conta"}
        </button>
      </div>

      <div className="mt-8 space-y-4">
        <p className="editorial-kicker">Outros acessos</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/login/empresa"
            className="inline-flex h-12 items-center justify-center rounded-[1.15rem] border border-paper-3 bg-paper px-4 text-[11px] font-black uppercase tracking-[0.22em] text-ink transition-colors hover:border-leaf/20 hover:bg-leaf-5 hover:text-leaf-1"
          >
            Empresa
          </Link>
          <Link
            href="/login/universidade"
            className="inline-flex h-12 items-center justify-center rounded-[1.15rem] border border-paper-3 bg-paper px-4 text-[11px] font-black uppercase tracking-[0.22em] text-ink transition-colors hover:border-violet/20 hover:bg-violet-5 hover:text-violet-1"
          >
            Universidade
          </Link>
        </div>
      </div>
    </AuthPortalLayout>
  );
};

export default LoginJovem;
