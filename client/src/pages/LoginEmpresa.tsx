import { useState } from "react";
import { Link } from "wouter";
import {
  Briefcase,
  Building2,
  ChevronDown,
  Globe,
  Lock,
  Mail,
  Users,
} from "lucide-react";

import { AuthPortalLayout } from "@/components/AuthPortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLoginUrl } from "@/const";

const LoginEmpresa = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `${getLoginUrl()}&userType=empresa`;
  };

  const fieldClass =
    "h-12 rounded-[1.15rem] border-paper-3 bg-white text-sm font-medium text-ink shadow-none focus-visible:border-leaf/20 focus-visible:ring-leaf-5";
  const iconFieldClass = `${fieldClass} pl-11`;
  const labelClass =
    "text-[10px] font-black uppercase tracking-[0.24em] text-ink-4";

  return (
    <AuthPortalLayout
      tone="leaf"
      portalLabel="Portal Corporativo"
      eyebrow="Entrada empresarial"
      icon={Building2}
      title={
        <>
          Sua empresa em operação <span className="text-leaf-1">ESG</span> com
          clareza editorial.
        </>
      }
      description="Coordene squads, parceiros e entregas em um ambiente institucional mais limpo, confiante e pronto para escalar."
      features={[
        {
          icon: Users,
          title: "Squads sob medida",
          description:
            "Monte times com fit técnico e visão socioambiental em poucas etapas.",
        },
        {
          icon: Briefcase,
          title: "Projetos monitoráveis",
          description:
            "Acompanhe marcos, evidências e execução sem perder a leitura estratégica.",
        },
        {
          icon: Globe,
          title: "Narrativa auditável",
          description:
            "Transforme entregas em relatórios claros para governança, reputação e ODS.",
        },
      ]}
    >
      <div className="mb-8 space-y-3">
        <p className="editorial-kicker text-leaf-1">Coordenação corporativa</p>
        <h1 className="mb-0 text-4xl leading-[0.94] sm:text-5xl">
          {isLogin ? "Acesse sua operação." : "Ative sua empresa."}
        </h1>
        <p className="text-base font-medium leading-7 text-ink-3">
          {isLogin
            ? "Entre para revisar squads ativos, aprovações e indicadores do pipeline."
            : "Cadastre a organização e habilite uma frente editorial de projetos com impacto real."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="companyName" className={labelClass}>
                Nome da empresa
              </Label>
              <div className="relative">
                <Building2 className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Ex: Brasil Sustenta Participações"
                  className={iconFieldClass}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cnpj" className={labelClass}>
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  type="text"
                  placeholder="00.000.000/0001-00"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className={labelClass}>
                  Porte
                </Label>
                <div className="relative">
                  <select
                    id="size"
                    defaultValue="media"
                    className="h-12 w-full appearance-none rounded-[1.15rem] border border-paper-3 bg-white px-4 pr-10 text-sm font-medium text-ink outline-none transition-all focus:border-leaf/20 focus:ring-[3px] focus:ring-leaf-5"
                  >
                    <option value="pequena">Até 50 colaboradores</option>
                    <option value="media">50 a 500 colaboradores</option>
                    <option value="grande">Acima de 500 colaboradores</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className={labelClass}>
                Site ou LinkedIn
              </Label>
              <div className="relative">
                <Globe className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
                <Input
                  id="website"
                  type="url"
                  placeholder="https://empresa.com.br"
                  className={iconFieldClass}
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>
              E-mail corporativo
            </Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
              <Input
                id="email"
                type="email"
                placeholder="contato@empresa.com.br"
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
                  className="text-[11px] font-black uppercase tracking-[0.18em] text-leaf-1 transition-colors hover:text-leaf"
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
          className="mt-2 h-[3.25rem] w-full rounded-[1.2rem] bg-ink text-white shadow-[0_22px_44px_rgba(0,255,133,0.12)] hover:bg-ink-2"
        >
          {isLogin ? "Entrar no portal" : "Criar conta corporativa"}
        </Button>
      </form>

      <div className="mt-8 border-t border-paper-3 pt-6 text-sm font-medium text-ink-3">
        {isLogin ? "Ainda não é parceiro?" : "Já possui cadastro corporativo?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="font-black uppercase tracking-[0.16em] text-leaf-1 transition-colors hover:text-leaf"
        >
          {isLogin ? "Cadastre sua empresa" : "Acessar conta"}
        </button>
      </div>

      <div className="mt-8 space-y-4">
        <p className="editorial-kicker">Outros acessos</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/login/jovem"
            className="inline-flex h-12 items-center justify-center rounded-[1.15rem] border border-paper-3 bg-paper px-4 text-[11px] font-black uppercase tracking-[0.22em] text-ink transition-colors hover:border-sky/20 hover:bg-sky-5 hover:text-sky-1"
          >
            Jovem talento
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

export default LoginEmpresa;
