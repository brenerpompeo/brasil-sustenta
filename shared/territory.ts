export const mapNodeTypes = ["state_hub", "city_hub", "campus"] as const;
export type MapNodeType = (typeof mapNodeTypes)[number];

export const mapNodeStatuses = [
  "planning",
  "active",
  "expanding",
  "paused",
] as const;
export type MapNodeStatus = (typeof mapNodeStatuses)[number];

export const territoryColorTokens = [
  "leaf",
  "sun",
  "atlantic",
  "clay",
  "ink",
] as const;
export type TerritoryColorToken = (typeof territoryColorTokens)[number];

export type TerritoryMetric = {
  label: string;
  value: string;
  note?: string;
};

export type TerritoryCtaLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type MapNodeFeatureProps = {
  id: number | null;
  slug: string;
  name: string;
  nodeType: MapNodeType;
  status: MapNodeStatus;
  badge?: string | null;
  stateCode?: string | null;
  cityName?: string | null;
  shortDescription?: string | null;
  colorToken: TerritoryColorToken;
  isPublished: boolean;
  sortOrder: number;
};

export type MapPointFeature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: MapNodeFeatureProps;
};

export type MapPointFeatureCollection = {
  type: "FeatureCollection";
  features: MapPointFeature[];
};

export type MapNodeReference = {
  id: number | null;
  slug: string;
  name: string;
  nodeType: MapNodeType;
  stateCode?: string | null;
  cityName?: string | null;
  status: MapNodeStatus;
};

export type RelatedContentKind =
  | "blog"
  | "event"
  | "article"
  | "report"
  | "material";

export type TerritoryRelatedContentItem = {
  id: number;
  title: string;
  slug: string;
  href: string;
  meta?: string | null;
};

export type TerritoryRelatedContentGroup = {
  kind: RelatedContentKind;
  label: string;
  items: TerritoryRelatedContentItem[];
};

export type MapNodeDetail = {
  id: number | null;
  slug: string;
  name: string;
  nodeType: MapNodeType;
  status: MapNodeStatus;
  badge?: string | null;
  stateCode?: string | null;
  cityName?: string | null;
  coordinates: {
    lat: number;
    lng: number;
  };
  shortDescription?: string | null;
  longDescription?: string | null;
  colorToken: TerritoryColorToken;
  metrics: TerritoryMetric[];
  ctaLinks: TerritoryCtaLink[];
  parent: MapNodeReference | null;
  children: MapNodeReference[];
  university:
    | {
        id: number;
        name: string;
        acronym?: string | null;
        city?: string | null;
        state?: string | null;
      }
    | null;
  relatedContent: TerritoryRelatedContentGroup[];
  legacyHubLabel?: string | null;
};

export type LegacyTerritorySeed = {
  slug: string;
  name: string;
  nodeType: MapNodeType;
  status: MapNodeStatus;
  stateCode: string;
  cityName?: string;
  latitude: number;
  longitude: number;
  badge: string;
  shortDescription: string;
  longDescription: string;
  colorToken: TerritoryColorToken;
  metrics: TerritoryMetric[];
  ctaLinks: TerritoryCtaLink[];
  parentSlug?: string;
  legacyHubLabel?: string;
  sortOrder: number;
  isPublished?: boolean;
};

export const mapNodeTypeLabels: Record<MapNodeType, string> = {
  state_hub: "Hub Matriz Estadual",
  city_hub: "Hub Cidade",
  campus: "Campus Universitário",
};

export const mapNodeStatusLabels: Record<MapNodeStatus, string> = {
  planning: "Planejamento",
  active: "Operacional",
  expanding: "Expansão",
  paused: "Pausado",
};

export const territoryColorClasses: Record<
  TerritoryColorToken,
  {
    bg: string;
    surface: string;
    text: string;
    border: string;
  }
