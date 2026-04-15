import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Leaf, Globe, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';

// ── Status types ──────────────────────────────────────────────────────────────
//   abertura   = Campinas — em abertura, primeiro polo ativo
//   planejamento = SP + RJ — estruturados, aguardando operação
//   expansao   = BH + Recife — roadmap futuro

export type HubStatus = 'abertura' | 'planejamento' | 'expansao';

export type Hub = {
  id: string;
  name: string;
  tag: string;
  specialty: string;
  description: string;
  icon: React.ElementType;
  lat: number;
  lng: number;
  status: HubStatus;
  color: string;
  pulseColor: string;
  stats: { talentos: number; empresas: number; projetos: number };
};

export const hubs: Hub[] = [
  {
    id: 'campinas',
    name: 'Campinas',
    tag: 'HUB_CAMPINAS',
    specialty: 'Inovação & P&D',
    description: 'Primeiro polo em abertura. Cluster universitário denso: UNICAMP, PUC-Campinas. Deep tech, agro ESG e inovação aberta.',
    icon: Zap,
    lat: -22.9099,
    lng: -47.0608,
    status: 'abertura',
    color: '#00FF85',
    pulseColor: 'rgba(0,255,133,0.4)',
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
  {
    id: 'sp',
    name: 'São Paulo',
    tag: 'HUB_SP',
    specialty: 'Conectividade Urbana',
    description: 'Maior polo B2B do Brasil. Fintechs, corporações e demanda ESG estruturada. Em planejamento para H2 2026.',
    icon: Globe,
    lat: -23.5505,
    lng: -46.6333,
    status: 'planejamento',
    color: '#CCFF00',
    pulseColor: 'rgba(204,255,0,0.35)',
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
  {
    id: 'rj',
    name: 'Rio de Janeiro',
    tag: 'HUB_RJ',
    specialty: 'Economia Azul & Energia',
    description: 'Energia, petróleo sustentável e economia azul. Rede portuária e offshore. Em planejamento para H2 2026.',
    icon: Leaf,
    lat: -22.9068,
    lng: -43.1729,
    status: 'planejamento',
    color: '#38BDF8',
    pulseColor: 'rgba(56,189,248,0.35)',
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
  {
    id: 'bh',
    name: 'Belo Horizonte',
    tag: 'HUB_BH',
    specialty: 'Mineração Sustentável',
    description: 'Foco em mineração responsável, saneamento e políticas públicas. Expansão planejada para 2027.',
    icon: MapPin,
    lat: -19.9167,
    lng: -43.9345,
    status: 'expansao',
    color: '#FF6B35',
    pulseColor: 'rgba(255,107,53,0.3)',
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
  {
    id: 'recife',
    name: 'Recife',
    tag: 'HUB_RECIFE',
    specialty: 'Impacto Social & Periférico',
    description: 'Talentos periféricos, DEI e economia criativa regional. Nordeste. Expansão planejada para 2027.',
    icon: MapPin,
    lat: -8.0476,
    lng: -34.8770,
    status: 'expansao',
    color: '#FF6B35',
    pulseColor: 'rgba(255,107,53,0.3)',
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
];

// ── Labels de status ──────────────────────────────────────────────────────────

const statusConfig: Record<HubStatus, { label: string; labelColor: string; dotColor: string; animate: boolean }> = {
  abertura:    { label: 'Em Abertura',   labelColor: '#00FF85', dotColor: '#00FF85', animate: true  },
  planejamento:{ label: 'Planejamento',  labelColor: '#CCFF00', dotColor: '#CCFF00', animate: false },
  expansao:    { label: 'Em Breve',      labelColor: '#FF6B35', dotColor: '#FF6B35', animate: false },
};

// ── Mapa Leaflet ──────────────────────────────────────────────────────────────

function LeafletMap({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import('leaflet').then((L) => {
      const map = L.map(containerRef.current!, {
        center: [-16, -48],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: true,
      });

      mapRef.current = map;

      // CartoDB Dark Matter — tile dark consistente com design system
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Injetar animações
      if (!document.getElementById('hub-map-style')) {
        const style = document.createElement('style');
        style.id = 'hub-map-style';
        style.textContent = `
          @keyframes hubRipple {
            0%   { transform: scale(1);   opacity: 0.7; }
            70%  { transform: scale(2.4); opacity: 0; }
            100% { transform: scale(2.4); opacity: 0; }
          }
          @keyframes hubPulse {
            0%, 100% { opacity: 0.5; }
            50%       { opacity: 1;   }
          }
          .leaflet-container { background: #050505 !important; cursor: default !important; }
          .leaflet-control-zoom a {
            background: #111 !important;
            color: rgba(250,250,250,0.5) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            border-radius: 4px !important;
          }
          .leaflet-control-zoom a:hover {
            background: #1a1a1a !important;
            color: #00FF85 !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Marcadores customizados por status
      hubs.forEach((hub) => {
        const sc = statusConfig[hub.status];
        const isAbertura = hub.status === 'abertura';
        const isPlanejamento = hub.status === 'planejamento';
        const coreSize = isAbertura ? 12 : isPlanejamento ? 10 : 7;
        const wrapSize = isAbertura ? 36 : isPlanejamento ? 28 : 20;

        const rippleHtml = isAbertura
          ? `<div style="
              position:absolute;width:${wrapSize}px;height:${wrapSize}px;
              border-radius:50%;background:${hub.pulseColor};
              animation:hubRipple 2.2s ease-out infinite;
            "></div>
             <div style="
              position:absolute;width:${wrapSize * 0.7}px;height:${wrapSize * 0.7}px;
              left:${wrapSize * 0.15}px;top:${wrapSize * 0.15}px;
              border-radius:50%;background:${hub.pulseColor};
              animation:hubRipple 2.2s ease-out 0.5s infinite;
            "></div>`
          : isPlanejamento
          ? `<div style="
              position:absolute;width:${wrapSize}px;height:${wrapSize}px;
              border-radius:50%;border:1.5px solid ${hub.color}50;
              animation:hubPulse 3s ease-in-out infinite;
            "></div>`
          : '';

        const icon = L.divIcon({
          className: '',
          html: `
            <div style="position:relative;width:${wrapSize}px;height:${wrapSize}px;display:flex;align-items:center;justify-content:center;">
              ${rippleHtml}
              <div style="
                position:relative;z-index:2;
                width:${coreSize}px;height:${coreSize}px;border-radius:50%;
                background:${hub.color};
                border:2px solid #050505;
                box-shadow:0 0 ${isAbertura ? 14 : 6}px ${hub.color}${isAbertura ? 'cc' : '66'};
              "></div>
            </div>
          `,
          iconSize: [wrapSize, wrapSize],
          iconAnchor: [wrapSize / 2, wrapSize / 2],
        });

        L.marker([hub.lat, hub.lng], { icon })
          .addTo(map)
          .on('click', () => onSelect(hub.id));
      });
    });

    return () => { mapRef.current?.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !selectedId) return;
    const hub = hubs.find((h) => h.id === selectedId);
    if (hub) mapRef.current.flyTo([hub.lat, hub.lng], 7, { duration: 1.1, easeLinearity: 0.25 });
  }, [selectedId]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={containerRef} className="h-full w-full" />
    </>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

const RegionalMap = ({ compact = false }: { compact?: boolean }) => {
  const [selectedId, setSelectedId] = React.useState<string | null>('campinas');
  const selected = hubs.find((h) => h.id === selectedId);

  const aberturaHubs    = hubs.filter((h) => h.status === 'abertura');
  const planejamentoHubs = hubs.filter((h) => h.status === 'planejamento');
  const expansaoHubs    = hubs.filter((h) => h.status === 'expansao');

  return (
    <section className="relative overflow-hidden border-y border-white/[0.05] bg-[--paper]">

      {/* ── Cabeçalho ── */}
      <div className="border-b border-white/[0.05] px-6 py-10 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
                MAPA // OPERAÇÃO_BRASIL
              </p>
              <h2
                className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
              >
                Operação em polos
                <span className="font-light italic text-[--leaf]"> regionais</span>.
              </h2>
            </div>
            {!compact && (
              <Link
                href="/quem-somos/hubs"
                className="group mt-4 inline-flex cursor-pointer items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[--ink]/30 transition-colors hover:text-[--leaf]/60 sm:mt-0"
              >
                Ver todos os HUBs
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>

          {/* Legenda de status */}
          <div className="mt-5 flex flex-wrap gap-5">
            {(Object.entries(statusConfig) as [HubStatus, typeof statusConfig[HubStatus]][]).map(([key, sc]) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="relative flex h-2.5 w-2.5 items-center justify-center"
                >
                  {key === 'abertura' && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                          style={{ background: sc.dotColor }} />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full"
                        style={{ background: sc.dotColor, opacity: key === 'expansao' ? 0.5 : 1 }} />
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: key === 'expansao' ? 'rgba(250,250,250,0.3)' : sc.labelColor + 'bb' }}>
                  {sc.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid: mapa + painel ── */}
      <div className="mx-auto grid max-w-[1280px] xl:grid-cols-[1fr_400px]">

        {/* Mapa */}
        <div className="relative border-b border-white/[0.05] xl:border-b-0 xl:border-r xl:border-white/[0.05]">
          <div className="pointer-events-none absolute left-4 top-4 z-10 border border-white/[0.07] bg-[--paper]/85 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[--ink]/40">
              MAPA INTERATIVO · CLIQUE NOS POLOS
            </span>
          </div>
          <div className="h-[400px] xl:h-[540px]">
            <LeafletMap selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </div>

        {/* Painel lateral */}
        <div className="flex flex-col overflow-hidden">

          {/* Em Abertura */}
          {aberturaHubs.length > 0 && (
            <div className="border-b border-white/[0.05]">
              <div className="px-5 pt-5 pb-3">
                <p className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[--leaf]/50">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--leaf] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[--leaf]" />
                  </span>
                  Em Abertura
                </p>
              </div>
              {aberturaHubs.map((hub) => (
                <HubRow key={hub.id} hub={hub} selected={selectedId === hub.id} onSelect={setSelectedId} />
              ))}
            </div>
          )}

          {/* Em Planejamento */}
          {planejamentoHubs.length > 0 && (
            <div className="border-b border-white/[0.05]">
              <div className="px-5 pt-5 pb-3">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[--sun]/50">
                  Planejamento
                </p>
              </div>
              {planejamentoHubs.map((hub) => (
                <HubRow key={hub.id} hub={hub} selected={selectedId === hub.id} onSelect={setSelectedId} />
              ))}
            </div>
          )}

          {/* Expansão */}
          {expansaoHubs.length > 0 && (
            <div>
              <div className="px-5 pt-5 pb-3">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[--ember]/40">
                  Expansão Futura
                </p>
              </div>
              {expansaoHubs.map((hub) => (
                <HubRow key={hub.id} hub={hub} selected={selectedId === hub.id} onSelect={setSelectedId} />
              ))}
            </div>
          )}

          {/* Detalhe do selecionado */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
                className="mt-auto border-t border-white/[0.05] bg-white/[0.015] p-5"
              >
                <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[--ink]/28">
                  {selected.tag} — {statusConfig[selected.status].label}
                </p>
                <p className="text-[12.5px] leading-relaxed text-[--ink]/40">{selected.description}</p>
                {!compact && (
                  <Link
                    href={`/quem-somos/hubs`}
                    className="group mt-3 inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors"
                    style={{ color: selected.color + '70' }}
                  >
                    Ver todos os polos
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </section>
  );
};

// ── HubRow — item de lista ────────────────────────────────────────────────────

function HubRow({ hub, selected, onSelect }: { hub: Hub; selected: boolean; onSelect: (id: string) => void }) {
  const Icon = hub.icon;
  const sc = statusConfig[hub.status];

  return (
    <motion.button
      onClick={() => onSelect(hub.id)}
      whileTap={{ scale: 0.99 }}
      className={`flex w-full cursor-pointer items-center gap-3.5 border-l-2 px-5 py-3.5 text-left transition-all duration-200 ${
        selected
          ? 'bg-white/[0.03]'
          : 'border-l-transparent hover:bg-white/[0.015]'
      }`}
      style={{
        borderLeftColor: selected ? hub.color : 'transparent',
      }}
    >
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center"
        style={{
          background: `${hub.color}10`,
          border: `1px solid ${hub.color}25`,
          color: selected ? hub.color : hub.color + '60',
        }}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-[14px] font-bold" style={{ color: selected ? 'rgba(250,250,250,0.85)' : 'rgba(250,250,250,0.5)' }}>
            {hub.name}
          </span>
          <span
            className="flex-shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
            style={{ color: sc.labelColor + (hub.status === 'expansao' ? '50' : '70') }}
          >
            {sc.label}
          </span>
        </div>
        <p className="mt-0.5 truncate text-[11px]" style={{ color: selected ? 'rgba(250,250,250,0.38)' : 'rgba(250,250,250,0.22)' }}>
          {hub.specialty}
        </p>
      </div>
    </motion.button>
  );
}

export default RegionalMap;
