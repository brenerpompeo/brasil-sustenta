import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Crosshair, MapPinned } from "lucide-react";

import { cn } from "@/lib/utils";

type TerritoryPointPickerProps = {
  latitude: number;
  longitude: number;
  onChange: (coords: { latitude: number; longitude: number }) => void;
  className?: string;
};

const BRAZIL_CENTER: [number, number] = [-51.9253, -14.235];

export function TerritoryPointPicker({
  latitude,
  longitude,
  onChange,
  className,
}: TerritoryPointPickerProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const markerRef = React.useRef<mapboxgl.Marker | null>(null);
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN?.trim();

  React.useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center:
        Number.isFinite(latitude) && Number.isFinite(longitude)
          ? [longitude, latitude]
          : BRAZIL_CENTER,
      zoom:
        Number.isFinite(latitude) && Number.isFinite(longitude) ? 8.5 : 3.4,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: false }), "top-right");

    const marker = new mapboxgl.Marker({
      color: "#00603a",
      draggable: true,
    })
      .setLngLat(
        Number.isFinite(latitude) && Number.isFinite(longitude)
          ? [longitude, latitude]
          : BRAZIL_CENTER
      )
      .addTo(map);

    markerRef.current = marker;

    marker.on("dragend", () => {
      const next = marker.getLngLat();
      onChange({ latitude: next.lat, longitude: next.lng });
    });

    map.on("click", event => {
      marker.setLngLat(event.lngLat);
      onChange({
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng,
      });
    });

    return () => {
      marker.remove();
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, onChange, token]);

  React.useEffect(() => {
    const marker = markerRef.current;
    const map = mapRef.current;
    if (!marker || !map) return;

    marker.setLngLat([longitude, latitude]);
  }, [latitude, longitude]);

  if (!token) {
    return (
      <div
        className={cn(
          "rounded-[1.5rem] border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] p-5",
          className
        )}
      >
        <div className="flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
          <MapPinned className="size-4" />
          Preview indisponível
        </div>
        <p className="mt-3 text-sm leading-6 text-[color:var(--color-ink-3)]">
          Configure <code>VITE_MAPBOX_ACCESS_TOKEN</code> para ativar o mini-mapa
          de posicionamento. Os campos de latitude e longitude continuam
          funcionando manualmente.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-white", className)}>
      <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
          <Crosshair className="size-4" />
          Clique para posicionar
        </div>
        <span className="text-xs text-[color:var(--color-ink-4)]">
          {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </span>
      </div>
      <div ref={containerRef} className="h-[260px] w-full bg-[color:var(--color-paper-2)]" />
    </div>
  );
}

export default TerritoryPointPicker;
