import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Building2, GraduationCap, Layers3, MapPinned } from "lucide-react";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import TerritoryMap from "@/components/TerritoryMap";
import TerritoryNodeDialog from "@/components/TerritoryNodeDialog";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import {
  mapNodeStatusLabels,
  mapNodeTypeLabels,
  territoryColorClasses,
  type MapPointFeature,
} from "@shared/territory";

function OverviewCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-6">
      <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
        {label}
      </p>
      <p className="mt-3 font-display text-5xl font-bold tracking-[-0.04em] text-[color:var(--color-ink)]">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-[color:var(--color-ink-3)]">
        {description}
      </p>
    </div>
  );
}

function TerritoryCard({
  feature,
  onOpen,
}: {
  feature: MapPointFeature;
  onOpen: (slug: string) => void;
}) {
  const palette = territoryColorClasses[feature.properties.colorToken];

  return (
    <button
      type="button"
      onClick={() => onOpen(feature.properties.slug)}
      className="group h-full rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-black/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
          style={{
            color: palette.text,
            background: palette.surface,
            borderColor: palette.border,
          }}
        >
          {mapNodeTypeLabels[feature.properties.nodeType]}
        </div>
        <ArrowUpRight className="size-4 text-[color:var(--color-ink-4)] transition group-hover:text-[color:var(--color-ink)]" />
      </div>

      <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.035em] text-[color:var(--color-ink)]">
        {feature.properties.name}
      </h3>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[color:var(--color-ink-4)]">
        {[feature.properties.cityName, feature.properties.stateCode]
          .filter(Boolean)
          .join(", ")}
      </p>
      <p className="mt-4 text-sm leading-7 text-[color:var(--color-ink-3)]">
        {feature.properties.shortDescription}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-[color:var(--color-border)] pt-4">
        <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
          {mapNodeStatusLabels[feature.properties.status]}
        </span>
        <span className="text-sm font-semibold text-[color:var(--color-ink)]">
          Ver ficha
        </span>
      </div>
    </button>
  );
}

