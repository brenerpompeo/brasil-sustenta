import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Leaf, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

// ── Dados dos HUBs ────────────────────────────────────────────────────────────

export const hubs = [
  {
    id: 'sp',
    name: 'São Paulo',
    tag: 'HUB_SP',
    specialty: 'Conectividade Urbana',
    description: 'Polo principal. Hub de tecnologia, fintechs e grandes corporações B2B com demanda ESG ativa.',
    icon: Globe,
    lat: -23.5505,
    lng: -46.6333,
    status: 'ativo',
    color: '#00FF85',
    stats: { talentos: 320, empresas: 14, projetos: 28 },
  },
  {
    id: 'campinas',
    name: 'Campinas',
    tag: 'HUB_CAMPINAS',
    specialty: 'Inovação & P&D',
    description: 'Cluster universitário denso: UNICAMP, PUC-Campinas. Foco em deep tech, agro ESG e inovação aberta.',
    icon: Zap,
    lat: -22.9099,
    lng: -47.0608,
    status: 'ativo',
    color: '#CCFF00',
    stats: { talentos: 180, empresas: 8, projetos: 15 },
  },
  {
    id: 'rj',
    name: 'Rio de Janeiro',
    tag: 'HUB_RJ',
    specialty: 'Economia Azul & Energia',
    description: 'Polo de energia, petróleo sustentável e economia azul. Acesso à rede de empresas da área portuária e offshore.',
    icon: Leaf,
    lat: -22.9068,
    lng: -43.1729,
    status: 'ativo',
    color: '#38BDF8',
    stats: { talentos: 140, empresas: 7, projetos: 11 },
  },
  {
    id: 'bh',
    name: 'Belo Horizonte',
    tag: 'HUB_BH',
    specialty: 'Mineração Sustentável',
    description: 'Expansão planejada para H2 2026. Foco em mineração responsável, saneamento e políticas públicas.',
    icon: MapPin,
    lat: -19.9167,
    lng: -43.9345,
    status: 'expansao',
    color: '#FF6B35',
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
  {
    id: 'recife',
    name: 'Recife',
    tag: 'HUB_RECIFE',
    specialty: 'Impacto Social & Periférico',
    description: 'Expansão planejada para 2027. Região Nordeste — talentos periféricos, DEI e economia criativa regional.',
    icon: MapPin,
    lat: -8.0476,
    lng: -34.8770,
    status: 'expansao',
    color: '#FF6B35',
    stats: { talentos: 0, empresas: 0, projetos: 0 },
  },
];

// ── Mapa Leaflet ──────────────────────────────────────────────────────────────

function LeafletMap({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Importação dinâmica para evitar SSR issues
    import('leaflet').then((L) => {
      // Corrigir ícones padrão do Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current!, {
        center: [-15.5, -48.5],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      // Tile layer dark — CartoDB Dark Matter
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Zoom control reposicionado
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Marcadores customizados
      hubs.forEach((hub) => {
        const isActive = hub.status === 'ativo';
        const size = isActive ? 14 : 10;
        const ringSize = isActive ? 32 : 22;

        const icon = L.divIcon({
          className: '',
          html: `
            <div style="position:relative;width:${ringSize}px;height:${ringSize}px;display:flex;align-items:center;justify-content:center;">
              ${isActive ? `
                <div style="
                  position:absolute;
                  width:${ringSize}px;height:${ringSize}px;
                  border-radius:50%;
                  background:${hub.color}22;
                  border:1px solid ${hub.color}44;
                  animation: hubPulse 2.5s ease-in-out infinite;
                "></div>
              ` : ''}
              <div style="
                width:${size}px;height:${size}px;
                border-radius:50%;
                background:${hub.color};
                border:2px solid ${hub.status === 'ativo' ? '#050505' : '#1a1a1a'};
                box-shadow:0 0 ${isActive ? 12 : 4}px ${hub.color}${isActive ? '88' : '44'};
                position:relative;z-index:2;
              "></div>
            </div>
          `,
          iconSize: [ringSize, ringSize],
          iconAnchor: [ringSize / 2, ringSize / 2],
        });

        const marker = L.marker([hub.lat, hub.lng], { icon })
          .addTo(map)
          .on('click', () => onSelect(hub.id));

        markersRef.current.set(hub.id, marker);
      });

      // Injetar CSS da animação no head
      if (!document.getElementById('hub-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'hub-pulse-style';
        style.textContent = `
          @keyframes hubPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.5); opacity: 0.2; }
          }
          .leaflet-container { background: #050505 !important; }
        `;
        document.head.appendChild(style);
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Fly to hub selecionado
  useEffect(() => {
    if (!mapRef.current || !selectedId) return;
    const hub = hubs.find((h) => h.id === selectedId);
    if (hub) {
      mapRef.current.flyTo([hub.lat, hub.lng], 7, { duration: 1.2, easeLinearity: 0.3 });
    }
  }, [selectedId]);

  return (
    <>
      {/* Importar CSS do Leaflet */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={containerRef} className="h-full w-full" />
    </>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

const RegionalMap = ({ compact = false }: { compact?: boolean }) => {
  const [selectedId, setSelectedId] = React.useState<string | null>('sp');
  const selected = hubs.find((h) => h.id === selectedId);

  const activeHubs = hubs.filter((h) => h.status === 'ativo');
  const expansionHubs = hubs.filter((h) => h.status === 'expansao');

  return (
    <section className="relative overflow-hidden border-y border-white/[0.05] bg-[--paper]">

      {/* ── Header da seção ── */}
      <div className="border-b border-white/[0.05] px-6 py-10 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/30">
                MAPA // OPERAÇÃO_BRASIL
              </p>
              <h2 className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
                  style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}>
                Operação em polos
                <span className="font-light italic text-[--leaf]"> regionais</span>.
              </h2>
            </div>
            {!compact && (
              <Link
                href="/quem-somos/hubs"
                className="group mt-4 inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[--ink]/35 transition-colors hover:text-[--leaf]/70 sm:mt-0"
              >
                Ver todos os HUBs
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
          <p className="mt-4 max-w-2xl text-[13px] font-medium leading-relaxed text-[--ink]/40">
            A plataforma cresce por clusters universitários e corporativos, com curadoria local e operação conectada em rede nacional.
          </p>
        </div>
      </div>

      {/* ── Grid: mapa + lista ── */}
      <div className="mx-auto grid max-w-[1280px] xl:grid-cols-[1fr_420px]">

        {/* Mapa */}
        <div className="relative border-b border-white/[0.05] xl:border-b-0 xl:border-r xl:border-white/[0.05]">
          {/* Label overlay */}
          <div className="pointer-events-none absolute left-4 top-4 z-10 border border-white/[0.08] bg-[--paper]/80 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] text-[--ink]/45">
              MAPA INTERATIVO · CLIQUE NOS POLOS
            </span>
          </div>
          <div className="h-[420px] xl:h-[560px]">
            <LeafletMap selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </div>

        {/* Lista lateral */}
        <div className="flex flex-col">

          {/* Hubs ativos */}
          <div className="border-b border-white/[0.05] p-5">
            <p className="mb-3 font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[--ink]/28">Polos Ativos — {activeHubs.length}</p>
            <div className="flex flex-col gap-1.5">
              {activeHubs.map((hub) => {
                const Icon = hub.icon;
                const isSelected = selectedId === hub.id;
                return (
                  <motion.button
                    key={hub.id}
                    onClick={() => setSelectedId(hub.id)}
                    whileTap={{ scale: 0.99 }}
                    className={`flex cursor-pointer items-start gap-3.5 border p-4 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-[--leaf]/25 bg-[--leaf]/[0.055]'
                        : 'border-transparent hover:border-white/[0.07] hover:bg-white/[0.02]'
                    }`}
                  >
                    <div
                      className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center"
                      style={{
                        background: `${hub.color}14`,
                        border: `1px solid ${hub.color}30`,
                        color: hub.color,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]"
                              style={{ color: isSelected ? hub.color : 'rgba(250,250,250,0.3)' }}>
                          {hub.tag}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[--leaf]/50">ATIVO</span>
                      </div>
                      <p className="mt-0.5 font-display text-[15px] font-bold text-[--ink]/80">{hub.name}</p>
                      <p className="mt-0.5 text-[11.5px] text-[--ink]/38">{hub.specialty}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Hub selecionado — detalhe */}
          {selected && selected.status === 'ativo' && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="border-b border-white/[0.05] p-5"
            >
              <p className="mb-3 font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[--ink]/28">Dados do Polo</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Talentos', value: selected.stats.talentos },
                  { label: 'Empresas', value: selected.stats.empresas },
                  { label: 'Projetos', value: selected.stats.projetos },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                    <div className="font-display text-xl font-black text-[--leaf]">{value}</div>
                    <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[--ink]/30">{label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-[--ink]/38">{selected.description}</p>
            </motion.div>
          )}

          {/* Expansão futura */}
          <div className="p-5">
            <p className="mb-3 font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[--ink]/28">
              Expansão Planejada — {expansionHubs.length}
            </p>
            <div className="flex flex-col gap-1.5">
              {expansionHubs.map((hub) => (
                <div
                  key={hub.id}
                  className="flex items-center justify-between border border-white/[0.04] bg-white/[0.015] px-4 py-3"
                >
                  <div>
                    <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-[--ember]/50">{hub.tag}</span>
                    <p className="mt-0.5 text-[13px] font-semibold text-[--ink]/45">{hub.name}</p>
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[--ember]/40">Em breve</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default RegionalMap;
