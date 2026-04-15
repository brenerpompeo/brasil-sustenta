import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Bot,
  Building2,
  GraduationCap,
  School,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";

const portals = [
  {
    href: "/login/jovem",
    title: "Portal do Talento",
    eyebrow: "Universitarios",
    icon: GraduationCap,
    accent: "text-sky border-sky/30 bg-sky/10",
    description:
      "Receba match inteligente com desafios reais, construa portfolio de impacto e acompanhe sua trilha de crescimento.",
    bullets: [
      "Oportunidades filtradas por IA",
      "Candidaturas e squads em um so lugar",
      "Experiencia mobile-first para rotina academica",
    ],
  },
  {
    href: "/login/empresa",
    title: "Portal Corporativo",
    eyebrow: "Empresas",
    icon: Building2,
    accent: "text-primary border-primary/30 bg-primary/10",
    description:
      "Publique projetos, monte squads com rapidez e transforme metas ESG em operacao monitoravel.",
    bullets: [
      "Gestao de projetos e aprovacoes",
      "Talentos ranqueados por aderencia",
      "Escalabilidade pronta para novos squads",
    ],
  },
  {
    href: "/login/universidade",
    title: "Portal Academico",
    eyebrow: "Instituicoes",
    icon: School,
    accent: "text-violet-2 border-violet/30 bg-violet/10",
    description:
      "Acompanhe extensao, parcerias e indicadores com uma experiencia clara para coordenacao e reitoria.",
    bullets: [
      "Convenios e relatorios em contexto",
      "Visibilidade de alunos engajados",
      "Base pronta para auditoria e impacto",
    ],
  },
];

export default function LoginHub() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Entrar | Brasil Sustenta"
        description="Escolha o portal certo para talentos, empresas e universidades dentro da experiencia Brasil Sustenta."
      />
      <Header />

      <main className="pt-28">
        <section className="container py-8 sm:py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-primary"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Startup UX Operating System
              </Badge>

              <div className="space-y-4">
                <h1 className="max-w-4xl text-5xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  Entre no portal certo para acelerar impacto, operacao e escala.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Organizamos a jornada por persona para melhorar foco, acessibilidade,
                  legibilidade e velocidade de execucao desde o primeiro clique.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-border bg-card p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Bot className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">IA-first</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Matchmaking e triagem com experiencia orientada por contexto.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Acessivel</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Navegacao mais clara, foco visivel e hierarquia de leitura melhor resolvida.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Escalavel</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Entrada consistente para novos fluxos, jornadas e produtos da startup.
                  </p>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden rounded-[2rem] border-border bg-foreground text-background shadow-2xl">
              <CardHeader className="gap-4 border-b border-white/10">
                <Badge
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-white/80"
                >
                  Operating Brief
                </Badge>
                <CardTitle className="font-display text-3xl font-black tracking-tight text-white">
                  Um unico ecossistema, tres portas de entrada bem definidas.
                </CardTitle>
                <CardDescription className="text-base leading-7 text-white/65">
                  Esse hub reduz atrito na descoberta, elimina rotas quebradas e prepara
                  a plataforma para experiencias mais especializadas sem poluir a home.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {[
                  "Arquitetura de navegacao mais previsivel",
                  "Melhor clareza para conversao por persona",
                  "Base pronta para onboarding e experimentacao futura",
                ].map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-primary" />
                    <p className="text-sm leading-7 text-white/75">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-3">
            {portals.map(portal => {
              const Icon = portal.icon;

              return (
                <Card
                  key={portal.href}
                  className="rounded-[2rem] border-border bg-card/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardHeader className="gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em]",
                          portal.accent
                        )}
                      >
                        {portal.eyebrow}
                      </Badge>
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl border",
                          portal.accent
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <CardTitle className="font-display text-3xl font-black tracking-tight text-foreground">
                        {portal.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-7 text-muted-foreground">
                        {portal.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {portal.bullets.map(bullet => (
                      <div
                        key={bullet}
                        className="rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground"
                      >
                        {bullet}
                      </div>
                    ))}
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Link
                      href={portal.href}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "w-full rounded-full text-[12px] font-black uppercase tracking-[0.22em]"
                      )}
                    >
                      Entrar no portal
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
