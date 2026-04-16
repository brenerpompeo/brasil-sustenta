import { useState } from "react";
import { Link } from "wouter";
import {
  Building2,
  ChevronDown,
  Lock,
  Mail,
  MapPin,
  School,
  User,
} from "lucide-react";

import { AuthPortalLayout } from "@/components/AuthPortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLoginUrl } from "@/const";

const LoginUniversidade = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `${getLoginUrl()}&userType=universidade`;
  };

  const brazilianStates = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const fieldClass =
    "h-12 rounded-[1.15rem] border-paper-3 bg-white text-sm font-medium text-ink shadow-none focus-visible:border-violet/20 focus-visible:ring-violet-5";
  const iconFieldClass = `${fieldClass} pl-11`;
  const labelClass =
    "text-[10px] font-black uppercase tracking-[0.24em] text-ink-4";

  return (
    <AuthPortalLayout
      tone="violet"
      portalLabel="Portal Acadêmico"
      eyebrow="Entrada institucional"
      icon={School}
      title={
        <>
          Sua instituição no centro do{" "}
          <span className="text-violet-1">impacto</span>.
        </>
      }
      description="Conecte extensão, empregabilidade e governança acadêmica em uma experiência mais clara para coordenação, reitoria e parcerias."
      features={[
        {
          icon: School,
          title: "Extensão rastreável",
          description:
            "Acompanhe horas, convênios e evidências em uma base pronta para leitura institucional.",
        },
        {
          icon: Building2,
          title: "Reputação de marca",
          description:
            "Transforme participação em sinal concreto de inovação e protagonismo regional.",
        },
        {
          icon: MapPin,
          title: "Impacto territorial",
          description:
            "Aproxime campus, comunidades e empresas em projetos mais conectados ao contexto local.",
        },
      ]}
    >
      <div className="mb-8 space-y-3">
        <p className="editorial-kicker text-violet-1">Gestão universitária</p>
        <h1 className="mb-0 text-4xl leading-[0.94] sm:text-5xl">
          {isLogin ? "Entre no portal." : "Solicite parceria."}
        </h1>
        <p className="text-base font-medium leading-7 text-ink-3">
          {isLogin
            ? "Revise convênios, acompanhe evidências acadêmicas e leia o impacto dos alunos em execução."
            : "Cadastre a instituição e integre sua operação de extensão ao ecossistema Brasil Sustenta."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="universityName" className={labelClass}>
                Nome da instituição
              </Label>
              <div className="relative">
                <School className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
                <Input
                  id="universityName"
                  placeholder="Universidade Federal de..."
                  className={iconFieldClass}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="acronym" className={labelClass}>
                  Sigla
                </Label>
                <Input
                  id="acronym"
                  placeholder="Ex: UFPA"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className={labelClass}>
                  Estado
                </Label>
                <div className="relative">
                  <select
                    id="state"
                    defaultValue=""
                    className="h-12 w-full appearance-none rounded-[1.15rem] border border-paper-3 bg-white px-4 pr-10 text-sm font-medium text-ink outline-none transition-all focus:border-violet/20 focus:ring-[3px] focus:ring-violet-5"
                  >
                    <option value="" disabled>
                      UF
                    </option>
                    {brazilianStates.map(state => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson" className={labelClass}>
                Responsável pela parceria
              </Label>
              <div className="relative">
                <User className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
                <Input
                  id="contactPerson"
                  placeholder="Nome da coordenação"
                  className={iconFieldClass}
                  required
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>
              E-mail institucional
            </Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4" />
              <Input
                id="email"
                type="email"
                placeholder="contato@universidade.edu.br"
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
                  className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-1 transition-colors hover:text-violet"
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
          className="mt-2 h-[3.25rem] w-full rounded-[1.2rem] bg-ink text-white shadow-[0_22px_44px_rgba(91,82,255,0.12)] hover:bg-ink-2"
        >
          {isLogin
            ? "Entrar no portal institucional"
            : "Solicitar token de adesão"}
        </Button>
      </form>

      <div className="mt-8 border-t border-paper-3 pt-6 text-sm font-medium text-ink-3">
        {isLogin ? "Ainda não é parceira?" : "Já possui acesso institucional?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="font-black uppercase tracking-[0.16em] text-violet-1 transition-colors hover:text-violet"
        >
          {isLogin ? "Solicite parceria" : "Acesse sua conta"}
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
            href="/login/jovem"
            className="inline-flex h-12 items-center justify-center rounded-[1.15rem] border border-paper-3 bg-paper px-4 text-[11px] font-black uppercase tracking-[0.22em] text-ink transition-colors hover:border-sky/20 hover:bg-sky-5 hover:text-sky-1"
          >
            Jovem talento
          </Link>
        </div>
      </div>
    </AuthPortalLayout>
  );
};

export default LoginUniversidade;
