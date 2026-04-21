import { useState } from "react";

import TerritoryMap from "@/components/TerritoryMap";
import TerritoryNodeDialog from "@/components/TerritoryNodeDialog";
import { trpc } from "@/lib/trpc";

const RegionalMap = ({ compact = false }: { compact?: boolean }) => {
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

  return (
    <>
      <TerritoryMap
        className={compact ? "min-h-[420px]" : undefined}
        data={mapQuery.data}
        isLoading={mapQuery.isLoading}
        selectedSlug={selectedSlug}
        onSelectSlug={slug => {
          setSelectedSlug(slug);
          setDialogOpen(true);
        }}
      />

      <TerritoryNodeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        detail={detailQuery.data}
        isLoading={detailQuery.isLoading}
      />
    </>
  );
};

export default RegionalMap;
