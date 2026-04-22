import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  MapPinned,
  Network,
  Plus,
  Save,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import AdminLayout from "@/components/AdminLayout";
import TerritoryPointPicker from "@/components/admin/TerritoryPointPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { AddressSearch } from "@/components/admin/AddressSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mapNodeStatusLabels,
  mapNodeTypeLabels,
  type TerritoryCtaLink,
  type TerritoryMetric,
} from "@shared/territory";
import type { TerritoryNode } from "@shared/types";

type TerritoryEditorState = {
  id?: number;
  slug: string;
  name: string;
  nodeType: "state_hub" | "city_hub" | "campus";
  status: "planning" | "active" | "expanding" | "paused";
  stateCode: string;
  cityName: string;
  latitude: number;
  longitude: number;
  shortDescription: string;
  longDescription: string;
  badge: string;
  heroImage: string;
  colorToken: "leaf" | "sun" | "atlantic" | "clay" | "ink";
  metrics: TerritoryMetric[];
  ctaLinks: TerritoryCtaLink[];
  legacyHubLabel: string;
  parentNodeId: number | null;
  universityProfileId: number | null;
  isPublished: boolean;
  sortOrder: number;
  linkedContent: {
    blogPostIds: number[];
    eventIds: number[];
    articleIds: number[];
    reportIds: number[];
    materialIds: number[];
  };
};

type UniversityReference = {
  id: number;
  universityName: string;
  acronym: string | null;
  city: string | null;
  state: string | null;
};

type ContentReference = {
  id: number;
  title: string;
  slug: string;
  territoryNodeId: number | null;
  hub: string | null;
};

type TerritoryReferences = {
  nodes: TerritoryNode[];
  universities: UniversityReference[];
  content: {
    blogPosts: ContentReference[];
    events: ContentReference[];
    articles: ContentReference[];
    reports: ContentReference[];
    materials: ContentReference[];
  };
};

const BRAZIL_DEFAULTS = {
  latitude: -14.235,
  longitude: -51.9253,
};

const EMPTY_EDITOR: TerritoryEditorState = {
  slug: "",
  name: "",
  nodeType: "state_hub",
  status: "planning",
  stateCode: "SP",
  cityName: "",
  latitude: BRAZIL_DEFAULTS.latitude,
  longitude: BRAZIL_DEFAULTS.longitude,
  shortDescription: "",
  longDescription: "",
  badge: "",
  heroImage: "",
  colorToken: "leaf",
  metrics: [],
  ctaLinks: [],
  legacyHubLabel: "",
  parentNodeId: null,
  universityProfileId: null,
  isPublished: true,
  sortOrder: 10,
  linkedContent: {
    blogPostIds: [],
    eventIds: [],
    articleIds: [],
    reportIds: [],
    materialIds: [],
  },
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function ContentPickerSection({
  title,
  items,
  selectedIds,
  onToggle,
}: {
  title: string;
  items: Array<{
    id: number;
    title: string;
    slug: string;
    territoryNodeId: number | null;
    hub: string | null;
  }>;
  selectedIds: number[];
  onToggle: (id: number) => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[color:var(--color-ink)]">
          {title}
        </h4>
        <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
          {selectedIds.length} selecionado(s)
        </span>
      </div>

      <div className="mt-4 max-h-56 space-y-2 overflow-y-auto pr-1">
        {items.length ? (
          items.map(item => {
            const checked = selectedIds.includes(item.id);
            return (
              <label
                key={item.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-[1rem] border px-4 py-3 transition",
                  checked
                    ? "border-[color:var(--color-leaf)] bg-[color:var(--color-leaf-soft)]"
                    : "border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] hover:bg-white"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item.id)}
                  className="mt-1 size-4 accent-[color:var(--color-leaf)]"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[color:var(--color-ink)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-4)]">
                    {item.territoryNodeId
                      ? `Já vinculado a #${item.territoryNodeId}`
                      : item.hub || "Sem vínculo"}
                  </p>
                </div>
              </label>
            );
          })
        ) : (
          <p className="text-sm text-[color:var(--color-ink-4)]">
            Nenhum item disponível neste grupo.
          </p>
        )}
      </div>
    </div>
  );
}

