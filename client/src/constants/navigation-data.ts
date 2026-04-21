export type NavAccent =
  | "paper"
  | "green"
  | "yellow"
  | "blue"
  | "clay"
  | "ink";

export type NavIconKey =
  | "BarChart3"
  | "BookOpen"
  | "Briefcase"
  | "Building2"
  | "Compass"
  | "FileCheck2"
  | "FileText"
  | "Globe2"
  | "GraduationCap"
  | "Landmark"
  | "LayoutDashboard"
  | "MapPin"
  | "Network"
  | "Rocket"
  | "School"
  | "ShieldCheck"
  | "Sparkles"
  | "Target"
  | "Users2";

export type NavPanelTile = {
  label: string;
  href: string;
  description: string;
  iconKey: NavIconKey;
  colSpan: number;
  rowSpan?: number;
  featureTag?: string;
  accent?: NavAccent;
  invert?: boolean;
};

export type NavPanel = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  gridCols: number;
  tiles: NavPanelTile[];
};

export type NavSection = {
  id: string;
  label: string;
  accent: NavAccent;
  hasPanel: boolean;
  href?: string;
  panel?: NavPanel;
  hideInHeader?: boolean;
  backgroundImage?: string;
};

export type NavSupportLink = {
  label: string;
  href: string;
  description: string;
  iconKey: NavIconKey;
};

