import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Compass,
  FileText,
  GraduationCap,
  Landmark,
  Layers,
  MapPin,
  School,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { editorialEase, editorialViewport } from "@/lib/motion";
import { hubs } from "@/lib/hubs";
import { cn } from "@/lib/utils";
import TerritoryMap from "@/components/TerritoryMap";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { ProofStrip, SectionHeader } from "@/components/ds";
import { NewsletterForm } from "@/components/LeadCaptureComponents";

const personas = [
  {
    label: "Para empresas",
    title: "Squad ESG\nem 6 semanas.",
    body: "O modelo: brief → shortlist com Fit Score → squad em sprint → relatório auditável. Os primeiros pilots estão nascendo.",
    href: "/para-empresas",
    persona: "empresa" as const,
    surface: "surface-leaf",
    cta: "Ser early adopter",
    icon: Building2,
  },
  {
    label: "Para jovens",
    title: "Match real.\nProjeto real.",
    body: "Você vai saber exatamente por que foi selecionado. Cada projeto vira prova no portfólio. Os primeiros matches estão sendo preparados.",
    href: "/para-jovens",
    persona: "jovem" as const,
    surface: "surface-sun",
    cta: "Entrar na base",
    icon: GraduationCap,
  },
  {
    label: "Para universidades",
    title: "Extensão com\nentregável real.",
    body: "Seu campus dentro do HUB local. Horas registradas, projetos com empresas, dados para o MEC. Modelo em construção.",
    href: "/para-universidades",
    persona: "ies" as const,
    surface: "surface-paper-2",
    cta: "Ativar campus",
    icon: School,
  },
  {
    label: "Para prefeituras",
    title: "Cidade ODS\noperacional.",
    body: "Programa municipal de juventude e ODS com relatório público de impacto. Formato em validação com Campinas.",
    href: "/para-prefeituras",
    persona: "prefeitura" as const,
    surface: "surface-atlantic",
    cta: "Conhecer programa",
    icon: Landmark,
  },
];

const protocol = [
  {
    step: "01",
    title: "Brief com contexto",
    body: "Buyer, meta, ODS, prazo e tipo de entrega ficam claros antes de qualquer match.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Shortlist explicável",
    body: "ODS Fit Score decompõe Skills, ODS e Contexto. Nada de caixa-preta.",
    icon: Target,
  },
  {
    step: "03",
    title: "Squad em sprint",
    body: "Curadoria humana, checkpoints visíveis, alinhamento contínuo.",
    icon: Layers,
  },
  {
    step: "04",
    title: "Relatório auditável",
    body: "Trilha de evidência por entrega. ESG vira artefato, não promessa.",
    icon: CheckCircle2,
  },
];

const products = [
  {
    tag: "Entrada rápida",
    title: "Pilot Project",
    ticket: "A partir de R$ 15k",
    body: "Primeiro sprint para validar buyer, desafio e densidade de entrega. Formato ideal para quem quer começar.",
    persona: "empresa" as const,
    href: "/para-empresas",
    cta: "Ser early adopter",
  },
  {
    tag: "Produto principal",
    title: "Managed Squad",
    ticket: "A partir de R$ 35k",
    body: "Squad estável em sprint contínuo. Mais previsibilidade, mais maturidade, mais entrega.",
    persona: "empresa" as const,
    href: "/para-empresas",
    cta: "Ver detalhes",
  },
  {
    tag: "Camada IES",
    title: "University Partner",
    ticket: "Modelo em validação",
    body: "Extensão, horas e empregabilidade convertidas em parceria institucional. Primeiras conversas em andamento.",
    persona: "ies" as const,
    href: "/para-universidades",
    cta: "Conhecer modelo",
  },
  {
    tag: "Território",
    title: "Programa Municipal ODS",
    ticket: "Formato em construção",
    body: "Cidade como infraestrutura. Engajamento de juventude com Agenda 2030. Campinas é o laboratório.",
    persona: "prefeitura" as const,
    href: "/para-prefeituras",
    cta: "Conhecer programa",
  },
];