export default function Hubs() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const mapQuery = trpc.territory.public.listMapNodes.useQuery(undefined, {
    staleTime: 10_000,
    refetchOnWindowFocus: true,
  });

  const detailQuery = trpc.territory.public.getNodeDetail.useQuery(
    { slug: selectedSlug ?? "" },
    {
      enabled: !!selectedSlug,
      staleTime: 10_000,
      refetchOnWindowFocus: true,
    }
  );

  const features: MapPointFeature[] = mapQuery.data?.features ?? [];

  useEffect(() => {
    if (!features.length || selectedSlug) return;
    setSelectedSlug(features[0].properties.slug);
  }, [features, selectedSlug]);

  const overview = useMemo(() => {
    const stateHubs = features.filter(feature => feature.properties.nodeType === "state_hub").length;
    const cityHubs = features.filter(feature => feature.properties.nodeType === "city_hub").length;
    const campuses = features.filter(feature => feature.properties.nodeType === "campus").length;
    return { stateHubs, cityHubs, campuses };
  }, [features]);

  const featuredNodes = useMemo(() => {
    return [...features].sort((a, b) => a.properties.sortOrder - b.properties.sortOrder).slice(0, 6);
  }, [features]);

  const handleOpenNode = (slug: string) => {
    setSelectedSlug(slug);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <SEO
        title="Mapa Territorial — Brasil Sustenta"
        description="Rede territorial com HUBs matriz estaduais, HUBs de cidades e campus universitários articulando impacto no território brasileiro."
      />
      <Header />

      <main className="pt-16 md:pt-18">
        <PageHero
          eyebrow="Mapa territorial dinâmico"
          variant="paper"
          title={
            <>
              A malha territorial como{" "}
              <span className="italic text-[color:var(--color-leaf)]">
                infraestrutura viva
              </span>{" "}
              de impacto.
            </>
          }
          lede="Cada pin representa uma camada operacional do Brasil Sustenta: matriz estadual, hub de cidade ou campus universitário. Clique nos nós para abrir a ficha completa, com métricas, conexões e conteúdos ligados ao território."
          actions={
            <>
              <Button asChild size="xl" variant="default">
                <Link href="/auth/embaixador">
                  Liderar um HUB
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/auth/prefeitura">Programa Municipal ODS</Link>
              </Button>
            </>
          }
          side={
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              <OverviewCard
                label="Matrizes estaduais"
                value={String(overview.stateHubs)}
                description="Nós soberanos que coordenam governança, expansão regional e ativação institucional."
              />
              <OverviewCard
                label="HUBs de cidade"
                value={String(overview.cityHubs)}
                description="Operações urbanas que aproximam empresas, universidades e poder público."
              />
              <OverviewCard
                label="Campi vinculados"
                value={String(overview.campuses)}
                description="Pontos universitários conectados à malha de squads, conteúdo e empregabilidade."
              />
            </div>
          }
        />

        <section className="border-y border-[color:var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.36),rgba(237,231,220,0.72))] py-16">
          <div className="container-editorial">
            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
              <div className="space-y-5">
                <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-6">
                  <div className="flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                    <Layers3 className="size-4" />
                    Legenda operacional
                  </div>
                  <div className="mt-5 space-y-4">
                    {[
                      {
                        icon: Building2,
                        title: "Hub Matriz Estadual",
                        description: "Camada de coordenação, expansão e governança.",
                      },
                      {
                        icon: MapPinned,
                        title: "Hub Cidade",
                        description: "Operação urbana com empresas, campus e município.",
                      },
                      {
                        icon: GraduationCap,
                        title: "Campus",
                        description: "Entrada universitária para squads, talentos e conteúdo.",
                      },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="inline-grid size-10 place-items-center rounded-full bg-white">
                              <Icon className="size-4 text-[color:var(--color-ink-4)]" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                                {item.title}
                              </p>
                              <p className="text-xs leading-5 text-[color:var(--color-ink-4)]">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-6">
                  <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                    Como navegar
                  </p>
                  <ol className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--color-ink-3)]">
                    <li>1. Explore o território nacional no mapa.</li>
                    <li>2. Clique em um pin para abrir a ficha dinâmica.</li>
                    <li>3. Use os cards abaixo para ir direto aos nós em destaque.</li>
                  </ol>
                </div>
              </div>

              <TerritoryMap
                data={mapQuery.data}
                isLoading={mapQuery.isLoading}
                selectedSlug={selectedSlug}
                onSelectSlug={handleOpenNode}
              />
            </div>
          </div>
        </section>

        <section className="container-editorial section-y">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <span className="text-eyebrow">Nós em foco</span>
              <h2 className="text-headline mt-5 max-w-[16ch]">
                A rede cresce por frentes publicadas no território.
              </h2>
            </div>
            <p className="text-body md:col-span-5">
              O destaque abaixo segue a ordem territorial publicada no Admin. A
              mesma ficha alimenta o modal do mapa e os módulos públicos.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredNodes.map(feature => (
              <TerritoryCard
                key={feature.properties.slug}
                feature={feature}
                onOpen={handleOpenNode}
              />
            ))}
          </div>
        </section>

        <section className="container-editorial pb-16 md:pb-24">
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-ink)] p-10 md:p-14">
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/55">
                  Próxima ativação
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,4vw,4rem)] font-bold leading-[0.94] tracking-[-0.045em] text-white">
                  Sua cidade pode virar nó territorial publicado.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
                  Abrimos novas frentes quando existe densidade universitária,
                  demanda corporativa e possibilidade de coordenação municipal.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
                <Button asChild size="xl" variant="sun" className="w-full justify-between md:max-w-sm">
                  <Link href="/auth/embaixador">
                    Ser embaixador de HUB
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="w-full justify-between border-white/30 text-white hover:bg-white hover:text-[color:var(--color-ink)] md:max-w-sm">
                  <Link href="/auth/prefeitura">
                    Programa Municipal
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <TerritoryNodeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        detail={detailQuery.data}
        isLoading={detailQuery.isLoading}
      />

      <Footer />
    </div>
  );
}
