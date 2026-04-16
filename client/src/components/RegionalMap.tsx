import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Link } from "wouter";
import { editorialEaseGentle } from "@/lib/motion";
import { hubs, statusConfig, type Hub, type HubStatus } from "@/lib/hubs";

const geographyUrl = "/brazil-states.topo.json";

type TooltipState = {
  color: string;
  subtitle: string;
  title: string;
  x: number;
  y: number;
};

function normalizeLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const hubsByState = hubs.reduce<Record<string, Hub[]>>((acc, hub) => {
  const key = normalizeLabel(hub.stateName);
  acc[key] = [...(acc[key] || []), hub];
  return acc;
}, {});

function Tooltip({ tooltip }: { tooltip: TooltipState | null }) {
  if (!tooltip) return null;

  return (
    <div
      className="pointer-events-none fixed z-[60] hidden rounded-[1.25rem] border border-black/8 bg-white/96 px-4 py-3 shadow-[0_18px_46px_rgba(5,5,5,0.08)] backdrop-blur-xl md:block"
      style={{ left: tooltip.x + 18, top: tooltip.y + 18 }}
    >
      <p
        className="text-xs font-black uppercase tracking-[0.2em]"
        style={{ color: tooltip.color }}
      >
        {tooltip.subtitle}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">
        {tooltip.title}
      </p>
    </div>
  );
}

function HubMarker({
  active,
  hub,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: {
  active: boolean;
  hub: Hub;
  onClick: () => void;
  onMouseEnter: (event: React.MouseEvent<SVGGElement>) => void;
  onMouseLeave: () => void;
  onMouseMove: (event: React.MouseEvent<SVGGElement>) => void;
}) {
  const ringRadius = active ? 9 : 7;
  const coreRadius = active ? 4.6 : 3.8;

  return (
    <Marker coordinates={[hub.lng, hub.lat]}>
      <motion.g
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.2, ease: editorialEaseGentle }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className="cursor-pointer"
      >
        {hub.status === "abertura" ? (
          <>
            <motion.circle
              fill={hub.pulseColor}
              initial={{ opacity: 0.28, r: 8 }}
              animate={{ opacity: [0.28, 0], r: [8, 20] }}
              transition={{
                duration: 2.3,
                ease: editorialEaseGentle,
                repeat: Infinity,
              }}
            />
            <motion.circle
              fill={hub.pulseColor}
              initial={{ opacity: 0.18, r: 6 }}
              animate={{ opacity: [0.18, 0], r: [6, 16] }}
              transition={{
                delay: 0.45,
                duration: 2.3,
                ease: editorialEaseGentle,
                repeat: Infinity,
              }}
            />
          </>
        ) : null}

        {hub.status === "planejamento" ? (
          <motion.circle
            r={ringRadius + 5}
            fill="transparent"
            stroke={hub.color}
            strokeWidth={1.3}
            initial={{ opacity: 0.35 }}
            animate={{
              opacity: [0.25, 0.8, 0.25],
              r: [ringRadius + 4, ringRadius + 6, ringRadius + 4],
            }}
            transition={{
              duration: 2.8,
              ease: editorialEaseGentle,
              repeat: Infinity,
            }}
          />
        ) : null}

        <circle
          r={ringRadius}
          fill="white"
          stroke={hub.color}
          strokeWidth={active ? 2.1 : 1.4}
          opacity={hub.status === "expansao" ? 0.65 : 1}
        />
        <circle r={coreRadius} fill={hub.color} />
      </motion.g>
    </Marker>
  );
}

function HubRow({
  hub,
  onSelect,
  selected,
}: {
  hub: Hub;
  onSelect: (id: string) => void;
  selected: boolean;
}) {
  const Icon = hub.icon;
  const state = statusConfig[hub.status];

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(hub.id)}
      whileTap={{ scale: 0.99 }}
      className={`group flex w-full items-center gap-4 border-b border-black/8 px-5 py-4 text-left transition-colors ${
        selected ? "bg-white" : "bg-transparent hover:bg-black/[0.025]"
      }`}
    >
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[1rem] border"
        style={{
          background: `${hub.color}12`,
          borderColor: `${hub.color}28`,
          color: hub.color,
        }}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-[1.02rem] font-black italic text-foreground">
            {hub.name}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: state.labelColor }}
          >
            {state.label}
          </span>
        </div>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/42">
          {hub.specialty}
        </p>
      </div>
    </motion.button>
  );
}

