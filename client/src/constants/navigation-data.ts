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
    id: "consul-brain",
    label: "Conselho",
    accent: "ink",
    hasPanel: true,
    href: "/board",
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    panel: {
      eyebrow: "SOVEREIGN_PLANE // CB_CEO_CERBERUS",
      title: "Consul-Brain Control Center.",
      description:
        "Governança centralizada para orquestração de IAs multi-company. Do Conselho ao Squad operacional.",
      ctaLabel: "Acessar Board",
      ctaHref: "/board",
      gridCols: 6,
      tiles: [
        {
          label: "C-Suite Registry",
          href: "/board/registry",
          description: "Relação de 40 agentes ativos e seus reporting lines.",
          iconKey: "Users2",
          colSpan: 3,
        },
        {
          label: "Intel Assets",
          href: "/board/assets",
          description: "Modelos Ativos: Gemini, Claude, Ollama, Codex.",
          iconKey: "Network",
          colSpan: 3,
          accent: "blue",
        },
        {
          label: "Memória KG",
          href: "/board/knowledge",
          description: "Sincronização de fatos via MemPalace Graph.",
          iconKey: "BookOpen",
          colSpan: 6,
          invert: true,
        },
      ],
    },
  },
  {
    id: "brasil-sustenta",
    label: "Brasil Sustenta",
    accent: "green",
    hasPanel: true,
    href: "/brasil-sustenta",
    backgroundImage: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=2000&auto=format&fit=crop",
    panel: {
      eyebrow: "IMPACT_INFRA // BS_CEO_ATLAS",
      title: "Infraestrutura de Impacto.",
      description:
        "Mercado de talentos e squads ESG auditáveis comandado por ATLAS.",
      ctaLabel: "Ver Operação",
      ctaHref: "/para-empresas",
      gridCols: 6,
      tiles: [
        {
          label: "Managed Squads",
          href: "/para-empresas",
          description: "Squads de Social Media, CRM e UI/UX.",
          iconKey: "Briefcase",
          colSpan: 3,
          accent: "green",
        },
        {
          label: "Territórios Vivos",
          href: "/quem-somos/hubs",
          description: "Ativações municipais e hub de evidência.",
          iconKey: "MapPin",
          colSpan: 3,
        },
        {
          label: "Dossiês de Entrega",
          href: "/quem-somos/impacto",
          description: "Provas públicas contra greenwashing.",
          iconKey: "ShieldCheck",
          colSpan: 6,
          invert: true,
        },
      ],
    },
  },
  {
    id: "pacto-global",
    label: "Pacto Global",
    accent: "blue",
    hasPanel: true,
    href: "/pacto-global",
    backgroundImage: "https://images.unsplash.com/photo-1511649475669-e288648b2339?q=80&w=2000&auto=format&fit=crop",
    panel: {
      eyebrow: "GLOBAL_LEGAL // PG_CEO_LEGACY",
      title: "Legitimidade e Rede ONU.",
      description:
        "Operação institucional CLT para alinhamento com a Agenda 2030.",
      ctaLabel: "Ver Rede",
      ctaHref: "/pacto-global",
      gridCols: 6,
      tiles: [
        {
          label: "Rede Institucional",
          href: "/stakeholders",
          description: "Empresas e agências conectadas ao Pacto Global.",
          iconKey: "Globe2",
          colSpan: 3,
        },
        {
          label: "Compliance ODS",
          href: "/compliance",
          description: "Checklists de conformidade global.",
          iconKey: "FileCheck2",
          colSpan: 3,
          accent: "blue",
        },
      ],
    },
  },
  {
    id: "br360-intel",
    label: "BR360 Intel",
    accent: "yellow",
    hasPanel: true,
    href: "/br360",
    backgroundImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=2000&auto=format&fit=crop",
    panel: {
      eyebrow: "B2B_BI_ENGINE // BR_CEO_SOVEREIGN",
      title: "Inteligência de Mercado 360.",
      description:
        "Dashboards de BI e análise de dados territoriais em tempo real.",
      ctaLabel: "Acessar Dash",
      ctaHref: "/dashboard/br360",
      gridCols: 6,
      tiles: [
        {
          label: "Exploração B2B",
          href: "/br360/mapa",
          description: "Oportunidades em tempo real por setor.",
          iconKey: "Target",
          colSpan: 3,
          accent: "yellow",
        },
        {
          label: "Relatórios de BI",
          href: "/br360/reports",
          description: "Anítica avançada para tomada de decisão.",
          iconKey: "BarChart3",
          colSpan: 3,
        },
        {
          label: "Squad de Dados",
          href: "/br360/squad",
          description: "Engenharia e modelos preditivos ativados.",
          iconKey: "Network",
          colSpan: 6,
          invert: true,
        },
      ],
    },
  },
];

export const NAV_SUPPORT_LINKS: NavSupportLink[] = [
  {
    label: "Board Registry",
    href: "/board/registry",
    description: "40 Agents C-Suite.",
    iconKey: "Users2",
  },
  {
    label: "SysStatus",
    href: "/board/status",
    description: "Orchestration Live.",
    iconKey: "Sparkles",
  },
];
