import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Layers3, MapPinned } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MapPointFeatureCollection } from "@shared/territory";

type TerritoryMapProps = {
  className?: string;
  data?: MapPointFeatureCollection;
  isLoading?: boolean;
  selectedSlug?: string | null;
  onSelectSlug?: (slug: string) => void;
};

const BRAZIL_BOUNDS: [[number, number], [number, number]] = [
  [-74, -34],
  [-28, 6],
];

const EMPTY_COLLECTION: MapPointFeatureCollection = {
  type: "FeatureCollection",
  features: [],
};

const COLOR_MATCH = [
  "match",
  ["get", "colorToken"],
  "leaf",
  "#00603a",
  "sun",
  "#f4c430",
  "atlantic",
  "#1d4ed8",
  "clay",
  "#c45a3a",
  "ink",
  "#0a0a0a",
  "#0a0a0a",
] as any;

const SURFACE_MATCH = [
  "match",
  ["get", "colorToken"],
  "leaf",
  "rgba(0, 96, 58, 0.16)",
  "sun",
  "rgba(244, 196, 48, 0.18)",
  "atlantic",
  "rgba(29, 78, 216, 0.16)",
  "clay",
  "rgba(196, 90, 58, 0.16)",
  "ink",
  "rgba(10, 10, 10, 0.16)",
  "rgba(10, 10, 10, 0.14)",
] as any;

function splitSources(data?: MapPointFeatureCollection) {
  const features = data?.features ?? [];
  return {
    macro: {
      type: "FeatureCollection",
      features: features.filter(
        feature =>
          feature.properties.nodeType === "state_hub" ||
          feature.properties.nodeType === "city_hub"
      ),
    },
    campus: {
      type: "FeatureCollection",
      features: features.filter(
        feature => feature.properties.nodeType === "campus"
      ),
    },
    selected: {
      type: "FeatureCollection",
      features: [],
    },
  } satisfies Record<string, MapPointFeatureCollection>;
}

function findFeature(
  data: MapPointFeatureCollection | undefined,
  slug?: string | null
) {
  if (!slug) return null;
  return data?.features.find(feature => feature.properties.slug === slug) ?? null;
}

