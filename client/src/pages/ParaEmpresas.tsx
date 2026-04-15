import { ArrowRight, BrainCircuit, BriefcaseBusiness, FileStack, ShieldCheck, Sparkles, Target, Workflow } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SEO } from '@/components/SEO';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const companySignals = [
  {
    icon: BrainCircuit,
    title: 'Shortlist com fit score',
    description: 'A empresa enxerga por que cada talento e cada squad fazem sentido para aquele desafio.',
  },
  {
    icon: Workflow,
    title: 'Operacao em sprint',
    description: 'O desafio sai do slide e entra em kickoff, checkpoints e entrega observavel.',
  },
  {
    icon: ShieldCheck,
    title: 'Trilha de evidencia',
    description: 'RH, ESG e inovacao conseguem acompanhar resultado sem transformar a compra em consultoria pesada.',
  },
];

const buyingTracks = [
  {
    title: 'RH e early talent',
    description: 'Use squads para observar repertorio e execucao em trabalho real, indo alem do curriculo e da dinamica padrao.',
  },
  {
    title: 'ESG e sustentabilidade',
    description: 'Transforme metas, indicadores e frentes de impacto em projetos que avancam com ritmo, logica e entregaveis.',
  },
  {
    title: 'Inovacao e marca',
    description: 'Teste formatos, prototipos, pesquisas, comunicacao e experiencias com mais velocidade e diversidade de repertorio.',
  },
];

const offers = [
  {
    label: 'Pilot Project',
    title: 'Comece por um desafio prioritario.',
    description: 'Entrada indicada para validar aderencia, ritmo e ganho percebido antes de ampliar a operacao.',
    bullets: [
      '1 brief estrategico',
      'shortlist com justificativa de fit',
      'squad piloto e sprint enxuta',
      'relatorio executivo final',
    ],
  },
  {
    label: 'Managed Squad',
    title: 'Transforme a frente em operacao recorrente.',
    description: 'Modelo para equipes que ja querem repetir o fluxo, escalar squads e conectar multiple stakeholders.',
    bullets: [
      'squads recorrentes',
      'checkpoints e monitoramento',
      'camada para RH, ESG e inovacao',
      'mais previsibilidade operacional',
    ],
  },
];

const proofPoints = [
  {
    title: 'O que entra no brief',
    items: ['objetivo de negocio', 'ODS e contexto de impacto', 'prazo e budget', 'tipo de entrega esperada'],
  },
  {
    title: 'O que a IA devolve',
    items: ['fit score explicavel', 'shortlist priorizada', 'riscos de lacuna no squad', 'recomendacao de composicao'],
  },
  {
    title: 'O que sai da sprint',
    items: ['entregavel do desafio', 'log de checkpoints', 'sinais para hiring', 'relatorio executivo final'],
  },
];

const deliverables = [
  {
    title: 'Pesquisa e intelligence',
    description: 'Benchmark, mapeamento de dores, entrevistas, leitura setorial e framing de oportunidade para ESG, marca ou inovacao.',
  },
  {
    title: 'Produto e experiencia',
    description: 'Protótipos, jornadas, fluxos, MVPs conceituais e recomendacoes de experiencia ligadas ao desafio real.',
  },
  {
    title: 'Narrativa e ativacao',
    description: 'Storytelling, ativacao em campus, materiais de reputacao, employer branding e leituras para stakeholders.',
  },
];

