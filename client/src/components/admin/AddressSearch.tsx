import React, { useState, useEffect, useCallback } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

interface AddressSearchProps {
  onSelect: (result: {
    lat: number;
    lng: number;
    cityName?: string;
    stateCode?: string;
    label: string;
  }) => void;
  className?: string;
  placeholder?: string;
}

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number];
  context?: Array<{
    id: string;
    text: string;
    short_code?: string;
  }>;
}

export function AddressSearch({ onSelect, className, placeholder = "Pesquisar endereço..." }: AddressSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapboxFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const searchAddress = useCallback(async (q: string) => {
    if (!q || q.length < 3 || !mapboxToken) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        q
      )}.json?access_token=${mapboxToken}&country=br&language=pt&limit=5`;
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.features || []);
      setIsOpen(true);
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [mapboxToken]);

  useEffect(() => {
    searchAddress(debouncedQuery);
  }, [debouncedQuery, searchAddress]);

  const handleSelect = (feature: MapboxFeature) => {
    const [lng, lat] = feature.center;
    
    // Extract city and state from context
    let cityName = "";
    let stateCode = "";

    feature.context?.forEach(ctx => {
      if (ctx.id.startsWith("place")) cityName = ctx.text;
      if (ctx.id.startsWith("region")) {
        // Mapbox region short_code usually looks like "BR-SP"
        stateCode = ctx.short_code?.split("-")[1] || ctx.text;
      }
    });

    onSelect({
      lat,
      lng,
      cityName,
      stateCode,
      label: feature.place_name
    });

    setQuery(feature.place_name);
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) setIsOpen(false);
          }}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 bg-white rounded-xl border-paper-3 focus:ring-leaf-5 font-bold"
          onFocus={() => query.length >= 3 && setIsOpen(true)}
        />
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-leaf" />
        ) : query && (
          <button 
            onClick={() => { setQuery(""); setResults([]); setIsOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-paper-3 rounded-full text-ink-4"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-[100] mt-2 w-full bg-white border border-paper-3 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          {results.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleSelect(feature)}
              className="w-full text-left px-4 py-3 hover:bg-paper-2 flex items-start gap-3 transition-colors border-b border-paper-3 last:border-0"
            >
              <MapPin className="w-4 h-4 mt-1 text-leaf shrink-0" />
              <div>
                <p className="text-sm font-bold text-ink leading-tight">
                  {feature.place_name.split(",")[0]}
                </p>
                <p className="text-[11px] font-medium text-ink-4 mt-0.5">
                  {feature.place_name.split(",").slice(1).join(",").trim()}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