function MapUnavailableState() {
  return (
    <div className="flex h-full min-h-[460px] flex-col justify-between rounded-[2rem] border border-[color:var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(237,231,220,0.96))] p-8 shadow-[0_24px_80px_rgba(10,10,10,0.08)]">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
          <MapPinned className="size-3.5" />
          Mapa indisponível
        </div>
        <h3 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-[color:var(--color-ink)]">
          Configure o token do Mapbox para ativar a malha territorial.
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--color-ink-3)]">
          Defina <code>VITE_MAPBOX_ACCESS_TOKEN</code> no ambiente do cliente
          para renderizar o mapa vetorial, clusters de campus e interações de
          navegação.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-white/70 p-5">
          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
            Sem token
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-ink-3)]">
            A página continua operando com os cards territoriais e o modal de
            dados, mas o canvas geográfico fica suspenso.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] p-5">
          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
            Próximo passo
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-ink-3)]">
            Assim que o token entrar, o mapa usa a mesma fonte de dados do Admin
            sem reconfiguração adicional.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TerritoryMap({
  className,
  data,
  isLoading = false,
  selectedSlug,
  onSelectSlug,
}: TerritoryMapProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const fittedRef = React.useRef(false);
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN?.trim();

  React.useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      antialias: true,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      cooperativeGestures: true,
    });

    mapRef.current = map;
    map.fitBounds(BRAZIL_BOUNDS, { padding: 56, duration: 0 });

    map.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: false }),
      "top-right"
    );
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");

    map.on("load", () => {
      const sources = splitSources(data);

      map.addSource("macro-nodes", {
        type: "geojson",
        data: sources.macro as any,
      });

      map.addSource("campus-nodes", {
        type: "geojson",
        data: sources.campus as any,
        cluster: true,
        clusterMaxZoom: 7,
        clusterRadius: 40,
      });

      map.addSource("selected-node", {
        type: "geojson",
        data: EMPTY_COLLECTION as any,
      });

      map.addLayer({
        id: "selected-node-halo",
        type: "circle",
        source: "selected-node",
        paint: {
          "circle-color": "rgba(10,10,10,0)",
          "circle-stroke-color": COLOR_MATCH,
          "circle-stroke-width": 2.5,
          "circle-radius": [
            "match",
            ["get", "nodeType"],
            "state_hub",
            18,
            "city_hub",
            15,
            12,
          ],
        },
      });

      map.addLayer({
        id: "state-hubs",
        type: "circle",
        source: "macro-nodes",
        filter: ["==", ["get", "nodeType"], "state_hub"],
        paint: {
          "circle-color": COLOR_MATCH,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
          "circle-radius": [
            "match",
            ["get", "status"],
            "planning",
            11,
            "expanding",
            10,
            "paused",
            8,
            12,
          ],
          "circle-opacity": [
            "match",
            ["get", "status"],
            "paused",
            0.45,
            "planning",
            0.82,
            1,
          ],
        },
      });

      map.addLayer({
        id: "city-hubs",
        type: "circle",
        source: "macro-nodes",
        filter: ["==", ["get", "nodeType"], "city_hub"],
        paint: {
          "circle-color": COLOR_MATCH,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1.8,
          "circle-radius": [
            "match",
            ["get", "status"],
            "planning",
            8,
            "expanding",
            7.2,
            "paused",
            6,
            8.6,
          ],
          "circle-opacity": [
            "match",
            ["get", "status"],
            "paused",
            0.4,
            "planning",
            0.82,
            0.94,
          ],
        },
      });

      map.addLayer({
        id: "campus-clusters",
        type: "circle",
        source: "campus-nodes",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": SURFACE_MATCH,
          "circle-stroke-color": COLOR_MATCH,
          "circle-stroke-width": 1.4,
          "circle-radius": [
            "step",
            ["get", "point_count"],
            18,
            10,
            24,
            25,
            32,
          ],
        },
      });

      map.addLayer({
        id: "campus-cluster-count",
        type: "symbol",
        source: "campus-nodes",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-size": 11,
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        },
        paint: {
          "text-color": "#0a0a0a",
        },
      });

      map.addLayer({
        id: "campus-points",
        type: "circle",
        source: "campus-nodes",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": COLOR_MATCH,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1.4,
          "circle-radius": 6.2,
          "circle-opacity": [
            "match",
            ["get", "status"],
            "planning",
            0.8,
            "paused",
            0.44,
            0.9,
          ],
        },
      });

      const interactiveLayerIds = ["state-hubs", "city-hubs", "campus-points"];

      interactiveLayerIds.forEach(layerId => {
        map.on("mouseenter", layerId, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", layerId, () => {
          map.getCanvas().style.cursor = "";
        });
        map.on("click", layerId, event => {
          const feature = event.features?.[0];
          const slug = feature?.properties?.slug;
          const coordinates = feature?.geometry?.type === "Point"
            ? (feature.geometry.coordinates as [number, number])
            : null;

          if (coordinates) {
            map.flyTo({
              center: coordinates,
              zoom: Math.max(map.getZoom(), 5.2),
              speed: 0.9,
              essential: true,
            });
          }

          if (slug) {
            onSelectSlug?.(slug);
          }
        });
      });

      map.on("click", "campus-clusters", event => {
        const feature = event.features?.[0];
        if (!feature || feature.geometry.type !== "Point") return;

        const rawClusterId = feature.properties?.cluster_id;
        const clusterId =
          rawClusterId == null ? undefined : Number(rawClusterId);
        const source = map.getSource("campus-nodes") as mapboxgl.GeoJSONSource &
          Record<string, unknown> & {
            getClusterExpansionZoom?: (
              clusterId: number,
              callback: (error: Error | null, zoom: number) => void
            ) => void;
          };

        if (typeof clusterId !== "number" || !source?.getClusterExpansionZoom) {
          return;
        }

        const clusterCoordinates = feature.geometry.coordinates as [number, number];

        source.getClusterExpansionZoom(clusterId, (error, zoom) => {
          if (error) return;
          map.easeTo({
            center: clusterCoordinates,
            zoom: zoom ?? Math.max(map.getZoom(), 6.2),
            duration: 450,
          });
        });
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      fittedRef.current = false;
    };
  }, [data, onSelectSlug, token]);

  React.useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;

    const sources = splitSources(data);
    const macroSource = map.getSource("macro-nodes") as mapboxgl.GeoJSONSource | undefined;
    const campusSource = map.getSource("campus-nodes") as mapboxgl.GeoJSONSource | undefined;

    macroSource?.setData(sources.macro as any);
    campusSource?.setData(sources.campus as any);

    if (!fittedRef.current && data?.features.length) {
      fittedRef.current = true;
      map.fitBounds(BRAZIL_BOUNDS, { padding: 56, duration: 800 });
    }
  }, [data]);

  React.useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;

    const selectedSource = map.getSource("selected-node") as mapboxgl.GeoJSONSource | undefined;
    const selectedFeature = findFeature(data, selectedSlug);

    selectedSource?.setData({
      type: "FeatureCollection",
      features: selectedFeature ? [selectedFeature] : [],
    } as any);
  }, [data, selectedSlug]);

  if (!token) {
    return <MapUnavailableState />;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-white shadow-[0_32px_90px_rgba(10,10,10,0.09)]",
        className
      )}
    >
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-black/8 bg-white/92 px-4 py-2 shadow-sm backdrop-blur">
        <Layers3 className="size-4 text-[color:var(--color-ink-4)]" />
        <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
          Matriz, cidade e campus
        </span>
      </div>

      {isLoading ? (
        <div className="flex min-h-[520px] items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(237,231,220,0.9))]">
          <div className="space-y-4 text-center">
            <div className="mx-auto size-12 animate-spin rounded-full border-2 border-[color:var(--color-paper-3)] border-t-[color:var(--color-leaf)]" />
            <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
              Sincronizando malha territorial
            </p>
          </div>
        </div>
      ) : null}

      <div
        ref={containerRef}
        className={cn(
          "min-h-[520px] w-full bg-[color:var(--color-paper-2)]",
          isLoading && "opacity-0"
        )}
      />
    </div>
  );
}

export default TerritoryMap;