export default function AdminTerritorios() {
  const utils = trpc.useUtils();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editor, setEditor] = useState<TerritoryEditorState>(EMPTY_EDITOR);

  const nodesQuery = trpc.territory.admin.list.useQuery();
  const referencesQuery = trpc.territory.admin.getReferences.useQuery();

  const createMutation = trpc.territory.admin.create.useMutation({
    onSuccess: async () => {
      toast.success("Nó territorial criado com sucesso.");
      await Promise.all([
        utils.territory.admin.list.invalidate(),
        utils.territory.admin.getReferences.invalidate(),
        utils.territory.public.listMapNodes.invalidate(),
      ]);
      setEditor(EMPTY_EDITOR);
      setActiveId(null);
      setIsCreatingNew(false);
    },
    onError: error => toast.error(error.message),
  });

  const updateMutation = trpc.territory.admin.update.useMutation({
    onSuccess: async () => {
      toast.success("Nó territorial atualizado.");
      await Promise.all([
        utils.territory.admin.list.invalidate(),
        utils.territory.admin.getReferences.invalidate(),
        utils.territory.public.listMapNodes.invalidate(),
      ]);
    },
    onError: error => toast.error(error.message),
  });

  const deleteMutation = trpc.territory.admin.delete.useMutation({
    onSuccess: async () => {
      toast.success("Nó territorial removido.");
      await Promise.all([
        utils.territory.admin.list.invalidate(),
        utils.territory.admin.getReferences.invalidate(),
        utils.territory.public.listMapNodes.invalidate(),
      ]);
      setEditor(EMPTY_EDITOR);
      setActiveId(null);
      setIsCreatingNew(false);
    },
    onError: error => toast.error(error.message),
  });

  const reorderMutation = trpc.territory.admin.reorder.useMutation({
    onSuccess: async () => {
      await utils.territory.admin.list.invalidate();
      toast.success("Ordem territorial atualizada.");
    },
    onError: error => toast.error(error.message),
  });

  const seedMutation = trpc.territory.admin.seedLegacy.useMutation({
    onSuccess: async result => {
      toast.success(
        result.created
          ? `${result.created} nós iniciais importados.`
          : "A base já possui nós publicados."
      );
      await Promise.all([
        utils.territory.admin.list.invalidate(),
        utils.territory.admin.getReferences.invalidate(),
        utils.territory.public.listMapNodes.invalidate(),
      ]);
    },
    onError: error => toast.error(error.message),
  });

  const nodes: TerritoryNode[] = nodesQuery.data ?? [];
  const references = referencesQuery.data as TerritoryReferences | undefined;

  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const haystack = `${node.name} ${node.slug} ${node.cityName ?? ""} ${node.stateCode ?? ""}`.toLowerCase();
      return haystack.includes(searchTerm.toLowerCase());
    });
  }, [nodes, searchTerm]);

  const buildEditorState = useCallback(
    (nodeId: number | null) => {
      if (!nodeId) return EMPTY_EDITOR;

      const node = nodes.find(item => item.id === nodeId);
      if (!node || !references) return EMPTY_EDITOR;

      return {
        id: node.id,
        slug: node.slug,
        name: node.name,
        nodeType: node.nodeType,
        status: node.status,
        stateCode: node.stateCode ?? "",
        cityName: node.cityName ?? "",
        latitude: node.latitude,
        longitude: node.longitude,
        shortDescription: node.shortDescription ?? "",
        longDescription: node.longDescription ?? "",
        badge: node.badge ?? "",
        heroImage: node.heroImage ?? "",
        colorToken: (node.colorToken as TerritoryEditorState["colorToken"]) ?? "leaf",
        metrics: (node.metrics as TerritoryMetric[] | null) ?? [],
        ctaLinks: (node.cta_links as TerritoryCtaLink[] | null) ?? [],
        legacyHubLabel: node.legacyHubLabel ?? "",
        parentNodeId: node.parentNodeId,
        universityProfileId: node.universityProfileId,
        isPublished: node.isPublished,
        sortOrder: node.sortOrder,
        linkedContent: {
          blogPostIds: references.content.blogPosts
            .filter(item => item.territoryNodeId === node.id)
            .map(item => item.id),
          eventIds: references.content.events
            .filter(item => item.territoryNodeId === node.id)
            .map(item => item.id),
          articleIds: references.content.articles
            .filter(item => item.territoryNodeId === node.id)
            .map(item => item.id),
          reportIds: references.content.reports
            .filter(item => item.territoryNodeId === node.id)
            .map(item => item.id),
          materialIds: references.content.materials
            .filter(item => item.territoryNodeId === node.id)
            .map(item => item.id),
        },
      };
    },
    [nodes, references]
  );

  useEffect(() => {
    if (!nodes.length || activeId || !references || isCreatingNew) return;
    setActiveId(nodes[0].id);
  }, [activeId, isCreatingNew, nodes, references]);

  useEffect(() => {
    if (!references || isCreatingNew) return;
    setEditor(buildEditorState(activeId));
  }, [activeId, buildEditorState, isCreatingNew, references]);

  const parentOptions = useMemo(() => {
    return nodes.filter(node => {
      if (editor.id && node.id === editor.id) return false;
      if (editor.nodeType === "state_hub") return false;
      if (editor.nodeType === "city_hub") return node.nodeType === "state_hub";
      return node.nodeType === "city_hub" || node.nodeType === "state_hub";
    });
  }, [editor.id, editor.nodeType, nodes]);

  const handleCoordinateChange = useCallback(
    ({ latitude, longitude }: { latitude: number; longitude: number }) => {
      setEditor(current => ({ ...current, latitude, longitude }));
    },
    []
  );

  const handleToggleContent = (
    key: keyof TerritoryEditorState["linkedContent"],
    id: number
  ) => {
    setEditor(current => {
      const hasId = current.linkedContent[key].includes(id);
      return {
        ...current,
        linkedContent: {
          ...current.linkedContent,
          [key]: hasId
            ? current.linkedContent[key].filter(item => item !== id)
            : [...current.linkedContent[key], id],
        },
      };
    });
  };

  const moveNode = (id: number, direction: "up" | "down") => {
    const currentIndex = filteredNodes.findIndex(node => node.id === id);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (currentIndex < 0 || swapIndex < 0 || swapIndex >= filteredNodes.length) {
      return;
    }

    const next = [...filteredNodes];
    const [current] = next.splice(currentIndex, 1);
    next.splice(swapIndex, 0, current);
    reorderMutation.mutate({ ids: next.map(item => item.id) });
  };

  const handleSubmit = () => {
    const payload = {
      ...editor,
      stateCode: editor.stateCode.toUpperCase(),
      cityName: editor.cityName || null,
      shortDescription: editor.shortDescription || null,
      longDescription: editor.longDescription || null,
      badge: editor.badge || null,
      heroImage: editor.heroImage || null,
      legacyHubLabel: editor.legacyHubLabel || null,
      parentNodeId: editor.parentNodeId,
      universityProfileId:
        editor.nodeType === "campus" ? editor.universityProfileId : null,
    };

    if (!editor.name.trim()) {
      toast.error("Informe o nome do nó territorial.");
      return;
    }

    if (!editor.slug.trim()) {
      toast.error("Defina um slug válido.");
      return;
    }

    if (editor.id) {
      updateMutation.mutate({ id: editor.id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isBusy =
    nodesQuery.isLoading ||
    referencesQuery.isLoading ||
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--color-ink-4)]">
              Controle territorial
            </p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.05em] text-[color:var(--color-ink)]">
              Matriz estadual, cidades e campus em uma única camada.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--color-ink-3)]">
              Aqui você cadastra coordenadas, hierarquia territorial, métricas,
              CTAs e vínculos com conteúdos e universidades. O mapa público consome
              exatamente esta base.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setActiveId(null);
                setIsCreatingNew(true);
                setEditor({
                  ...EMPTY_EDITOR,
                  sortOrder: (nodes[nodes.length - 1]?.sortOrder ?? 0) + 10,
                });
              }}
            >
              <Plus className="size-4" />
              Novo nó
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => seedMutation.mutate()}
              disabled={seedMutation.isPending}
            >
              <Sparkles className="size-4" />
              Importar seeds iniciais
            </Button>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
          <section className="rounded-[2rem] border border-[color:var(--color-border)] bg-white shadow-[0_18px_60px_rgba(10,10,10,0.06)]">
            <div className="border-b border-[color:var(--color-border)] p-6">
              <div className="flex items-center gap-3 rounded-[1rem] border border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] px-4 py-3">
                <Search className="size-4 text-[color:var(--color-ink-4)]" />
                <input
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                  placeholder="Buscar por cidade, estado ou slug"
                  className="w-full bg-transparent text-sm font-medium text-[color:var(--color-ink)] outline-none placeholder:text-[color:var(--color-ink-5)]"
                />
              </div>
            </div>

            <div className="max-h-[72vh] space-y-3 overflow-y-auto p-4">
              {filteredNodes.length ? (
                filteredNodes.map(node => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      setActiveId(node.id);
                      setIsCreatingNew(false);
                    }}
                    className={cn(
                      "w-full rounded-[1.5rem] border p-5 text-left transition",
                      activeId === node.id
                        ? "border-[color:var(--color-ink)] bg-[color:var(--color-paper-2)]"
                        : "border-[color:var(--color-border)] bg-white hover:bg-[color:var(--color-paper-2)]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-[color:var(--color-ink)]">
                          {node.name}
                        </p>
                        <p className="mt-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                          {mapNodeTypeLabels[node.nodeType]}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={event => {
                            event.stopPropagation();
                            moveNode(node.id, "up");
                          }}
                          className="rounded-full border border-[color:var(--color-border)] p-2 text-[color:var(--color-ink-4)] transition hover:bg-white"
                        >
                          <ArrowUp className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={event => {
                            event.stopPropagation();
                            moveNode(node.id, "down");
                          }}
                          className="rounded-full border border-[color:var(--color-border)] p-2 text-[color:var(--color-ink-4)] transition hover:bg-white"
                        >
                          <ArrowDown className="size-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[color:var(--color-ink-4)]">
                      <span>{[node.cityName, node.stateCode].filter(Boolean).join(", ")}</span>
                      <span>{mapNodeStatusLabels[node.status]}</span>
                      <span>ordem {node.sortOrder}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] p-6 text-sm leading-7 text-[color:var(--color-ink-4)]">
                  Nenhum nó encontrado. Você pode importar os seeds iniciais ou
                  criar um novo nó manualmente.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[color:var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(237,231,220,0.94))] shadow-[0_20px_70px_rgba(10,10,10,0.07)]">
            <div className="flex flex-col gap-4 border-b border-[color:var(--color-border)] p-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                  Editor do nó
                </p>
                <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.04em] text-[color:var(--color-ink)]">
                  {editor.name || "Novo nó territorial"}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[color:var(--color-ink-3)]">
                  Defina a geografia, conecte conteúdos e publique a ficha que vai
                  abastecer o mapa público e seus modais.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {editor.id ? (
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => {
                      if (!editor.id) return;
                      if (!window.confirm("Remover este nó territorial?")) return;
                      deleteMutation.mutate({ id: editor.id });
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="size-4" />
                    Excluir
                  </Button>
                ) : null}
                <Button size="lg" onClick={handleSubmit} disabled={isBusy}>
                  <Save className="size-4" />
                  {editor.id ? "Salvar alterações" : "Criar nó"}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="id" className="w-full">
              <div className="px-6 border-b border-[color:var(--color-border)]">
                <TabsList className="h-14 bg-transparent gap-8 p-0">
                  <TabsTrigger 
                    value="id" 
                    className="h-full rounded-none border-b-2 border-transparent px-2 text-sm font-bold data-[state=active]:border-leaf data-[state=active]:text-leaf bg-transparent"
                  >
                    Identificação
                  </TabsTrigger>
                  <TabsTrigger 
                    value="content" 
                    className="h-full rounded-none border-b-2 border-transparent px-2 text-sm font-bold data-[state=active]:border-leaf data-[state=active]:text-leaf bg-transparent"
                  >
                    Apresentação
                  </TabsTrigger>
                  <TabsTrigger 
                    value="relations" 
                    className="h-full rounded-none border-b-2 border-transparent px-2 text-sm font-bold data-[state=active]:border-leaf data-[state=active]:text-leaf bg-transparent"
                  >
                    Vínculos
                  </TabsTrigger>
                  <TabsTrigger 
                    value="advanced" 
                    className="h-full rounded-none border-b-2 border-transparent px-2 text-sm font-bold data-[state=active]:border-leaf data-[state=active]:text-leaf bg-transparent"
                  >
                    Avançado
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="id" className="m-0 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text- ink-4 font-bold text-xs uppercase tracking-widest">Busca de Endereço (Geocodificação)</Label>
                        <AddressSearch 
                          onSelect={(res) => {
                            setEditor(current => ({
                              ...current,
                              latitude: res.lat,
                              longitude: res.lng,
                              cityName: res.cityName || current.cityName,
                              stateCode: res.stateCode || current.stateCode,
                            }));
                            toast.success("Coordenadas e localidade atualizadas!");
                          }}
                          placeholder="Digite o endereço para localizar no mapa..."
                        />
                        <p className="text-[10px] text-ink-5 leading-tight">
                          A busca preenche automaticamente as coordenadas, cidade e estado. Você ainda pode ajustar manualmente se necessário.
                        </p>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Tipo</Label>
                          <Select
                            value={editor.nodeType}
                            onValueChange={(value: TerritoryEditorState["nodeType"]) =>
                              setEditor(current => ({
                                ...current,
                                nodeType: value,
                                parentNodeId:
                                  value === "state_hub" ? null : current.parentNodeId,
                                universityProfileId:
                                  value === "campus" ? current.universityProfileId : null,
                              }))
                            }
                          >
                            <SelectTrigger className="h-11 rounded-xl border-[color:var(--color-border)] bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              {Object.entries(mapNodeTypeLabels).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select
                            value={editor.status}
                            onValueChange={(value: TerritoryEditorState["status"]) =>
                              setEditor(current => ({ ...current, status: value }))
                            }
                          >
                            <SelectTrigger className="h-11 rounded-xl border-[color:var(--color-border)] bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              {Object.entries(mapNodeStatusLabels).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input
                          value={editor.name}
                          onChange={event =>
                            setEditor(current => ({
                              ...current,
                              name: event.target.value,
                              slug: current.id ? current.slug : slugify(event.target.value),
                            }))
                          }
                          placeholder="Ex: Hub Campinas"
                          className="h-11 rounded-xl border-[color:var(--color-border)] bg-white font-bold"
                        />
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Slug</Label>
                          <Input
                            value={editor.slug}
                            onChange={event =>
                              setEditor(current => ({
                                ...current,
                                slug: slugify(event.target.value),
                              }))
                            }
                            className="h-11 rounded-xl border-[color:var(--color-border)] bg-paper-2 font-mono text-xs"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Badge</Label>
                          <Input
                            value={editor.badge}
                            onChange={event =>
                              setEditor(current => ({ ...current, badge: event.target.value }))
                            }
                            placeholder="STATE // SP_CORE"
                            className="h-11 rounded-xl border-[color:var(--color-border)] bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>UF</Label>
                          <Input
                            value={editor.stateCode}
                            maxLength={2}
                            onChange={event =>
                              setEditor(current => ({
                                ...current,
                                stateCode: event.target.value.toUpperCase(),
                              }))
                            }
                            className="h-11 rounded-xl border-[color:var(--color-border)] bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Cidade</Label>
                          <Input
                            value={editor.cityName}
                            onChange={event =>
                              setEditor(current => ({ ...current, cityName: event.target.value }))
                            }
                            className="h-11 rounded-xl border-[color:var(--color-border)] bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2 pt-2 border-t border-paper-3">
                        <div className="space-y-2">
                          <Label className="text-ink-4">Latitude</Label>
                          <Input
                            type="number"
                            step="0.0001"
                            value={editor.latitude}
                            onChange={event =>
                              setEditor(current => ({
                                ...current,
                                latitude: Number(event.target.value),
                              }))
                            }
                            className="h-10 rounded-xl border-[color:var(--color-border)] bg-paper-2 text-xs"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-ink-4">Longitude</Label>
                          <Input
                            type="number"
                            step="0.0001"
                            value={editor.longitude}
                            onChange={event =>
                              setEditor(current => ({
                                ...current,
                                longitude: Number(event.target.value),
                              }))
                            }
                            className="h-10 rounded-xl border-[color:var(--color-border)] bg-paper-2 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="rounded-[1.5rem] border border-leaf-soft bg-leaf-soft/10 p-1">
                        <TerritoryPointPicker
                          latitude={editor.latitude}
                          longitude={editor.longitude}
                          onChange={handleCoordinateChange}
                        />
                      </div>
                      <p className="text-[10px] text-center text-leaf font-bold uppercase tracking-widest px-8">
                        Você também pode arrastar o pin no mapa para refinar a localização exata.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="m-0 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label>Resumo curto</Label>
                        <Textarea
                          value={editor.shortDescription}
                          onChange={event =>
                            setEditor(current => ({
                              ...current,
                              shortDescription: event.target.value,
                            }))
                          }
                          placeholder="Aparece no card de listagem..."
                          className="min-h-[110px] rounded-[1rem] border-[color:var(--color-border)] bg-white focus:ring-leaf"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Descrição completa (Modal)</Label>
                        <Textarea
                          value={editor.longDescription}
                          onChange={event =>
                            setEditor(current => ({
                              ...current,
                              longDescription: event.target.value,
                            }))
                          }
                          placeholder="Conte a história deste hub..."
                          className="min-h-[200px] rounded-[1rem] border-[color:var(--color-border)] bg-white focus:ring-leaf"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Hero Image URL</Label>
                        <Input
                          value={editor.heroImage}
                          onChange={event =>
                            setEditor(current => ({ ...current, heroImage: event.target.value }))
                          }
                          placeholder="https://..."
                          className="h-11 rounded-xl border-[color:var(--color-border)] bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Token de cor (Estilo)</Label>
                          <Select
                            value={editor.colorToken}
                            onValueChange={(value: TerritoryEditorState["colorToken"]) =>
                              setEditor(current => ({ ...current, colorToken: value }))
                            }
                          >
                            <SelectTrigger className="h-11 rounded-xl border-[color:var(--color-border)] bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="leaf">Leaf (Verde)</SelectItem>
                              <SelectItem value="sun">Sun (Amarelo)</SelectItem>
                              <SelectItem value="atlantic">Atlantic (Azul)</SelectItem>
                              <SelectItem value="clay">Clay (Barro)</SelectItem>
                              <SelectItem value="ink">Ink (Preto)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Ordem de Exibição</Label>
                          <Input
                            type="number"
                            value={editor.sortOrder}
                            onChange={event =>
                              setEditor(current => ({
                                ...current,
                                sortOrder: Number(event.target.value),
                              }))
                            }
                            className="h-11 rounded-xl border-[color:var(--color-border)] bg-white"
                          />
                        </div>
                      </div>

                      <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-leaf">
                              Métricas de Impacto
                            </p>
                          </div>
                          <Button
                            variant="secondary"
                            size="xs"
                            className="h-8 rounded-lg"
                            onClick={() =>
                              setEditor(current => ({
                                ...current,
                                metrics: [
                                  ...current.metrics,
                                  { label: "", value: "", note: "" },
                                ],
                              }))
                            }
                          >
                            <Plus className="size-3 mr-1" />
                            Adicionar
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {editor.metrics.map((metric, index) => (
                            <div
                              key={`metric-${index}`}
                              className="grid gap-2 rounded-xl border border-paper-3 bg-paper-2 p-3"
                            >
                              <div className="grid gap-2 grid-cols-2">
                                <Input
                                  value={metric.label}
                                  onChange={event =>
                                    setEditor(current => ({
                                      ...current,
                                      metrics: current.metrics.map((item, itemIndex) =>
                                        itemIndex === index
                                          ? { ...item, label: event.target.value }
                                          : item
                                      ),
                                    }))
                                  }
                                  placeholder="Label"
                                  className="h-9 rounded-lg border-paper-3 text-xs"
                                />
                                <Input
                                  value={metric.value}
                                  onChange={event =>
                                    setEditor(current => ({
                                      ...current,
                                      metrics: current.metrics.map((item, itemIndex) =>
                                        itemIndex === index
                                          ? { ...item, value: event.target.value }
                                          : item
                                      ),
                                    }))
                                  }
                                  placeholder="Valor"
                                  className="h-9 rounded-lg border-paper-3 text-xs font-bold"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  value={metric.note ?? ""}
                                  onChange={event =>
                                    setEditor(current => ({
                                      ...current,
                                      metrics: current.metrics.map((item, itemIndex) =>
                                        itemIndex === index
                                          ? { ...item, note: event.target.value }
                                          : item
                                      ),
                                    }))
                                  }
                                  placeholder="Nota (opcional)"
                                  className="h-8 rounded-lg border-paper-3 text-[10px]"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 text-ink-5 hover:text-red-500"
                                  onClick={() =>
                                    setEditor(current => ({
                                      ...current,
                                      metrics: current.metrics.filter((_, itemIndex) => itemIndex !== index),
                                    }))
                                  }
                                >
                                  <Trash2 className="size-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-atlantic">
                              Botões de Ação (CTAs)
                            </p>
                          </div>
                          <Button
                            variant="secondary"
                            size="xs"
                            className="h-8 rounded-lg"
                            onClick={() =>
                              setEditor(current => ({
                                ...current,
                                ctaLinks: [
                                  ...current.ctaLinks,
                                  { label: "", href: "", variant: "primary" },
                                ],
                              }))
                            }
                          >
                            <Plus className="size-3 mr-1" />
                            Adicionar
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {editor.ctaLinks.map((cta, index) => (
                            <div
                              key={`cta-${index}`}
                              className="grid gap-2 rounded-xl border border-paper-3 bg-paper-2 p-3"
                            >
                              <Input
                                value={cta.label}
                                onChange={event =>
                                  setEditor(current => ({
                                    ...current,
                                    ctaLinks: current.ctaLinks.map((item, itemIndex) =>
                                      itemIndex === index
                                        ? { ...item, label: event.target.value }
                                        : item
                                    ),
                                  }))
                                }
                                placeholder="Texto do botão"
                                className="h-9 rounded-lg border-paper-3 text-xs"
                              />
                              <div className="flex gap-2">
                                <Input
                                  value={cta.href}
                                  onChange={event =>
                                    setEditor(current => ({
                                      ...current,
                                      ctaLinks: current.ctaLinks.map((item, itemIndex) =>
                                        itemIndex === index
                                          ? { ...item, href: event.target.value }
                                          : item
                                      ),
                                    }))
                                  }
                                  placeholder="/url"
                                  className="h-9 flex-1 rounded-lg border-paper-3 text-[10px]"
                                />
                                <Select
                                  value={cta.variant ?? "primary"}
                                  onValueChange={(value: "primary" | "secondary" | "ghost") =>
                                    setEditor(current => ({
                                      ...current,
                                      ctaLinks: current.ctaLinks.map((item, itemIndex) =>
                                        itemIndex === index
                                          ? { ...item, variant: value }
                                          : item
                                      ),
                                    }))
                                  }
                                >
                                  <SelectTrigger className="h-9 w-24 rounded-lg border-paper-3 text-[10px] bg-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white">
                                    <SelectItem value="primary">Primary</SelectItem>
                                    <SelectItem value="secondary">Secondary</SelectItem>
                                    <SelectItem value="ghost">Ghost</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-9 text-ink-5 hover:text-red-500"
                                  onClick={() =>
                                    setEditor(current => ({
                                      ...current,
                                      ctaLinks: current.ctaLinks.filter((_, itemIndex) => itemIndex !== index),
                                    }))
                                  }
                                >
                                  <Trash2 className="size-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="relations" className="m-0 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-paper-3 pb-4">
                      <Network className="size-5 text-leaf" />
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-ink">Matriz de Relacionamentos</h3>
                        <p className="text-sm text-ink-4">Selecione os conteúdos que pertencem ou devem ser espelhados neste nó.</p>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-4">
                        <Label className="font-bold flex items-center gap-2">Híerarquia <span className="p-1 bg-paper-3 rounded-md text-[10px] font-mono">DB</span></Label>
                        <div className="space-y-5 rounded-3xl border border-paper-3 bg-white p-5">
                          <div className="space-y-2">
                            <Label className="text-xs text-ink-4">Nó Pai (Governança)</Label>
                            <Select
                              value={editor.parentNodeId ? String(editor.parentNodeId) : "none"}
                              onValueChange={value =>
                                setEditor(current => ({
                                  ...current,
                                  parentNodeId: value === "none" ? null : Number(value),
                                }))
                              }
                            >
                              <SelectTrigger className="h-11 rounded-xl border-paper-3 bg-paper-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="none">Sem pai (Nível 0)</SelectItem>
                                {parentOptions.map(option => (
                                  <SelectItem key={option.id} value={String(option.id)}>
                                    {option.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs text-ink-4">IES / Universidade Vinculada</Label>
                            <Select
                              value={
                                editor.universityProfileId
                                  ? String(editor.universityProfileId)
                                  : "none"
                              }
                              onValueChange={value =>
                                setEditor(current => ({
                                  ...current,
                                  universityProfileId:
                                    value === "none" ? null : Number(value),
                                }))
                              }
                            >
                              <SelectTrigger className="h-11 rounded-xl border-paper-3 bg-paper-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="none">Sem universidade</SelectItem>
                                {references?.universities.map(university => (
                                  <SelectItem
                                    key={university.id}
                                    value={String(university.id)}
                                  >
                                    {university.universityName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-1 lg:col-span-2">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <ContentPickerSection
                            title="Blog"
                            items={references?.content.blogPosts ?? []}
                            selectedIds={editor.linkedContent.blogPostIds}
                            onToggle={id => handleToggleContent("blogPostIds", id)}
                          />
                          <ContentPickerSection
                            title="Eventos"
                            items={references?.content.events ?? []}
                            selectedIds={editor.linkedContent.eventIds}
                            onToggle={id => handleToggleContent("eventIds", id)}
                          />
                          <ContentPickerSection
                            title="Artigos"
                            items={references?.content.articles ?? []}
                            selectedIds={editor.linkedContent.articleIds}
                            onToggle={id => handleToggleContent("articleIds", id)}
                          />
                          <ContentPickerSection
                            title="Biblioteca"
                            items={references?.content.materials ?? []}
                            selectedIds={editor.linkedContent.materialIds}
                            onToggle={id => handleToggleContent("materialIds", id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="m-0 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="max-w-2xl space-y-8">
                    <div className="rounded-[2rem] border border-leaf/20 bg-leaf-soft/10 p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <Sparkles className="size-6 text-leaf" />
                        <h3 className="text-xl font-bold text-ink">Publicação e Visibilidade</h3>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-leaf-soft">
                        <div>
                          <p className="font-bold text-ink">Exibir no mapa público</p>
                          <p className="text-xs text-ink-4">O nó aparecerá para todos os visitantes.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={editor.isPublished}
                          onChange={event =>
                            setEditor(current => ({
                              ...current,
                              isPublished: event.target.checked,
                            }))
                          }
                          className="size-6 accent-leaf"
                        />
                      </div>
                    </div>

                    <div className="space-y-6 rounded-[2rem] border border-paper-3 bg-white p-8">
                      <h3 className="font-bold text-ink flex items-center gap-2">
                        <Network className="size-4 text-ink-4" />
                        Metadados Legados e SEO
                      </h3>
                      
                      <div className="space-y-2">
                        <Label>Legacy Hub Label (Mapeamento Antigo)</Label>
                        <Input
                          value={editor.legacyHubLabel}
                          onChange={event =>
                            setEditor(current => ({ ...current, legacyHubLabel: event.target.value }))
                          }
                          placeholder="Ex: Campinas (Região)"
                          className="h-11 rounded-xl border-paper-3 bg-paper-2"
                        />
                        <p className="text-[10px] text-ink-5">Utilizado para sincronização com sistemas que ainda não utilizam o ID relacional.</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
                        <strong>Aviso:</strong> A alteração do slug pode quebrar links externos que apontam diretamente para este hub. Verifique se há redirecionamentos necessários.
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
