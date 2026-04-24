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

export type PublicNavLink = {
  label: string;
  href: string;
  description?: string;
  iconKey?: NavIconKey;
};

export type PublicNavLinkGroup = {
  id: string;
  title: string;
  items: PublicNavLink[];
};

export const NAV: NavSection[] = [
  {
    id: "manifesto",
    label: "Manifesto",
    href: "/manifesto",
    accent: "green",
    hasPanel: false,
  },
  {
    id: "para-jovens",
    label: "Para Jovens",
    href: "/para-jovens",
    accent: "green",
    hasPanel: false,
  },
  {
    id: "para-empresas",
    label: "Para Empresas",
    href: "/para-empresas",
    accent: "green",
    hasPanel: false,
  },
  {
    id: "para-ies",
    label: "Para IES",
    href: "/para-ies",
    accent: "green",
    hasPanel: false,
  },
  {
    id: "para-prefeituras",
    label: "Para Prefeituras",
    href: "/para-prefeituras",
    accent: "blue",
    hasPanel: false,
  },
  {
    id: "hubs",
    label: "HUBs",
    href: "/quem-somos/hubs",
    accent: "green",
    hasPanel: false,
  },
  {
    id: "noticias",
    label: "Notícias",
    href: "/blog",
    accent: "green",
    hasPanel: false,
  },
];

export const NAV_PRIMARY_LINKS: PublicNavLink[] = NAV.map(item => ({
  label: item.label,
  href: item.href ?? "/",
}));

export const NAV_INSTITUTIONAL_LINKS: PublicNavLink[] = [
  {
    label: "Quem Somos",
    href: "/quem-somos",
    description: "Base institucional da rede.",
  },
  {
    label: "Impacto",
    href: "/quem-somos/impacto",
    description: "Resultados, tese e entregas.",
  },
  {
    label: "Stakeholders",
    href: "/quem-somos/stakeholders",
    description: "Ecossistema e articulação.",
  },
];

export const NAV_CONTENT_LINKS: PublicNavLink[] = [
  {
    label: "Notícias",
    href: "/blog",
    description: "Atualizações e posicionamento.",
  },
  {
    label: "Eventos",
    href: "/eventos",
    description: "Agenda pública da rede.",
  },
  {
    label: "Artigos",
    href: "/artigos",
    description: "Análises e teses editoriais.",
  },
  {
    label: "Relatórios",
    href: "/relatorios",
    description: "Publicações e evidências.",
  },
  {
    label: "Biblioteca",
    href: "/biblioteca",
    description: "Materiais de apoio e acervo.",
  },
];

export const PORTAL_ACCESS = [
  {
    label: "Empresa",
    href: "/auth/empresa",
    iconKey: "Building2",
    description: "Portal de contratação e gestão de squads ESG.",
  },
  {
    label: "Jovem",
    href: "/auth/jovem",
    iconKey: "Sparkles",
    description: "Hub de oportunidades e trilhas de impacto.",
  },
  {
    label: "IES",
    href: "/auth/ies",
    iconKey: "GraduationCap",
    description: "Conexão acadêmica e extensão territorial.",
  },
  {
    label: "Embaixador",
    href: "/auth/embaixador",
    iconKey: "Target",
    description: "Liderança local e ativação de territórios.",
  },
  {
    label: "Prefeitura",
    href: "/auth/prefeitura",
    iconKey: "Landmark",
    description: "Gestão pública e monitoramento de ODS.",
  },
];

export const NAV_SUPPORT_LINKS: NavSupportLink[] = [
  {
    label: "Termos de Uso",
    href: "/termos",
    description: "Base legal da operação.",
    iconKey: "FileText",
  },
  {
    label: "Privacidade",
    href: "/privacidade",
    description: "Segurança de dados.",
    iconKey: "ShieldCheck",
  },
];

export const PUBLIC_SHELL_IA = {
  primary: NAV_PRIMARY_LINKS,
  institutional: NAV_INSTITUTIONAL_LINKS,
  content: NAV_CONTENT_LINKS,
  portalAccess: PORTAL_ACCESS,
  utility: NAV_SUPPORT_LINKS,
} satisfies Record<string, PublicNavLink[] | typeof PORTAL_ACCESS | typeof NAV_SUPPORT_LINKS>;

export const NAV_FOOTER_GROUPS: PublicNavLinkGroup[] = [
  {
    id: "navegacao",
    title: "Navegação",
    items: NAV_PRIMARY_LINKS,
  },
  {
    id: "rede",
    title: "Rede",
    items: NAV_INSTITUTIONAL_LINKS,
  },
  {
    id: "conteudo",
    title: "Conteúdo",
    items: NAV_CONTENT_LINKS,
  },
  {
    id: "acesso",
    title: "Acesso",
    items: PORTAL_ACCESS.map(({ label, href, description }) => ({
      label,
      href,
      description,
    })),
  },
];

export const NAV_DRAWER_GROUPS: PublicNavLinkGroup[] = [
  {
    id: "rede",
    title: "Rede",
    items: NAV_INSTITUTIONAL_LINKS,
  },
  {
    id: "conteudo",
    title: "Conteúdo",
    items: NAV_CONTENT_LINKS,
  },
];
