import { useMemo, useState } from "react";
import {
  ArrowRight,
  Book,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Globe,
  Library,
  Play,
  Podcast,
  Search,
  Video,
} from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

const Biblioteca = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFormat, setActiveFormat] = useState("Todos");

  const { data: materialsData, isLoading } = trpc.material.getLatest.useQuery({
    limit: 48,
  });

  const formats = [
    "Todos",
    "Video",
    "Ebook",
    "Infografico",
    "Podcast",
    "Toolkit",
  ];

  const filteredMaterials = useMemo(() => {
    return (materialsData || []).filter((material: any) => {
      const matchesSearch =
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (material.description &&
          material.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
      const matchesFormat =
        activeFormat === "Todos" ||
        material.materialType.toLowerCase() === activeFormat.toLowerCase();

      return matchesSearch && matchesFormat;
    }) as any[];
  }, [activeFormat, materialsData, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-leaf" />
      </div>
    );
  }

  const getFormatIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "ebook":
        return <Book className="h-4 w-4" />;
      case "podcast":
        return <Podcast className="h-4 w-4" />;
      default:
        return <Library className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper font-body selection:bg-leaf-3 selection:text-leaf">
      <Header />

      <section className="editorial-stage relative overflow-hidden border-y border-paper-3 pt-36 pb-[4.5rem]">
        <div className="absolute top-0 left-1/2 h-px w-[min(1100px,92vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-paper-4 to-transparent" />
        <div className="absolute top-0 right-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(46,91,255,0.12)_0%,_transparent_72%)] blur-3xl" />

        <div className="container relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="editorial-kicker mb-4">Recursos e aceleração</div>
              <h1 className="mb-8 text-6xl leading-[0.84] tracking-[-0.06em] text-ink md:text-8xl">
                Biblioteca{" "}
                <span className="font-light text-ink-4">Brasil Sustenta</span>.
              </h1>
              <p className="max-w-2xl text-xl font-medium leading-relaxed text-ink-3 md:text-2xl">
                Acesse gratuitamente um acervo de guias, videoaulas e toolkits
                para liderar a transição sustentável com repertório prático.
              </p>
            </div>

            <div className="editorial-panel rounded-[2rem] border border-paper-3/80 bg-white/95 p-5 shadow-[0_18px_42px_rgba(5,5,5,0.04)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky/15 bg-sky-5 text-sky-1">
                  <Library className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-ink-4">
                    Curadoria
                  </p>
                  <p className="text-sm font-semibold text-ink">
                    Pesquisa guiada por formato
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-4 transition-colors group-focus-within:text-sky-1" />
                  <input
                    type="text"
                    placeholder="O que você quer aprender hoje?"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="h-12 w-full rounded-[1.15rem] border border-paper-3 bg-paper px-11 pr-4 text-sm font-semibold text-ink outline-none transition-all focus:border-sky/20 focus:bg-white focus:ring-[3px] focus:ring-sky-5"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {formats.map(format => (
                    <button
                      key={format}
                      onClick={() => setActiveFormat(format)}
                      className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] transition-all ${
                        activeFormat === format
                          ? "border-ink bg-ink text-white shadow-[0_10px_24px_rgba(5,5,5,0.12)]"
                          : "border-paper-3 bg-paper text-ink-4 hover:border-sky/20 hover:bg-sky-5 hover:text-sky-1"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container">
          {filteredMaterials.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
              {filteredMaterials.map(material => (
                <div
                  key={material.id}
                  className="editorial-card group relative flex h-full flex-col rounded-[2.2rem] p-5"
                >
                  <div className="relative mb-5 aspect-video overflow-hidden rounded-[1.6rem] border border-paper-3 bg-paper-2">
                    <img
                      src={
                        material.coverImage ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                      }
                      alt={material.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-ink/22 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-500 group-hover:scale-100">
                        {material.materialType === "video" ? (
                          <Play className="ml-0.5 h-5 w-5 fill-ink text-ink" />
                        ) : (
                          <Eye className="h-5 w-5 text-ink" />
                        )}
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 rounded-full border border-white/60 bg-white/92 px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-ink shadow-sm backdrop-blur-md">
                      {material.materialType}
                    </div>
                  </div>

                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-paper-3 bg-paper px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-ink-4">
                      {getFormatIcon(material.materialType)}
                      {material.materialType}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-ink-4">
                      <Clock className="h-3.5 w-3.5" />
                      {material.duration || "Livre"}
                    </div>
                  </div>

                  <h3 className="mb-3 flex-1 text-[1.45rem] font-black leading-[1.08] tracking-[-0.04em] text-ink transition-colors group-hover:text-sky-1">
                    {material.title}
                  </h3>

                  <p className="mb-6 text-sm font-medium leading-7 text-ink-3">
                    {material.description ||
                      "Domine conceitos essenciais com este recurso prático curado por nosso time."}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-paper-3 pt-5">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-ink-4">
                      <Globe className="h-3.5 w-3.5 text-sky-1" />
                      Global
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-10 rounded-full px-4 text-[10px] font-black uppercase tracking-[0.22em] text-sky-1 hover:bg-sky-5"
                    >
                      Acessar
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-4xl rounded-[3rem] border border-paper-3 bg-white px-8 py-24 text-center shadow-sm">
              <Library className="mx-auto mb-6 h-16 w-16 text-ink-4/30" />
              <h3 className="mb-2 text-2xl font-black text-ink">
                Acervo em expansão.
              </h3>
              <p className="mx-auto max-w-md text-base font-medium text-ink-4">
                Estamos digitalizando novos conteúdos. Tente buscar por outros
                termos ou formatos.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFormat("Todos");
                }}
                variant="outline"
                className="mt-8 rounded-full border-paper-3 text-[11px] font-black uppercase tracking-[0.22em]"
              >
                Limpar busca
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-paper-3 bg-white py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[3rem] bg-ink px-8 py-10 shadow-[0_30px_80px_rgba(5,5,5,0.12)] lg:px-14 lg:py-14">
            <div className="absolute top-0 right-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(0,255,133,0.12)_0%,_transparent_72%)] blur-3xl" />
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.6rem] border border-white/12 bg-white/8 lg:mx-0">
                  <Download className="h-8 w-8 text-white" />
                </div>

                <div className="space-y-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/45">
                    Curadoria mensal
                  </p>
                  <h2 className="mb-0 text-4xl leading-[0.92] text-white md:text-6xl">
                    Toolkit{" "}
                    <span className="font-light text-white/50">gratuito</span>.
                  </h2>
                  <p className="max-w-xl text-lg font-medium text-white/70">
                    Receba a seleção mais útil de materiais, resumos e
                    videoaulas para acelerar projetos e conversas de impacto.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white/35" />
                    Sem spam
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white/35" />
                    Conteúdo auditado
                  </div>
                </div>
              </div>

              <div className="rounded-[2.2rem] bg-white p-6 shadow-[0_18px_42px_rgba(5,5,5,0.16)] lg:p-8">
                <h4 className="mb-3 text-lg font-black text-ink">
                  Comece agora mesmo
                </h4>
                <p className="mb-6 text-sm font-medium leading-7 text-ink-3">
                  Entre na lista para receber novos materiais assim que forem
                  liberados.
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Seu email institucional"
                    className="h-12 w-full rounded-[1.15rem] border border-paper-3 bg-paper px-5 text-sm font-semibold text-ink outline-none transition-all focus:border-sky/20 focus:bg-white focus:ring-[3px] focus:ring-sky-5"
                  />
                  <Button className="h-12 w-full rounded-[1.15rem] bg-ink text-[11px] font-black uppercase tracking-[0.22em] text-white hover:bg-ink-2">
                    Quero meus recursos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Biblioteca;