export const NAV: NavSection[] = [
  {
    id: "manifesto",
    label: "Manifesto",
    accent: "paper",
    hasPanel: true,
    href: "/quem-somos/manifesto",
    backgroundImage: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=2000&auto=format&fit=crop",

    panel: {
      eyebrow: "SYSTEM_STATUS: ONLINE // ODS_HUB_VER_1.4",
      title: "A nova ordem do impacto.",
      description:
        "Infraestrutura editorial para conectar empresas, juventude, IES e cidades em uma operação legível de brief, curadoria, sprint e evidência.",
      ctaLabel: "Ler manifesto",
      ctaHref: "/quem-somos/manifesto",
      gridCols: 6,
      tiles: [
        {
          label: "DNA da rede",
          href: "/quem-somos",
          description: "Tese, arquitetura territorial e modelo de operação.",
          iconKey: "Network",
          colSpan: 3,
          featureTag: "Infraestrutura",
        },
        {
          label: "Impacto ativo",
          href: "/quem-somos/impacto",
          description: "Números, relatórios e evidências observáveis da operação.",
          iconKey: "BarChart3",
          colSpan: 3,
          featureTag: "Relatório",
        },
        {
          label: "Stakeholders",
          href: "/quem-somos/stakeholders",
          description: "Empresas, prefeituras e campi conectados por território.",
          iconKey: "Globe2",
          colSpan: 3,
          accent: "clay",
        },
        {
          label: "Conteúdo editorial",
          href: "/conteudo/blog",
          description: "Ensaios, artigos e repertório para buyer, campus e cidade.",
          iconKey: "BookOpen",
          colSpan: 3,
          invert: true,
        },
      ],
    },
  },
  {
    id: "jovens",
    label: "Para Jovens",
    accent: "green",
    hasPanel: true,
    href: "/para-jovens",
    backgroundImage: "https://images.unsplash.com/photo-1511649475669-e288648b2339?q=80&w=2000&auto=format&fit=crop",

    panel: {
      eyebrow: "CAPITAL INTELECTUAL // MATCH_LAYER",
      title: "Projetos reais. Portfolio que fala.",
      description:
        "Curadoria por ODS, empresas da sua cidade e squads que viram prova pública no perfil. Você entende o fit antes de entrar no sprint.",
      ctaLabel: "Criar perfil",
      ctaHref: "/auth/jovem",
      gridCols: 6,
      tiles: [
        {
          label: "Ver matches abertos",
          href: "/oportunidades",
          description: "Desafios com fit explicado e escopo legível.",
          iconKey: "Compass",
          colSpan: 3,
          featureTag: "Curadoria",
        },
        {
          label: "Criar perfil",
          href: "/auth/jovem",
          description: "Entre na base com skills, ODS e contexto territorial.",
          iconKey: "GraduationCap",
          colSpan: 3,
          accent: "yellow",
        },
        {
          label: "Como funciona o match",
          href: "/para-jovens",
          description: "ODS, skills e contexto de cidade em uma leitura única.",
          iconKey: "Target",
          colSpan: 2,
        },
        {
          label: "Dashboard do talento",
          href: "/dashboard/jovem",
          description: "Acompanhe curadoria, squads e crescimento do portfolio.",
          iconKey: "LayoutDashboard",
          colSpan: 4,
          invert: true,
        },
      ],
    },
  },
  {
    id: "empresas",
    label: "Para Empresas",
    accent: "green",
    hasPanel: true,
    href: "/para-empresas",
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",

    panel: {
      eyebrow: "CORP // BRIEF_TO_REPORT",
      title: "Seu desafio ESG vira sprint auditável.",
      description:
        "Buyer descreve o brief, recebe shortlist com fit explicável, aprova o squad e acompanha checkpoints até o relatório final.",
      ctaLabel: "Enviar brief ESG",
      ctaHref: "/auth/empresa",
      gridCols: 6,
      tiles: [
        {
          label: "Enviar brief ESG",
          href: "/auth/empresa",
          description: "Ative a operação com escopo, prazo e ODS prioritários.",
          iconKey: "Rocket",
          colSpan: 3,
          featureTag: "72h",
          accent: "green",
        },
        {
          label: "Produtos & formatos",
          href: "/para-empresas",
          description: "Pilot Project e Managed Squad para buyers distintos.",
          iconKey: "Briefcase",
          colSpan: 3,
        },
        {
          label: "Dashboard corporativo",
          href: "/dashboard/empresa",
          description: "Veja squads ativos, checkpoints e dossiês de entrega.",
          iconKey: "LayoutDashboard",
          colSpan: 2,
        },
        {
          label: "Trilha anti-greenwashing",
          href: "/para-empresas",
          description: "Relatório auditável como entregável comprável.",
          iconKey: "ShieldCheck",
          colSpan: 4,
          invert: true,
        },
      ],
    },
  },
  {
    id: "ies",
    label: "Para IES",
    accent: "yellow",
    hasPanel: true,
    href: "/para-universidades",
    backgroundImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=2000&auto=format&fit=crop",

    panel: {
      eyebrow: "CAMPUS // EXTENSAO_EM_EVIDENCIA",
      title: "Extensão com projeto real e leitura MEC.",
      description:
        "Conecte coordenação, campus e empresas da cidade em um fluxo de horas registradas, entrega observável e repertório institucional.",
      ctaLabel: "Ativar campus",
      ctaHref: "/auth/ies",
      gridCols: 6,
      tiles: [
        {
          label: "Ativar campus",
          href: "/auth/ies",
          description: "Cadastre a instituição e abra uma frente acadêmica no HUB.",
          iconKey: "School",
          colSpan: 3,
          accent: "yellow",
        },
        {
          label: "Parceria universitária",
          href: "/para-universidades",
          description: "Modelo University Partner com extensão aplicada.",
          iconKey: "Users2",
          colSpan: 3,
        },
        {
          label: "Relatórios MEC",
          href: "/para-universidades",
          description: "Horas, impacto e contexto institucional em uma base exportável.",
          iconKey: "FileCheck2",
          colSpan: 4,
          invert: true,
        },
        {
          label: "Dashboard de campus",
          href: "/dashboard/universidade",
          description: "Leia alunos, squads, horas e frentes por semestre.",
          iconKey: "LayoutDashboard",
          colSpan: 2,
        },
      ],
    },
  },
  {
    id: "parceiros",
    label: "Parceiros e Apoiadores",
    accent: "blue",
    hasPanel: true,
    href: "/para-prefeituras",
    hideInHeader: true,
    backgroundImage: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop",

    panel: {
      eyebrow: "B2G E ECOSSISTEMA // PARCERIAS",
      title: "Governos locais e parceiros de impacto.",
      description:
        "Um ecossistema conectado onde as prefeituras e apoiadores fomentam curadoria por ODS, engajamento local e relatórios públicos de impacto.",
      ctaLabel: "Ver programa para municípios",
      ctaHref: "/para-prefeituras",
      gridCols: 6,
      tiles: [
        {
          label: "Programa para Prefeituras",
          href: "/para-prefeituras",
          description: "Modelo de ativação territorial com entrega pública de evidência e plano municipal ODS.",
          iconKey: "Landmark",
          colSpan: 3,
          featureTag: "Agenda 2030",
          accent: "blue",
        },
        {
          label: "Ativar município",
          href: "/auth/prefeitura",
          description: "Abra uma frente institucional focada no ODS de interesse.",
          iconKey: "MapPin",
          colSpan: 3,
        },
        {
          label: "Hubs Operacionais",
          href: "/quem-somos/hubs",
          description: "Rede conectando parcerias de estado e ecossistema civil.",
          iconKey: "Network",
          colSpan: 6,
          invert: true,
        },
      ],
    },
  },
  {
    id: "hubs",
    label: "Territórios",
    accent: "clay",
    hasPanel: false,
    href: "/quem-somos/hubs",
  },
  {
    id: "noticias",
    label: "Notícias",
    accent: "ink",
    hasPanel: false,
    href: "/conteudo/blog",
  },
];

export const NAV_SUPPORT_LINKS: NavSupportLink[] = [
  {
    label: "Impacto",
    href: "/quem-somos/impacto",
    description: "Trilha de evidência, números e relatórios.",
    iconKey: "BarChart3",
  },
  {
    label: "Eventos",
    href: "/conteudo/eventos",
    description: "Agenda editorial e ativações territoriais.",
    iconKey: "Sparkles",
  },
  {
    label: "Blog",
    href: "/conteudo/blog",
    description: "Leituras, ensaios e repertório de produto.",
    iconKey: "BookOpen",
  },
];