const principles = [
  {
    title: "ESG não é selo. É operação.",
    body: "A Agenda 2030 não vira manifesto. Vira brief, sprint, evidência e relatório.",
  },
  {
    title: "IA é artefato visível, não promessa.",
    body: "ODS Fit Score decomposto em Skills + ODS + Contexto. Você vê por que o match faz sentido.",
  },
  {
    title: "Território é infraestrutura.",
    body: "HUBs locais conectam universidades, empresas e prefeituras na mesma cidade.",
  },
  {
    title: "Universidade é capital intelectual.",
    body: "Squads universitários competem com consultorias em entrega — e em custo.",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const mapQuery = trpc.territory.public.listMapNodes.useQuery(undefined, {
    staleTime: 60_000,
  });
  const partnersQuery = trpc.university.public.listPartners.useQuery(undefined, {
    staleTime: 5 * 60_000,
  });
  const partnerCount = partnersQuery.data?.length ?? 0;
  const heroProofItems = [
    {
      value: partnerCount > 0 ? String(partnerCount).padStart(2, "0") : "Campinas",
      label: partnerCount > 0 ? "Universidades parceiras ativas" : "Território-piloto em abertura",
      note:
        partnerCount > 0
          ? "Rede viva já conectada ao shell público."
          : "Primeiro laboratório operacional da rede.",
      tone: "leaf" as const,
    },
    {
      value: "4 etapas",
      label: "Protocolo explicável",
      note: "Brief, shortlist, sprint e evidência auditável.",
      tone: "default" as const,
    },
    {
      value: "18 ODS",
      label: "Taxonomia base",
      note: "Classificação de impacto orientando match e entrega.",
      tone: "sun" as const,
    },
    {
      value: "2026",
      label: "Ano zero com transparência",
      note: "Sem inflar maturidade nem prometer escala pronta.",
      tone: "atlantic" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
      <SEO
        title="Brasil Sustenta — A infraestrutura de impacto que o Brasil está construindo"
        description="Estamos unindo universidade, empresa, prefeitura e juventude criativa em uma única operação ESG — com IA, território e entrega real. Campinas é o primeiro laboratório."
      />
      <Header />

      <main className="pt-[4.75rem]">
        {/* HERO ============================================== */}
        {/* HERO BRUTALISTA ============================================== */}
        <section className="border-b border-[color:var(--color-ink)] md:border-b-0">
          <div className="grid grid-cols-1 md:grid-cols-12 md:divide-x divide-[color:var(--color-ink)] border-b border-[color:var(--color-ink)]">
            
            {/* CELL 1: MAIN TEXT */}
            <div className="md:col-span-7 lg:col-span-8 p-6 sm:p-10 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center relative">
              <div className="flex items-center gap-3 mb-10">
                <span className="size-2 bg-[color:var(--color-ink)]" />
                <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-[color:var(--color-ink-4)]">
                  Edição 01 · BR/SP · {new Date().getFullYear()}
                </span>
              </div>
              
              <h1 className="font-display text-[9vw] md:text-[5vw] lg:text-[4.5rem] leading-[0.95] font-black lowercase tracking-tighter text-[color:var(--color-ink)] max-w-[16ch] text-balance">
                Seu desafio ESG vira <span className="text-[color:var(--color-leaf)] italic">squad, sprint</span> e relatório.
              </h1>
              
              <p className="mt-8 font-mono text-sm md:text-base max-w-xl text-[color:var(--color-ink-3)] leading-relaxed border-l-2 border-[color:var(--color-ink)] pl-4">
                Transformamos desafios corporativos em operação real conectando empresas, juventude e universidades na mesma cidade.
              </p>
              
              <div className="mt-14 flex flex-col sm:flex-row gap-0">
                <Button asChild size="xl" className="rounded-none border-2 border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-white hover:bg-white hover:text-[color:var(--color-ink)] transition-colors px-10 py-8 text-[0.8rem] uppercase tracking-[0.2em] font-mono font-bold group">
                  <Link href="/auth/empresa">
                    Construir junto
                    <ArrowRight className="ml-3 size-5 transition-transform group-hover:translate-x-2" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="rounded-none border-2 border-t-0 sm:border-t-2 border-[color:var(--color-ink)] sm:border-l-0 bg-transparent text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-white transition-colors px-10 py-8 text-[0.8rem] uppercase tracking-[0.2em] font-mono font-bold">
                  <Link href="/para-jovens">
                    Entrar na base
                    <ArrowUpRight className="ml-3 size-5" />
                  </Link>
                </Button>
              </div>

              <div className="hidden lg:flex absolute bottom-0 left-0 right-0 border-t border-[color:var(--color-ink)] p-4 items-center gap-3 text-xs uppercase tracking-widest font-mono font-bold bg-[color:var(--color-paper-2)]">
                <ArrowDown className="size-4" />
                <span>Fact Sheet Institucional</span>
              </div>
            </div>

            {/* CELLS COLUMN (RIGHT) */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col divide-y divide-[color:var(--color-ink)] border-t border-[color:var(--color-ink)] md:border-t-0">
              
              {/* CELL 2: FOTOGRAFIA EDITORIAL */}
              <div className="relative aspect-square md:aspect-auto md:flex-1 w-full bg-[color:var(--color-ink)]/5 overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Vista aérea de Campinas - Infraestrutura" 
                  width={2070}
                  height={1380}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-[1.1] mix-blend-multiply transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[color:var(--color-paper)]/90 backdrop-blur px-3 py-1.5 border border-[color:var(--color-ink)] font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">
                  Lab_01 / Campinas
                </div>
              </div>

              {/* CELL 3: FACT SHEET / BLUEPRINT */}
              <div className="p-6 md:p-8 bg-[color:var(--color-paper-2)] flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">Atuação Transversal</h3>
                   <span className="flex items-center gap-2 font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-[color:var(--color-leaf)] border border-[color:var(--color-leaf)] px-2 py-1">
                     <span className="size-1.5 rounded-full bg-[color:var(--color-leaf)] animate-pulse" />
                     Agenda 2030
                   </span>
                </div>
                
                {/* Benefícios */}
                <ul className="mb-8 space-y-4 font-mono text-xs sm:text-sm text-[color:var(--color-ink-2)]">
                  <li className="flex gap-3"><span className="text-[color:var(--color-ink)]">↳</span> Projetos Reais para estudantes (Horas Extensão)</li>
                  <li className="flex gap-3"><span className="text-[color:var(--color-ink)]">↳</span> Matching 100% Curado via Fit Score / Perfil</li>
                  <li className="flex gap-3"><span className="text-[color:var(--color-ink)]">↳</span> Relatório Auditável de Impacto ESG Executado</li>
                </ul>

                {/* ODS Grid Icons */}
                <div className="mt-auto pt-6 border-t border-[color:var(--color-ink)]">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-4">ODS Estruturais</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { num: "04", bg: "#C5192D" },
                      { num: "05", bg: "#FF3A21" },
                      { num: "08", bg: "#A21942" },
                      { num: "09", bg: "#FD6925" },
                      { num: "10", bg: "#DD1367" },
                      { num: "11", bg: "#FD9D24" },
                      { num: "12", bg: "#BF8B2E" },
                      { num: "16", bg: "#00689D" },
                    ].map((ods) => (
                      <div key={ods.num} className="size-8 flex shrink-0 flex-col items-center justify-center font-display font-black text-[0.75rem] text-white overflow-hidden shadow-sm hover:-translate-y-1 transition-transform" style={{ backgroundColor: ods.bg }}>
                        <span>{ods.num}</span>
                      </div>
                    ))}
                    <div className="size-8 flex shrink-0 items-center justify-center font-display font-black text-[0.55rem] text-white bg-[#19486A] overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">17</div>
                    <div className="size-8 flex shrink-0 items-center justify-center font-display font-black text-[0.55rem] text-white bg-black overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">18</div>
                  </div>
                </div>
                
              </div>

            </div>
          </div>
          
          <div className="border-b border-[color:var(--color-ink)] bg-[color:var(--color-paper-2)] py-6 md:py-8">
            <div className="container-editorial">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                    Sinais de Confiança
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                    Prova institucional antes de efeito visual: estado real da rede, protocolo legível e ponto de partida territorial explícito.
                  </p>
                </div>
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)] md:text-right">
                  {partnerCount > 0
                    ? `${partnerCount} universidade${partnerCount > 1 ? "s" : ""} parceira${partnerCount > 1 ? "s" : ""} ativa${partnerCount > 1 ? "s" : ""}`
                    : "Rede em abertura a partir de Campinas"}
                </p>
              </div>

              <ProofStrip
                items={heroProofItems}
                ariaLabel="Sinais institucionais de confiança"
                className="mt-6 bg-[color:var(--color-paper)]"
              />
            </div>
          </div>
        </section>

        {/* 4-STEP PROCESS / A OPERAÇÃO ========================================== */}
        <section className="border-b border-[color:var(--color-ink)] bg-[color:var(--color-paper)]">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 md:divide-x divide-y md:divide-y-0 divide-[color:var(--color-ink)]">
            
            {[
              { num: "01", title: "O Desafio", desc: "Empresa envia um brief de projeto com buyer, ODS prioritários, prazo e tipo de entrega." },
              { num: "02", title: "O Match", desc: "Curadoria cruza perfis, ODS e skills para montar shortlist com Fit Score explicado." },
              { num: "03", title: "A Tração", desc: "A equipe trabalha em estrutura de sprints focadas com alinhamento contínuo." },
              { num: "04", title: "A Evidência", desc: "Todo o desenvolvimento vira um relatório auditável (empresa) e portfólio prático (talento)." },
            ].map((step) => (
              <div key={step.num} className="p-8 lg:p-12 relative group bg-[color:var(--color-paper-2)] hover:bg-[color:var(--color-ink)] transition-colors duration-300">
                <span className="font-display text-5xl font-black text-[color:var(--color-ink)] opacity-10 group-hover:opacity-100 group-hover:text-white transition-colors absolute top-6 right-6">
                  {step.num}
                </span>
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)] group-hover:text-white mb-6 relative z-10 transition-colors">
                  {step.title}
                </h3>
                <p className="font-mono text-sm text-[color:var(--color-ink-3)] group-hover:text-[color:var(--color-paper-2)] relative z-10 leading-relaxed transition-colors">
                  {step.desc}
                </p>
              </div>
            ))}
            
          </div>
        </section>

        {/* PERSONAS ========================================== */}
        <section className="container-editorial section-y">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
            <SectionHeader
              eyebrow="Acesso Restrito"
              title="Para quem estamos construindo?"
              titleClassName="lowercase text-4xl md:text-5xl"
              showRule
            />
            <p className="font-mono text-sm text-[color:var(--color-ink-3)] max-w-md md:text-right border-l md:border-l-0 md:border-r border-[color:var(--color-ink)] pl-4 md:pl-0 md:pr-4">
              Cada parceiro acessa a base pelo funil correto — garantindo evidências para empresas, horas de extensão para IES e impacto na ponta.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
            {personas.map((p, i) => (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={editorialViewport}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: editorialEase,
                }}
              >
                <PersonaCard {...p} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* MANIFESTO BAND =================================== */}
        <section className="surface-ink section-y border-y border-white/10">
          <div className="container-editorial">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <span className="text-eyebrow text-white/50">
                  Tese central
                </span>
                <p className="mt-7 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.025em] text-white">
                  ESG escalou como{" "}
                  <span className="line-through decoration-[color:var(--color-leaf-bright)] decoration-2">
                    relatório
                  </span>
                  . O Brasil Sustenta escala ESG como{" "}
                  <span className="text-[color:var(--color-leaf-bright)]">
                    operação
                  </span>{" "}
                  — com squad universitário, território e evidência por
                  entrega.
                </p>
                <Button asChild variant="link" className="mt-8 text-white">
                  <Link href="/quem-somos/manifesto">
                    Ler manifesto completo
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>

              <div className="lg:col-span-5">
                <ul className="grid gap-4">
                  {principles.map((p, i) => (
                    <motion.li
                      key={p.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={editorialViewport}
                      transition={{
                        duration: 0.45,
                        delay: i * 0.06,
                        ease: editorialEase,
                      }}
                      className="border-b border-white/12 pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="font-display text-lg font-semibold text-white">
                        {p.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">
                        {p.body}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROTOCOLO ========================================= */}
        <section className="container-editorial section-y">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
            <SectionHeader
              eyebrow="Protocolo"
              title="Quatro etapas. Zero clima de consultoria genérica."
              tone="bright"
              showRule
              className="md:col-span-7"
            />
            <p className="text-body md:col-span-5">
              O valor do protocolo aparece quando a sequência fica legível —
              do brief até a evidência. Cada etapa tem artefato. Cada artefato
              tem auditor.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
            {protocol.map(({ step, title, body, icon: Icon }) => (
              <li
                key={step}
                className="bg-white p-6 transition hover:bg-[color:var(--color-paper-2)] md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-leaf)]">
                    Etapa {step}
                  </span>
                  <Icon className="size-5 text-[color:var(--color-ink-4)]" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold leading-tight tracking-[-0.025em]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* MÉTRICAS NUMÉRICAS ================================ */}
        <section className="surface-paper-2 section-y border-y border-[color:var(--color-border)]">
          <div className="container-editorial">
            <div className="grid gap-10 md:grid-cols-12 md:gap-12 md:items-end">
              <SectionHeader
                eyebrow="Onde estamos"
                title="Transparência desde o dia zero."
                showRule
                className="md:col-span-6"
              />
              <p className="text-body md:col-span-6">
                Não inflamos números. Mostramos exatamente onde estamos —
                e convidamos quem quer construir junto desde o início.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "01", label: "HUB em abertura · Campinas" },
                { value: "02", label: "Universidades em diálogo" },
                { value: "17", label: "ODS como taxonomia base" },
                { value: "2026", label: "Ano de fundação" },
              ].map(stat => (
                <div key={stat.label} className="bg-white p-7 md:p-9">
                  <p className="text-numeric text-[color:var(--color-leaf)]">
                    {stat.value}
                  </p>
                  <p className="mt-4 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUTOS ========================================= */}
        <section className="container-editorial section-y">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
            <SectionHeader
              eyebrow="Formatos em construção"
              title="Quatro formatos. Um para cada buyer."
              tone="bright"
              showRule
              className="md:col-span-7"
            />
            <p className="text-body md:col-span-5">
              Do pilot para validação ao programa municipal de longo prazo.
              Os primeiros formatos estão sendo testados com early adopters.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {products.map(p => (
              <ProductCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        {/* HUBs MAPA ========================================= */}
        <section className="surface-paper-2 section-y border-y border-[color:var(--color-border)]">
          <div className="container-editorial">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <SectionHeader
                  eyebrow="Território"
                  title="HUBs como base local."
                  subtitle="A rede cresce por polos regionais que conectam campus, organizações e articulação local. Território não entra como pano de fundo — entra como infraestrutura."
                  tone="bright"
                  showRule
                />

                <div className="mt-8 flex flex-wrap gap-2">
                  <Badge variant="leaf">
                    <span className="size-1.5 rounded-full bg-[color:var(--color-leaf)] animate-pulse-soft" />
                    1 HUB ativo
                  </Badge>
                  <Badge variant="sun">2 em planejamento</Badge>
                  <Badge variant="secondary">2 em expansão</Badge>
                </div>

                <Button asChild variant="default" className="mt-9">
                  <Link href="/quem-somos/hubs">
                    Ver mapa completo
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center min-h-[400px]">
                <TerritoryMap
                  data={mapQuery.data}
                  isLoading={mapQuery.isLoading}
                  selectedSlug={null}
                  onSelectSlug={(slug) => setLocation("/quem-somos/hubs")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* COMO É O ODS FIT SCORE ============================ */}
        <section className="container-editorial section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="IA visível"
                title="ODS Fit Score: o match que se explica."
                subtitle="Cada candidato traz um score decomposto em três dimensões. Sem caixa-preta, sem promessa de magia. Apenas explicação em linguagem natural."
                tone="bright"
                showRule
              />

              <ul className="mt-9 grid gap-4">
                {[
                  {
                    title: "Skills Fit",
                    body: "Competências técnicas e blandas vs. requisitos do brief.",
                    color: "var(--color-leaf)",
                  },
                  {
                    title: "ODS Fit",
                    body: "Alinhamento entre o portfólio do talento e os ODS do projeto.",
                    color: "var(--color-sun-deep)",
                  },
                  {
                    title: "Context Fit",
                    body: "Cidade do HUB, semestre acadêmico, disponibilidade real.",
                    color: "var(--color-atlantic)",
                  },
                ].map(item => (
                  <li
                    key={item.title}
                    className="flex gap-4 border-l-2 pl-5"
                    style={{ borderColor: item.color }}
                  >
                    <div>
                      <p className="font-display text-lg font-semibold">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--color-ink-3)]">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <FitScoreMockup />
            </div>
          </div>
        </section>

        {/* CTA FINAL ======================================== */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-leaf relative overflow-hidden rounded-3xl">
            <div className="relative grid gap-8 p-10 md:grid-cols-12 md:items-center md:gap-12 md:p-14 lg:p-16">
              <div className="md:col-span-6">
                <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Acesso Restrito
                </span>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
                  Infraestrutura 
                  <br />em Early Access.
                </h2>
                <p className="font-mono text-sm mt-6 text-white/80 leading-relaxed max-w-sm">
                  Não estamos abertos ao público. As allocations ocorrem por território conforme a capacidade dos campus. Garanta sua prioridade na fila de ODS Fit Score.
                </p>
              </div>
              <div className="md:col-span-6 flex flex-col items-start md:items-end w-full">
                <NewsletterForm
                  variant="dark"
                  label="E-mail para early access institucional"
                  inputName="early_access_email"
                  successMessage="Recebemos seu interesse. A priorização acontece por território, capacidade de campus e maturidade do buyer."
                  source="home:early-access"
                  className="w-full max-w-md bg-white/5 border-white/20 p-6 md:p-8 rounded-xl"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 opacity-10">
              <Compass className="size-full text-white" strokeWidth={1} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ====================================================================
 * SUB-COMPONENTS
 * ==================================================================*/


function PersonaCard({
  label,
  title,
  body,
  href,
  surface,
  cta,
  icon: Icon,
}: {
  label: string;
  title: string;
  body: string;
  href: string;
  persona: string;
  surface: string;
  cta: string;
  icon: typeof Building2;
}) {
  const isDark = surface === "surface-leaf" || surface === "surface-atlantic";
  return (
    <Link
      href={href}
      className={cn(
        surface,
        "group relative flex h-full min-h-[18rem] flex-col justify-between rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1 md:min-h-[20rem] md:p-9"
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em]",
              isDark ? "text-white/60" : "opacity-60"
            )}
          >
            {label}
          </span>
          <Icon className="size-5 opacity-70" />
        </div>
        <h3 className="mt-8 whitespace-pre-line font-display text-[2rem] font-bold leading-[0.95] tracking-[-0.035em] sm:text-[2.25rem]">
          {title}
        </h3>
        <p
          className={cn(
            "mt-5 max-w-sm text-sm leading-relaxed",
            isDark ? "text-white/80" : "opacity-80"
          )}
        >
          {body}
        </p>
      </div>
      <div className="mt-10 inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
        {cta}
        <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}

function ProductCard({
  tag,
  title,
  ticket,
  body,
  href,
  cta,
}: {
  tag: string;
  title: string;
  ticket: string;
  body: string;
  persona: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="flex flex-col gap-6 rounded-2xl border border-[color:var(--color-border)] bg-white p-7 transition hover:border-[rgba(10,10,10,0.32)] md:flex-row md:items-start md:gap-8 md:p-9">
      <div className="md:flex-1">
        <span className="text-eyebrow">{tag}</span>
        <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.025em]">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-3)]">
          {body}
        </p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-ink)] underline underline-offset-4 decoration-[color:var(--color-leaf)] decoration-2 hover:decoration-[color:var(--color-ink)] transition-colors"
        >
          {cta}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
      <div className="md:w-44 md:shrink-0 md:text-right">
        <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
          Ticket médio
        </p>
        <p className="mt-2 font-display text-xl font-bold leading-tight">
          {ticket}
        </p>
      </div>
    </article>
  );
}

function FitScoreMockup() {
  return (
    <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-7 md:p-9">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow">ODS Fit Score</span>
        <Sparkles className="size-4 text-[color:var(--color-leaf)]" />
      </div>

      <div className="mt-7 flex items-baseline gap-3">
        <p className="font-mono text-[5rem] font-bold leading-none tracking-[-0.04em] text-[color:var(--color-leaf)]">
          87
        </p>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-[color:var(--color-ink-4)]">
          / 100 · alto fit
        </p>
      </div>

      <div className="mt-9 space-y-5">
        {[
          { label: "Skills Fit", value: 72, color: "var(--color-leaf)" },
          { label: "ODS Fit", value: 91, color: "var(--color-sun-deep)" },
          { label: "Context Fit", value: 89, color: "var(--color-atlantic)" },
        ].map(b => (
          <div key={b.label}>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-3)]">
                {b.label}
              </span>
              <span className="font-mono text-sm font-semibold text-[color:var(--color-ink)]">
                {b.value}
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-[color:var(--color-paper-3)]">
              <div
                className="h-full rounded-full"
                style={{ width: `${b.value}%`, background: b.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-9 border-t border-[color:var(--color-border)] pt-6 text-sm leading-relaxed text-[color:var(--color-ink-3)]">
        <span className="font-display font-semibold text-[color:var(--color-ink)]">
          Marina tem fit alto com ODS 12 e ODS 13
        </span>{" "}
        por 3 projetos de extensão em monitoramento ambiental e disponibilidade
        no HUB Campinas.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {[7, 12, 13, 15].map(n => (
          <span
            key={n}
            className="inline-grid size-9 place-items-center rounded-full bg-[color:var(--color-paper)] font-mono text-xs font-bold text-[color:var(--color-ink)] border border-[color:var(--color-border)]"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
