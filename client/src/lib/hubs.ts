import type { ElementType } from "react";
import { Globe, Leaf, MapPin, Zap } from "lucide-react";

export type HubStatus = "abertura" | "planejamento" | "expansao";

export type Hub = {
  id: string;
  name: string;
  tag: string;
  specialty: string;
  description: string;
  icon: ElementType;
  lat: number;
  lng: number;
  stateName: string;
  status: HubStatus;
  color: string;
  pulseColor: string;
  stats: { talentos: number; empresas: number; projetos: number };
};

export const hubs: Hub[] = [
  {
    id: "campinas",
    name: "Campinas",
    tag: "HUB_CAMPINAS",
    specialty: "Inovacao & P&D",
    description:
      "Primeiro polo em abertura. Cluster universitario denso: UNICAMP, PUC-Campinas. Deep tech, agro ESG e inovacao aberta.",
    icon: Zap,
    lat: -22.9099,
    lng: -47.0608,
    stateName: "São Paulo",
    status: "abertura",
    color: "#2AC769",
    pulseColor: "rgba(42, 199, 105, 0.24)",
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
  {
    id: "sp",
    name: "Sao Paulo",
    tag: "HUB_SP",
    specialty: "Conectividade Urbana",
    description:
      "Maior polo B2B do Brasil. Fintechs, corporacoes e demanda ESG estruturada. Em planejamento para H2 2026.",
    icon: Globe,
    lat: -23.5505,
    lng: -46.6333,
    stateName: "São Paulo",
    status: "planejamento",
    color: "#F4C430",
    pulseColor: "rgba(244, 196, 48, 0.22)",
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
  {
    id: "rj",
    name: "Rio de Janeiro",
    tag: "HUB_RJ",
    specialty: "Economia Azul & Energia",
    description:
      "Energia, petroleo sustentavel e economia azul. Rede portuaria e offshore. Em planejamento para H2 2026.",
    icon: Leaf,
    lat: -22.9068,
    lng: -43.1729,
    stateName: "Rio de Janeiro",
    status: "planejamento",
    color: "#1F5FFF",
    pulseColor: "rgba(31, 95, 255, 0.22)",
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
  {
    id: "bh",
    name: "Belo Horizonte",
    tag: "HUB_BH",
    specialty: "Mineracao Sustentavel",
    description:
      "Foco em mineracao responsavel, saneamento e politicas publicas. Em planejamento para 2027.",
    icon: MapPin,
    lat: -19.9167,
    lng: -43.9345,
    stateName: "Minas Gerais",
    status: "planejamento",
    color: "#F4C430",
    pulseColor: "rgba(244, 196, 48, 0.22)",
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
  {
    id: "recife",
    name: "Recife",
    tag: "HUB_RECIFE",
    specialty: "Impacto Social & Periferico",
    description:
      "Talentos perifericos, DEI e economia criativa regional. Nordeste. Em planejamento para 2027.",
    icon: MapPin,
    lat: -8.0476,
    lng: -34.877,
    stateName: "Pernambuco",
    status: "planejamento",
    color: "#F4C430",
    pulseColor: "rgba(244, 196, 48, 0.22)",
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
];

export const statusConfig: Record<
  HubStatus,
  { label: string; labelColor: string; dotColor: string; animate: boolean }
> = {
  abertura: {
    label: "Em Abertura",
    labelColor: "#2AC769",
    dotColor: "#2AC769",
    animate: true,
  },
  planejamento: {
    label: "Planejamento",
    labelColor: "#F4C430",
    dotColor: "#F4C430",
    animate: false,
  },
  expansao: {
    label: "Em Breve",
    labelColor: "#A1A1A1",
    dotColor: "#A1A1A1",
    animate: false,
  },
};
