import { ArrowUpRight, Building2, GraduationCap, MapPin, Network, Orbit, Workflow } from "lucide-react";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  mapNodeStatusLabels,
  mapNodeTypeLabels,
  territoryColorClasses,
  type MapNodeDetail,
} from "@shared/territory";

type TerritoryNodeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail?: MapNodeDetail | null;
  isLoading?: boolean;
};

function EmptyState({ isLoading }: { isLoading?: boolean }) {
  return (
    <div className="grid gap-6 py-8">
      <div className="space-y-3">
        <div className="h-5 w-28 rounded-full bg-[color:var(--color-paper-3)]" />
        <div className="h-10 w-3/4 rounded-2xl bg-[color:var(--color-paper-2)]" />
        <div className="h-4 w-full rounded-full bg-[color:var(--color-paper-2)]" />
        <div className="h-4 w-5/6 rounded-full bg-[color:var(--color-paper-2)]" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-28 rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-paper-2)]",
              isLoading && "animate-pulse"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function TerritoryNodeDialog({
  open,
  onOpenChange,
  detail,
  isLoading = false,
}: TerritoryNodeDialogProps) {
  const palette = territoryColorClasses[detail?.colorToken ?? "leaf"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-[color:var(--color-border)] bg-[color:var(--color-paper)] p-0 sm:max-w-[940px]">
        {detail ? (
          <>
            <DialogHeader
              className="border-b border-[color:var(--color-border)] p-7 md:p-9"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(237,231,220,0.92))",
              }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full border px-3 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.22em]"
                  style={{
                    color: palette.text,
                    borderColor: palette.border,
                    background: palette.surface,
                  }}
                >
                  {detail.badge ?? mapNodeTypeLabels[detail.nodeType]}
                </span>
                <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                  {mapNodeStatusLabels[detail.status]}
                </span>
              </div>

              <DialogTitle className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[0.94] tracking-[-0.045em] text-[color:var(--color-ink)]">
                {detail.name}
              </DialogTitle>

              <DialogDescription className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--color-ink-3)]">
                {detail.longDescription || detail.shortDescription}
              </DialogDescription>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-[color:var(--color-ink-3)]">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-[color:var(--color-ink-4)]" />
                  {[detail.cityName, detail.stateCode].filter(Boolean).join(", ")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Orbit className="size-4 text-[color:var(--color-ink-4)]" />
                  {mapNodeTypeLabels[detail.nodeType]}
                </span>
              </div>
            </DialogHeader>

            <div className="grid gap-8 p-7 md:grid-cols-[1.35fr_0.9fr] md:p-9">
              <div className="space-y-8">
                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <Building2 className="size-4 text-[color:var(--color-ink-4)]" />
                    <h3 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                      Visão geral
                    </h3>
                  </div>
                  <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-6">
                    <p className="text-sm leading-7 text-[color:var(--color-ink-3)]">
                      {detail.shortDescription || detail.longDescription}
                    </p>
                  </div>
                </section>

                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <Workflow className="size-4 text-[color:var(--color-ink-4)]" />
                    <h3 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                      Conteúdos relacionados
                    </h3>
                  </div>

                  <div className="grid gap-4">
                    {detail.relatedContent.length ? (
                      detail.relatedContent.map(group => (
                        <article
                          key={group.kind}
                          className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-white p-5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[color:var(--color-ink)]">
                              {group.label}
                            </h4>
                            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                              {group.items.length} item(ns)
                            </span>
                          </div>

                          <div className="mt-5 grid gap-3">
                            {group.items.slice(0, 4).map(item => (
                              <a
                                key={`${group.kind}-${item.id}`}
                                href={item.href}
                                className="flex items-center justify-between gap-4 rounded-[1rem] border border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] px-4 py-3 transition hover:border-black/20 hover:bg-white"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-[color:var(--color-ink)]">
                                    {item.title}
                                  </p>
                                  {item.meta ? (
                                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[color:var(--color-ink-4)]">
                                      {item.meta}
                                    </p>
                                  ) : null}
                                </div>
                                <ArrowUpRight className="size-4 flex-shrink-0 text-[color:var(--color-ink-4)]" />
                              </a>
                            ))}
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="rounded-[1.5rem] border border-dashed border-[color:var(--color-border)] bg-white p-6 text-sm leading-7 text-[color:var(--color-ink-4)]">
                        Ainda não há conteúdos vinculados a este nó territorial.
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <Network className="size-4 text-[color:var(--color-ink-4)]" />
                    <h3 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                      Métricas
                    </h3>
                  </div>
                  <div className="grid gap-4">
                    {detail.metrics.length ? (
                      detail.metrics.map(metric => (
                        <div
                          key={`${metric.label}-${metric.value}`}
                          className="rounded-[1.5rem] border border-[color:var(--color-border)] p-5"
                          style={{ background: palette.surface }}
                        >
                          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                            {metric.label}
                          </p>
                          <p className="mt-2 font-display text-4xl font-bold tracking-[-0.04em] text-[color:var(--color-ink)]">
                            {metric.value}
                          </p>
                          {metric.note ? (
                            <p className="mt-2 text-xs leading-5 text-[color:var(--color-ink-3)]">
                              {metric.note}
                            </p>
                          ) : null}
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[1.5rem] border border-dashed border-[color:var(--color-border)] bg-white p-5 text-sm text-[color:var(--color-ink-4)]">
                        Este nó ainda não possui métricas cadastradas.
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin className="size-4 text-[color:var(--color-ink-4)]" />
                    <h3 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                      Conexões territoriais
                    </h3>
                  </div>
                  <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-5">
                    <div className="space-y-4">
                      <div>
                        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                          Nó pai
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[color:var(--color-ink)]">
                          {detail.parent ? detail.parent.name : "Estrutura raiz"}
                        </p>
                      </div>

                      <div>
                        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                          Nós conectados
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {detail.children.length ? (
                            detail.children.map(child => (
                              <span
                                key={child.slug}
                                className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] px-3 py-1 text-xs font-semibold text-[color:var(--color-ink-3)]"
                              >
                                {child.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-[color:var(--color-ink-4)]">
                              Sem conexões filhas no momento.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <GraduationCap className="size-4 text-[color:var(--color-ink-4)]" />
                    <h3 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                      Universidade vinculada
                    </h3>
                  </div>
                  <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-5 text-sm leading-7 text-[color:var(--color-ink-3)]">
                    {detail.university ? (
                      <>
                        <p className="font-semibold text-[color:var(--color-ink)]">
                          {detail.university.name}
                          {detail.university.acronym
                            ? ` (${detail.university.acronym})`
                            : ""}
                        </p>
                        <p className="mt-1">
                          {[detail.university.city, detail.university.state]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </>
                    ) : (
                      "Nenhuma universidade específica está conectada diretamente a este nó."
                    )}
                  </div>
                </section>

                {detail.ctaLinks.length ? (
                  <section className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-5">
                    <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                      Ações
                    </p>
                    <div className="mt-4 grid gap-3">
                      {detail.ctaLinks.map((cta, index) => (
                        <Button
                          key={`${cta.href}-${index}`}
                          asChild
                          variant={
                            cta.variant === "secondary"
                              ? "outline"
                              : cta.variant === "ghost"
                                ? "ghost"
                                : "default"
                          }
                          size="lg"
                          className="w-full justify-between"
                        >
                          <Link href={cta.href}>
                            {cta.label}
                            <ArrowUpRight className="size-4" />
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <div className="p-7 md:p-9">
            <DialogHeader className="sr-only">
              <DialogTitle>Ficha territorial</DialogTitle>
            </DialogHeader>
            <EmptyState isLoading={isLoading} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TerritoryNodeDialog;