> = {
  leaf: {
    bg: "var(--color-leaf)",
    surface: "var(--color-leaf-soft)",
    text: "var(--color-leaf-deep)",
    border: "rgba(0, 96, 58, 0.18)",
  },
  sun: {
    bg: "var(--color-sun)",
    surface: "var(--color-sun-soft)",
    text: "var(--color-sun-deep)",
    border: "rgba(244, 196, 48, 0.24)",
  },
  atlantic: {
    bg: "var(--color-atlantic)",
    surface: "var(--color-atlantic-soft)",
    text: "var(--color-atlantic-deep)",
    border: "rgba(29, 78, 216, 0.18)",
  },
  clay: {
    bg: "var(--color-clay)",
    surface: "var(--color-clay-soft)",
    text: "var(--color-clay-deep)",
    border: "rgba(196, 90, 58, 0.2)",
  },
  ink: {
    bg: "var(--color-ink)",
    surface: "var(--color-paper-2)",
    text: "var(--color-ink)",
    border: "rgba(10, 10, 10, 0.16)",
  },
};

export const legacyTerritorySeeds: LegacyTerritorySeed[] = [
  {
    slug: "sao-paulo-matriz",
    name: "Hub Matriz São Paulo",
    nodeType: "state_hub",
    status: "active",
    stateCode: "SP",
    cityName: "Campinas",
    latitude: -22.9099,
    longitude: -47.0608,
    badge: "STATE // SP_CORE",
    shortDescription:
      "Camada matriz que coordena operação estadual, expansão de cidades e ativação universitária.",
    longDescription:
      "A matriz estadual em São Paulo concentra governança, onboarding de parceiros, curadoria de oportunidades e leitura de demanda regional para empresas, universidades e poder público.",
    colorToken: "leaf",
    metrics: [
      { label: "Talentos", value: "12K+" },
      { label: "Universidades-alvo", value: "42" },
      { label: "Cidades priorizadas", value: "8" },
    ],
    ctaLinks: [
      { label: "Abrir frente empresarial", href: "/auth/empresa" },
      { label: "Programa municipal", href: "/auth/prefeitura", variant: "secondary" },
    ],
    sortOrder: 10,
    isPublished: true,
  },
  {
    slug: "hub-campinas",
    name: "Hub Campinas",
    nodeType: "city_hub",
    status: "active",
    stateCode: "SP",
    cityName: "Campinas",
    latitude: -22.9099,
    longitude: -47.0608,
    badge: "CITY // INIT_PHASE",
    shortDescription:
      "Primeiro polo operacional com foco em deep tech, agro ESG e inovação aberta.",
    longDescription:
      "Campinas opera como laboratório de ativação territorial para squads universitários, projetos com empresas e coordenação com instituições locais de alta densidade tecnológica.",
    colorToken: "leaf",
    metrics: [
      { label: "Campi conectados", value: "2" },
      { label: "Empresas pipeline", value: "18" },
      { label: "Projetos projetados", value: "24" },
    ],
    ctaLinks: [
      { label: "Ativar campus", href: "/auth/ies" },
      { label: "Ser embaixador", href: "/auth/embaixador", variant: "secondary" },
    ],
    parentSlug: "sao-paulo-matriz",
    legacyHubLabel: "Campinas (Região)",
    sortOrder: 20,
    isPublished: true,
  },
  {
    slug: "unicamp-campus",
    name: "UNICAMP",
    nodeType: "campus",
    status: "active",
    stateCode: "SP",
    cityName: "Campinas",
    latitude: -22.8171,
    longitude: -47.0696,
    badge: "CAMPUS // STEM",
    shortDescription:
      "Campus com forte densidade em pesquisa aplicada, engenharia e ciência de dados.",
    longDescription:
      "UNICAMP entra como campus âncora para times multidisciplinares, validação de talentos e projetos integrados com empresas e relatórios territoriais.",
    colorToken: "sun",
    metrics: [
      { label: "Cursos estratégicos", value: "16" },
      { label: "Talentos rastreáveis", value: "1.4K" },
      { label: "Labs aderentes", value: "9" },
    ],
    ctaLinks: [
      { label: "Conectar coordenação", href: "/auth/ies" },
      { label: "Atrair talentos", href: "/auth/jovem", variant: "secondary" },
    ],
    parentSlug: "hub-campinas",
    sortOrder: 30,
    isPublished: true,
  },
  {
    slug: "puc-campinas-campus",
    name: "PUC-Campinas",
    nodeType: "campus",
    status: "planning",
    stateCode: "SP",
    cityName: "Campinas",
    latitude: -22.8348,
    longitude: -47.0517,
    badge: "CAMPUS // SOCIAL_INNOVATION",
    shortDescription:
      "Campus com potencial para frentes de impacto, comunicação e cidadania regenerativa.",
    longDescription:
      "PUC-Campinas compõe a malha universitária da cidade com foco em projetos aplicados, extensão e integração com parceiros empresariais e municipais.",
    colorToken: "sun",
    metrics: [
      { label: "Cursos aderentes", value: "11" },
      { label: "Projetos-piloto", value: "4" },
      { label: "ODS prioritários", value: "5" },
    ],
    ctaLinks: [
      { label: "Formalizar parceria", href: "/auth/ies" },
      { label: "Programa municipal", href: "/auth/prefeitura", variant: "ghost" },
    ],
    parentSlug: "hub-campinas",
    sortOrder: 31,
    isPublished: true,
  },
  {
    slug: "sao-paulo-capital",
    name: "Hub São Paulo",
    nodeType: "city_hub",
    status: "planning",
    stateCode: "SP",
    cityName: "São Paulo",
    latitude: -23.5505,
    longitude: -46.6333,
    badge: "CITY // B2B_CORE",
    shortDescription:
      "Cidade-alvo para expansão de operações corporativas, dados e projetos multi-stakeholder.",
    longDescription:
      "São Paulo funciona como frente de escala para programas ESG, marca empregadora e ativação simultânea com universidades e prefeituras metropolitanas.",
    colorToken: "atlantic",
    metrics: [
      { label: "Empresas-alvo", value: "120+" },
      { label: "Campi potenciais", value: "34" },
      { label: "Frentes públicas", value: "12" },
    ],
    ctaLinks: [
      { label: "Iniciar frente corporativa", href: "/auth/empresa" },
      { label: "Abrir programa municipal", href: "/auth/prefeitura", variant: "secondary" },
    ],
    parentSlug: "sao-paulo-matriz",
    legacyHubLabel: "São Paulo (Estado)",
    sortOrder: 40,
    isPublished: true,
  },
  {
    slug: "rio-matriz",
    name: "Hub Matriz Rio de Janeiro",
    nodeType: "state_hub",
    status: "planning",
    stateCode: "RJ",
    cityName: "Rio de Janeiro",
    latitude: -22.9068,
    longitude: -43.1729,
    badge: "STATE // ATLANTIC_GRID",
    shortDescription:
      "Estrutura estadual em formação com foco em energia, economia azul e infraestrutura pública.",
    longDescription:
      "A matriz fluminense articula frentes institucionais, ecossistema universitário e desenvolvimento de projetos em temas de energia, território costeiro e empregabilidade.",
    colorToken: "atlantic",
    metrics: [
      { label: "Municípios prioritários", value: "6" },
      { label: "Instituições mapeadas", value: "19" },
      { label: "Frentes setoriais", value: "7" },
    ],
    ctaLinks: [
      { label: "Programa institucional", href: "/auth/prefeitura" },
      { label: "Liderar expansão", href: "/auth/embaixador", variant: "secondary" },
    ],
    sortOrder: 50,
    isPublished: true,
  },
  {
    slug: "hub-rio-de-janeiro",
    name: "Hub Rio de Janeiro",
    nodeType: "city_hub",
    status: "planning",
    stateCode: "RJ",
    cityName: "Rio de Janeiro",
    latitude: -22.9068,
    longitude: -43.1729,
    badge: "CITY // BLUE_ECONOMY",
    shortDescription:
      "Frente urbana voltada a energia, economia azul e redes público-acadêmicas.",
    longDescription:
      "A cidade do Rio reúne densidade institucional e industrial para projetos ligados à transição energética, talentos universitários e inteligência territorial.",
    colorToken: "atlantic",
    metrics: [
      { label: "Universidades-alvo", value: "8" },
      { label: "Corporações-chave", value: "22" },
      { label: "Projetos em funil", value: "11" },
    ],
    ctaLinks: [
      { label: "Ativar universidade", href: "/auth/ies" },
      { label: "Abrir squad", href: "/auth/empresa", variant: "secondary" },
    ],
    parentSlug: "rio-matriz",
    legacyHubLabel: "Rio de Janeiro (Estado)",
    sortOrder: 60,
    isPublished: true,
  },
  {
    slug: "ufrj-campus",
    name: "UFRJ",
    nodeType: "campus",
    status: "planning",
    stateCode: "RJ",
    cityName: "Rio de Janeiro",
    latitude: -22.8623,
    longitude: -43.2231,
    badge: "CAMPUS // ENERGY",
    shortDescription:
      "Campus estratégico para transição energética, oceano, clima e inovação pública.",
    longDescription:
      "UFRJ é ponto natural de entrada para programas com empresas e prefeituras que exigem profundidade técnica, extensão universitária e grande escala de talentos.",
    colorToken: "sun",
    metrics: [
      { label: "Faculdades aderentes", value: "13" },
      { label: "Talentos-alvo", value: "2K+" },
      { label: "Projetos-laboratório", value: "5" },
    ],
    ctaLinks: [
      { label: "Engajar coordenação", href: "/auth/ies" },
      { label: "Atrair para squads", href: "/auth/jovem", variant: "ghost" },
    ],
    parentSlug: "hub-rio-de-janeiro",
    sortOrder: 61,
    isPublished: true,
  },
  {
    slug: "hub-belo-horizonte",
    name: "Hub Belo Horizonte",
    nodeType: "city_hub",
    status: "expanding",
    stateCode: "MG",
    cityName: "Belo Horizonte",
    latitude: -19.9167,
    longitude: -43.9345,
    badge: "CITY // MINING_TRANSITION",
    shortDescription:
      "Expansão orientada a mineração responsável, saneamento e inovação pública.",
    longDescription:
      "Belo Horizonte entra como frente de expansão para temas de transição industrial, saneamento e articulação universitária com forte capacidade técnica.",
    colorToken: "clay",
    metrics: [
      { label: "Empresas mapeadas", value: "15" },
      { label: "Universidades-alvo", value: "6" },
      { label: "Frentes prioritárias", value: "4" },
    ],
    ctaLinks: [
      { label: "Entrar como embaixador", href: "/auth/embaixador" },
      { label: "Conectar prefeitura", href: "/auth/prefeitura", variant: "secondary" },
    ],
    sortOrder: 70,
    isPublished: true,
  },
  {
    slug: "hub-recife",
    name: "Hub Recife",
    nodeType: "city_hub",
    status: "expanding",
    stateCode: "PE",
    cityName: "Recife",
    latitude: -8.0476,
    longitude: -34.877,
    badge: "CITY // CREATIVE_IMPACT",
    shortDescription:
      "Expansão com foco em inovação social, economia criativa e talentos periféricos.",
    longDescription:
      "Recife entra como nó estratégico para ampliar a malha nordestina com projetos de impacto social, comunicação e políticas urbanas regenerativas.",
    colorToken: "clay",
    metrics: [
      { label: "Campi-alvo", value: "7" },
      { label: "Empresas locais", value: "13" },
      { label: "Projetos priorizados", value: "6" },
    ],
    ctaLinks: [
      { label: "Ativar cidade", href: "/auth/embaixador" },
      { label: "Programa municipal", href: "/auth/prefeitura", variant: "secondary" },
    ],
    sortOrder: 80,
    isPublished: true,
  },
];