const RegionalMap = ({ compact = false }: { compact?: boolean }) => {
  const [selectedId, setSelectedId] = React.useState<string>("campinas");
  const [hoveredState, setHoveredState] = React.useState<string | null>(null);
  const [tooltip, setTooltip] = React.useState<TooltipState | null>(null);

  const selected = hubs.find(hub => hub.id === selectedId) ?? hubs[0];
  const selectedStateKey = normalizeLabel(selected.stateName);

  const aberturaHubs = hubs.filter(hub => hub.status === "abertura");
  const planejamentoHubs = hubs.filter(hub => hub.status === "planejamento");
  const expansaoHubs = hubs.filter(hub => hub.status === "expansao");

  const hoveredStateLabel = hoveredState
    ? (hubsByState[hoveredState]?.[0]?.stateName ?? hoveredState)
    : selected.stateName;

  const hoveredStateHubs = hoveredState
    ? (hubsByState[hoveredState] ?? [])
    : [];

  function updateTooltip(
    event: React.MouseEvent<SVGPathElement | SVGGElement>,
    title: string,
    subtitle: string,
    color: string
  ) {
    setTooltip({ title, subtitle, color, x: event.clientX, y: event.clientY });
  }

  return (
    <section className="relative overflow-hidden border-y border-black/8 bg-[--paper]">
      <Tooltip tooltip={tooltip} />

      <div className="border-b border-black/8 px-6 py-10 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-kicker mb-4">
                Mapa operacional // Brasil Sustenta
              </p>
              <h2
                className="font-display font-black italic tracking-tight text-[--ink]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
              >
                Brasil em malha vetorial,
                <span className="text-[--leaf-1]">
                  {" "}
                  HUBs em coordenadas reais
                </span>
                .
              </h2>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-[--ink]/58">
                Cada polo e posicionado sobre a malha TopoJSON do pais para
                sinalizar presenca, fase operacional e leitura territorial.
              </p>
            </div>

            {!compact ? (
              <Link
                href="/quem-somos/hubs"
                className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[--ink]/45 transition-colors hover:text-[--leaf-1]"
              >
                Ver todos os HUBs
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-5">
            {(
              Object.entries(statusConfig) as [
                HubStatus,
                (typeof statusConfig)[HubStatus],
              ][]
            ).map(([key, state]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span
                    className="relative inline-flex h-2.5 w-2.5 rounded-full"
                    style={{
                      background: state.dotColor,
                      opacity: key === "expansao" ? 0.65 : 1,
                    }}
                  />
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: state.labelColor }}
                >
                  {state.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] xl:grid-cols-[1fr_390px]">
        <div className="relative border-b border-black/8 xl:border-b-0 xl:border-r xl:border-black/8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,133,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(46,91,255,0.06),transparent_28%)]" />

          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-black/8 bg-white/92 px-4 py-2 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[--ink]/42">
              {hoveredStateLabel}
              {hoveredStateHubs.length > 0
                ? ` // ${hoveredStateHubs.length} HUB(s)`
                : ""}
            </span>
          </div>

          <div className="h-[420px] px-4 py-4 sm:px-6 xl:h-[560px]">
            <ComposableMap
              width={980}
              height={760}
              projection="geoMercator"
              projectionConfig={{ center: [-54, -15], scale: 720 }}
              className="h-full w-full"
            >
              <ZoomableGroup
                center={[-54, -15]}
                zoom={1.02}
                minZoom={1.02}
                maxZoom={1.02}
                disablePanning
                disableZooming
              >
                <Geographies geography={geographyUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const stateName = String(
                        (geo.properties as { nome?: string })?.nome ?? ""
                      );
                      const stateKey = normalizeLabel(stateName);
                      const hubsInState = hubsByState[stateKey] ?? [];
                      const accent =
                        hubsInState[0]?.color ?? "rgba(5, 5, 5, 0.12)";
                      const isSelected = stateKey === selectedStateKey;
                      const isHovered = stateKey === hoveredState;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={event => {
                            setHoveredState(stateKey);
                            updateTooltip(
                              event,
                              stateName,
                              hubsInState.length > 0
                                ? `${hubsInState.length} HUB(s) mapeados`
                                : "Sem HUB ativo",
                              hubsInState[0]?.color ?? "rgba(5,5,5,0.45)"
                            );
                          }}
                          onMouseMove={event => {
                            updateTooltip(
                              event,
                              stateName,
                              hubsInState.length > 0
                                ? `${hubsInState.length} HUB(s) mapeados`
                                : "Sem HUB ativo",
                              hubsInState[0]?.color ?? "rgba(5,5,5,0.45)"
                            );
                          }}
                          onMouseLeave={() => {
                            setHoveredState(null);
                            setTooltip(null);
                          }}
                          style={{
                            default: {
                              fill: isSelected
                                ? `${accent}22`
                                : hubsInState.length > 0
                                  ? `${accent}10`
                                  : "rgba(255, 255, 255, 0.92)",
                              stroke: isSelected
                                ? accent
                                : "rgba(5, 5, 5, 0.18)",
                              strokeWidth: isSelected ? 1.5 : 0.95,
                              outline: "none",
                              transition:
                                "fill 240ms ease, stroke 240ms ease, opacity 240ms ease",
                            },
                            hover: {
                              fill: `${accent}18`,
                              stroke: accent,
                              strokeWidth: 1.4,
                              outline: "none",
                            },
                            pressed: {
                              fill: `${accent}24`,
                              stroke: accent,
                              strokeWidth: 1.5,
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {hubs.map(hub => (
                  <HubMarker
                    key={hub.id}
                    active={hub.id === selectedId}
                    hub={hub}
                    onClick={() => setSelectedId(hub.id)}
                    onMouseEnter={event =>
                      updateTooltip(
                        event,
                        hub.name,
                        `${hub.stateName} // ${statusConfig[hub.status].label}`,
                        hub.color
                      )
                    }
                    onMouseMove={event =>
                      updateTooltip(
                        event,
                        hub.name,
                        `${hub.stateName} // ${statusConfig[hub.status].label}`,
                        hub.color
                      )
                    }
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>

        <div className="flex flex-col bg-white/50">
          <div className="border-b border-black/8 px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[--ink]/35">
              Painel de polos
            </p>
          </div>

          {aberturaHubs.length > 0 ? (
            <div className="border-b border-black/8">
              <div className="px-5 pb-2 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[--leaf-1]">
                  Em abertura
                </p>
              </div>
              {aberturaHubs.map(hub => (
                <HubRow
                  key={hub.id}
                  hub={hub}
                  onSelect={setSelectedId}
                  selected={selectedId === hub.id}
                />
              ))}
            </div>
          ) : null}

          {planejamentoHubs.length > 0 ? (
            <div className="border-b border-black/8">
              <div className="px-5 pb-2 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[--sun]">
                  Planejamento
                </p>
              </div>
              {planejamentoHubs.map(hub => (
                <HubRow
                  key={hub.id}
                  hub={hub}
                  onSelect={setSelectedId}
                  selected={selectedId === hub.id}
                />
              ))}
            </div>
          ) : null}

          {expansaoHubs.length > 0 ? (
            <div>
              <div className="px-5 pb-2 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[--ink]/38">
                  Expansao futura
                </p>
              </div>
              {expansaoHubs.map(hub => (
                <HubRow
                  key={hub.id}
                  hub={hub}
                  onSelect={setSelectedId}
                  selected={selectedId === hub.id}
                />
              ))}
            </div>
          ) : null}

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.24, ease: editorialEaseGentle }}
              className="mt-auto border-t border-black/8 bg-white/92 p-5"
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: selected.color }}
              >
                {selected.tag} // {statusConfig[selected.status].label}
              </p>
              <h3 className="mt-2 font-display text-[1.6rem] font-black italic leading-tight text-foreground">
                {selected.name}
              </h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/38">
                {selected.stateName} // {selected.specialty}
              </p>
              <p className="mt-4 text-sm leading-7 text-foreground/64">
                {selected.description}
              </p>

              {!compact ? (
                <Link
                  href="/quem-somos/hubs"
                  className="group mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-[--leaf-1]"
                  style={{ color: `${selected.color}B8` }}
                >
                  Ver pagina completa de HUBs
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RegionalMap;