const ParaEmpresas = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Para Empresas | Brasil Sustenta"
        description="Transforme desafios ESG em squads universitarios com matching por IA, curadoria e entrega auditavel."
      />
      <Header />

      <main className="pt-[72px]">
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-20">
            <div className="flex flex-col justify-center">
              <Badge variant="outline" className="mb-8 w-fit rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Para empresas // RH, ESG e inovacao
              </Badge>

              <h1 className="max-w-4xl font-display text-[3rem] font-bold leading-[0.92] tracking-tight sm:text-[4.4rem] lg:text-[5.6rem]">
                Transforme um desafio ESG em
                <span className="block italic font-light text-primary">squad, sprint e entrega</span>
              </h1>

              <p className="mt-8 max-w-2xl border-l-[3px] border-primary pl-5 text-base font-medium leading-8 text-foreground/78 sm:text-[1.05rem]">
                O Brasil Sustenta foi desenhado para empresas que nao querem comprar apenas awareness, nem abrir mais uma vaga generica.
                A plataforma recebe um desafio real, organiza o match por IA, monta o squad com curadoria e acompanha a execucao com mais clareza.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login/empresa"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'h-12 rounded-full px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground'
                  )}
                >
                  Publicar desafio
                </Link>
                <a
                  href="#ofertas"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'h-12 rounded-full border-border px-6 text-sm font-bold uppercase tracking-[0.14em]'
                  )}
                >
                  Ver modelos de oferta
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="rounded-full border border-border px-3 py-1.5">Brief unico</span>
                <span className="rounded-full border border-border px-3 py-1.5">Matching por IA</span>
                <span className="rounded-full border border-border px-3 py-1.5">Curadoria humana</span>
                <span className="rounded-full border border-border px-3 py-1.5">Relatorio final</span>
              </div>
            </div>

            <div className="grid gap-4">
              {companySignals.map((signal, index) => {
                const Icon = signal.icon;

                return (
                  <Card key={signal.title} className={cn('border-border bg-card shadow-sm', index === 0 && 'border-primary/30 bg-primary/5')}>
                    <CardHeader className="pb-4">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-secondary/30">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="font-display text-[1.6rem] tracking-tight">{signal.title}</CardTitle>
                      <CardDescription className="text-sm font-medium leading-7 text-muted-foreground">{signal.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Onde a compra entra</div>
              <h2 className="font-display text-[2.2rem] font-bold tracking-tight text-foreground lg:text-[3.2rem]">
                A mesma operacao pode nascer de budgets diferentes.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {buyingTracks.map((track) => (
                <Card key={track.title} className="rounded-[1.5rem] border-border bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-display text-[1.5rem] tracking-tight">{track.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[15px] font-medium leading-7 text-muted-foreground">{track.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Artefatos de produto</div>
              <h2 className="font-display text-[2.2rem] font-bold tracking-tight text-foreground lg:text-[3.2rem]">
                O comprador precisa enxergar como a operacao vira decisao.
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-muted-foreground">
                Esta camada ainda precisa aparecer mais no produto, mas ja e a espinha correta da oferta: brief claro, IA explicavel e entrega com evidencia.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {proofPoints.map((point, index) => (
                <Card key={point.title} className={cn('rounded-[1.5rem] border-border bg-card shadow-sm', index === 1 && 'border-primary/30 bg-primary/5')}>
                  <CardHeader>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-secondary/30">
                      {index === 0 && <Target className="h-5 w-5 text-primary" />}
                      {index === 1 && <BrainCircuit className="h-5 w-5 text-primary" />}
                      {index === 2 && <FileStack className="h-5 w-5 text-primary" />}
                    </div>
                    <CardTitle className="font-display text-[1.55rem] tracking-tight">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {point.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[14px] font-medium leading-6 text-foreground/80">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="ofertas" className="py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Modelos de oferta</div>
                <h2 className="font-display text-[2.2rem] font-bold tracking-tight text-foreground lg:text-[3.2rem]">
                  Menos menu confuso, mais produtos que um comprador entende.
                </h2>
              </div>
              <Link href="/para-universidades" className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
                Ver tambem a frente institucional <ArrowRight className="ml-2 inline h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {offers.map((offer, index) => (
                <Card
                  key={offer.label}
                  className={cn('rounded-[1.75rem] border-border bg-card shadow-sm', index === 0 && 'border-primary/30 bg-primary/5')}
                >
                  <CardHeader className="space-y-5">
                    <Badge variant={index === 0 ? 'default' : 'outline'} className="w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                      {offer.label}
                    </Badge>
                    <CardTitle className="font-display text-[1.8rem] leading-[1.15] tracking-tight">{offer.title}</CardTitle>
                    <CardDescription className="text-sm font-medium leading-7 text-muted-foreground">{offer.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {offer.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-[14px] font-medium leading-6 text-foreground/80">
                          <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 rounded-[1.75rem] border-border bg-foreground text-background shadow-sm">
              <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <BriefcaseBusiness className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Compra mais clara</span>
                  </div>
                  <p className="text-sm font-medium leading-7 text-background/75">
                    A categoria mais forte para a empresa nao e "job board ESG". E "plataforma AI-first que transforma um desafio em squad universitario com entrega operacional".
                  </p>
                </div>

                <Link
                  href="/login/empresa"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'h-12 rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/90'
                  )}
                >
                  Abrir conta da empresa
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t border-border py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Exemplos de entrega</div>
                <h2 className="font-display text-[2.2rem] font-bold tracking-tight text-foreground lg:text-[3.2rem]">
                  O squad nao e abstrato. Ele precisa sair em formato de entregavel.
                </h2>
              </div>
              <p className="text-[15px] font-medium leading-7 text-muted-foreground">
                O Brasil Sustenta fica mais forte quando a empresa enxerga o tipo de resultado que pode sair do processo, e nao apenas o discurso de talento ou impacto.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {deliverables.map((deliverable) => (
                <Card key={deliverable.title} className="rounded-[1.5rem] border-border bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-display text-[1.55rem] tracking-tight">{deliverable.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[15px] font-medium leading-7 text-muted-foreground">{deliverable.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ParaEmpresas;
