import {
  ArrowRight,
  BrainCircuit,
  FileBadge2,
  GraduationCap,
  Layers3,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { editorialViewport, fadeUpTarget } from "@/lib/motion";
import { cn } from "@/lib/utils";

const signals = [
  {
    icon: BrainCircuit,
    title: "Oportunidades filtradas por IA",
    description:
      "Seu perfil cruza skills, portfolio, disponibilidade e aderencia com ODS e tipo de desafio.",
  },
  {
    icon: Layers3,
    title: "Experiencia em squad",
    description:
      "Voce entra em times multidisciplinares, aprende a operar em sprint e entrega com contexto real.",
  },
  {
    icon: FileBadge2,
    title: "Portfolio observavel",
    description:
      "Cada desafio gera repertorio, entregavel e historico de participacao mais util do que candidatura generica.",
  },
];

const journey = [
  {
    title: "Monte um perfil forte",
    description:
      "Repertorio academico, projetos autorais, disponibilidade e causas de afinidade fazem diferenca.",
  },
  {
    title: "Receba match com contexto",
    description:
      "A plataforma nao mostra so a vaga. Ela indica por que aquele desafio combina com voce.",
  },
  {
    title: "Entre em projeto real",
    description:
      "Voce participa de uma experiencia conectada a empresa, universidade e entregas concretas.",
  },
];

const matchSignals = [
  {
    title: "O que a plataforma observa",
    description:
      "Skills, portfolio, disponibilidade, afinidade com ODS e tipo de desafio compoem o seu match score.",
  },
  {
    title: "O que a candidatura ganha",
    description:
      "Mais contexto sobre empresa, buyer, desafio e expectativa de entrega antes de voce decidir aplicar.",
  },
  {
    title: "O que vira portfolio",
    description:
      "Participacao em squad, checkpoints, entregavel final e historico de contribuicao tornam seu perfil mais observavel.",
  },
];

const challengeExamples = [
  {
    title: "Pesquisa e mapeamento",
    description:
      "Leituras de mercado, benchmark, levantamento de dores e estruturacao de hipoteses ligadas a ESG e impacto.",
  },
  {
    title: "Produto e experiencia",
    description:
      "Fluxos, prototipos, service design, design de interface e validacao de propostas para desafios concretos.",
  },
  {
    title: "Conteudo e reputacao",
    description:
      "Narrativas, ativacoes, employer branding, comunicacao e materiais para stakeholders e comunidades.",
  },
];

const ParaJovens = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Para Jovens | Brasil Sustenta"
        description="Entre em squads universitarios para desafios ESG reais, construa portfolio e desenvolva sua empregabilidade com matching por IA."
      />
      <Header />

      <main className="pt-[72px]">
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={fadeUpTarget()}
              viewport={editorialViewport}
              className="flex flex-col justify-center"
            >
              <Badge
                variant="outline"
                className="mb-8 w-fit rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary"
              >
                Para jovens // portfolio, impacto e empregabilidade
              </Badge>

              <h1 className="max-w-4xl font-display text-[3rem] font-bold leading-[0.92] tracking-tight sm:text-[4.4rem] lg:text-[5.6rem]">
                Entre em
                <span className="block italic font-light text-primary">
                  projetos reais
                </span>
                nao em processos genericos.
              </h1>

              <p className="mt-8 max-w-2xl border-l-[3px] border-primary pl-5 text-base font-medium leading-8 text-foreground/78 sm:text-[1.05rem]">
                O Brasil Sustenta conecta universitarios e recem-formados a
                desafios ESG de empresas. A ideia nao e so conseguir acesso, mas
                construir repertorio, portfolio e leitura de negocio enquanto
                voce aprende em trabalho real.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login/jovem"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 rounded-full px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground"
                  )}
                >
                  Criar perfil
                </Link>
                <Link
                  href="/oportunidades"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 rounded-full border-border px-6 text-sm font-bold uppercase tracking-[0.14em]"
                  )}
                >
                  Ver oportunidades
                </Link>
              </div>
            </motion.div>

            <div className="grid gap-4">
              {signals.map((signal, index) => {
                const Icon = signal.icon;

                return (
                  <motion.div
                    key={signal.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={editorialViewport}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                  >
                    <Card className="border-border bg-card shadow-sm hover:shadow-[0_24px_40px_rgba(5,5,5,0.05)]">
                      <CardHeader className="pb-4">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-secondary/30">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="font-display text-[1.6rem] tracking-tight">
                          {signal.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium leading-7 text-muted-foreground">
                          {signal.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                Como entrar forte
              </div>
              <h2 className="font-display text-[2.2rem] font-bold tracking-tight text-foreground lg:text-[3.2rem]">
                A melhor candidatura aqui parece mais com repertorio do que com
                formulario.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {journey.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={fadeUpTarget(index * 0.08, 24)}
                  viewport={editorialViewport}
                >
                  <Card
                    className={cn(
                      "rounded-[1.5rem] border-border bg-card shadow-sm hover:shadow-[0_24px_40px_rgba(5,5,5,0.05)]",
                      index === 1 && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <CardHeader>
                      <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                        0{index + 1}
                      </div>
                      <CardTitle className="font-display text-[1.6rem] tracking-tight">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[15px] font-medium leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                Como o match fica mais forte
              </div>
              <h2 className="font-display text-[2.2rem] font-bold tracking-tight text-foreground lg:text-[3.2rem]">
                A plataforma precisa explicar por que voce combina com o
                desafio.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {matchSignals.map((signal, index) => (
                <motion.div
                  key={signal.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={fadeUpTarget(index * 0.08, 24)}
                  viewport={editorialViewport}
                >
                  <Card
                    className={cn(
                      "rounded-[1.5rem] border-border bg-card shadow-sm hover:shadow-[0_24px_40px_rgba(5,5,5,0.05)]",
                      index === 1 && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <CardHeader>
                      <CardTitle className="font-display text-[1.55rem] tracking-tight">
                        {signal.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[15px] font-medium leading-7 text-muted-foreground">
                        {signal.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <Card className="rounded-[1.75rem] border-border bg-foreground text-background shadow-sm">
              <CardContent className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-primary">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                      Leitura strategica para talentos
                    </span>
                  </div>
                  <h2 className="font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-white lg:text-[3rem]">
                    Seu diferencial nao e falar de proposito.
                    <span className="block italic font-light text-primary">
                      E conseguir provar entrega.
                    </span>
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-background/75">
                    O melhor uso da plataforma para voce e construir portfolio
                    observavel, ganhar contexto corporativo e entrar em
                    experiencias que tornam seu perfil mais claro para o
                    mercado.
                  </p>
                </div>

                <div className="grid gap-4">
                  <Card className="border-border/20 bg-background/5 shadow-none">
                    <CardContent className="p-5">
                      <div className="mb-2 flex items-center gap-2 text-primary">
                        <Lightbulb className="h-4 w-4" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
                          Mais contexto
                        </span>
                      </div>
                      <p className="text-sm font-medium leading-7 text-background/75">
                        Voce entende o desafio, o buyer e o tipo de entrega
                        antes de entrar.
                      </p>
                    </CardContent>
                  </Card>

                  <Link
                    href="/login/jovem"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-12 rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    Entrar como talento
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t border-border py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Tipos de desafio
                </div>
                <h2 className="font-display text-[2.2rem] font-bold tracking-tight text-foreground lg:text-[3.2rem]">
                  Oportunidade boa tem forma. Nao e so um card bonito.
                </h2>
              </div>
              <p className="text-[15px] font-medium leading-7 text-muted-foreground">
                A landing precisa mostrar melhor o tipo de desafio que aparece
                na rede. Esta e a referencia de densidade que devemos perseguir
                no produto e no marketing.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {challengeExamples.map((example, index) => (
                <motion.div
                  key={example.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={fadeUpTarget(index * 0.08, 24)}
                  viewport={editorialViewport}
                >
                  <Card className="rounded-[1.5rem] border-border bg-card shadow-sm hover:shadow-[0_24px_40px_rgba(5,5,5,0.05)]">
                    <CardHeader>
                      <CardTitle className="font-display text-[1.55rem] tracking-tight">
                        {example.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[15px] font-medium leading-7 text-muted-foreground">
                        {example.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ParaJovens;
