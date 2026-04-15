import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { TerminalSquare, ShieldAlert, Cpu, Globe, ArrowRight, Network } from 'lucide-react';
import { Link } from 'wouter';

export default function Manifesto() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <SEO
        title="Manifesto Brasil Sustenta | Criatividade, ESG e ODS"
        description="Nosso manifesto sobre a união da Economia Criativa com os Objetivos de Desenvolvimento Sustentável. Transformando cultura em infraestrutura real."
      />
      <Header />

      {/* Hero Section - High Impact Editorial Brutalism */}
      <section className="relative pt-32 pb-20 border-b border-foreground">
        <div className="container relative z-10 px-6 max-w-screen-xl mx-auto">
          <div className="max-w-5xl">
            <div className="inline-flex items-center px-3 py-1 border border-foreground bg-foreground mb-12">
              <span className="font-mono-tech text-[10px] font-bold tracking-[0.4em] uppercase text-background">/ MANIFESTO_ROOT</span>
            </div>

            <h1 className="font-display text-5xl md:text-8xl lg:text-[7rem] font-bold leading-[0.85] tracking-tight mb-12 uppercase text-foreground">
              O FUTURO NÃO É <br />
              <span className="italic font-light opacity-80">CARIDADE.</span> <br />
              TEM QUE SER <span className="underline decoration-foreground border-b-8 border-foreground">SISTÊMICO.</span>
            </h1>

            <p className="max-w-3xl text-sm md:text-base text-foreground font-mono-tech uppercase tracking-widest leading-relaxed border-l-4 border-foreground pl-6">
              [CRITICAL_STATEMENT]: NÃO EXISTE FUTURO VIÁVEL SEM IMPACTO MENSURÁVEL. NO BRASIL SUSTENTA, ACREDITAMOS QUE A ECONOMIA CRIATIVA É O MOTOR DEFINITIVO PARA A REGENERAÇÃO GLOBAL E RESOLUÇÃO DOS 18_ODS.
            </p>
          </div>
        </div>
      </section>

      {/* The Crisis - Brutalist Split Grid */}
      <section className="border-b border-foreground bg-secondary/20">
        <div className="grid lg:grid-cols-2 border-b border-foreground">
          <div className="p-8 md:p-16 border-r border-foreground flex justify-center flex-col">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-8 uppercase">A Crise da <br /><span className="italic">Superficialidade</span>.</h2>
            <div className="space-y-6 font-mono-tech text-xs uppercase leading-relaxed text-muted-foreground">
              <p>
                &gt; O MUNDO CORPORATIVO ESTÁ SATURADO DE RELATÓRIOS FRIOS.
              </p>
              <p>
                &gt; O <span className="text-foreground">GREENWASHING</span> TORNOU-SE UMA NÉVOA QUE ENFRAQUECE MERCADOS. O SETOR CRIATIVO É DESPERDIÇADO EM PUBLICIDADE QUANDO DEVERIA ESTAR DESENHANDO INFRAESTRUTURAS.
              </p>
              <p>
                &gt; ESSA DESCONEXÃO É O QUE IMPEDE A MUDANÇA SISTÊMICA. ESG NÃO PODE SER APENAS UMA PLANILHA; ELE PRECISA SER UMA ESTRUTURA VIVA, AUDITADA E AUTÊNTICA. FORMATAMOS O CAOS CRIATIVO EM DADOS DE IMPACTO.
              </p>
            </div>
          </div>
          <div className="bg-foreground text-background p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
            {/* Huge background text */}
            <div className="absolute top-1/2 left-1/2 -transform -translate-x-1/2 -translate-y-1/2 text-[20rem] font-display opacity-10">?</div>
            <div className="relative z-10 text-center max-w-sm">
              <ShieldAlert className="w-16 h-16 mx-auto mb-8 text-primary" />
              <h3 className="font-mono-tech text-xl tracking-widest uppercase mb-4 text-primary">IMPACTO SEM ARQUITETURA É INVISÍVEL.</h3>
              <p className="font-sans text-sm text-balance text-background/70">As grandes companhias precisam do olhar disruptivo para sobreviverem às metas de 2030.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Industrial Pillars */}
      <section className="py-20 bg-background border-b border-foreground">
        <div className="container px-6 max-w-screen-xl mx-auto">
          <div className="mb-16 border-b border-foreground pb-6">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter uppercase mb-2">TESE DE <span className="italic opacity-80">VALOR</span>.</h2>
            <p className="font-mono-tech text-xs tracking-widest text-muted-foreground uppercase">Transformando talento em ativo de auditoria e regeneração.</p>
          </div>

          <div className="grid md:grid-cols-3 border border-foreground">
            <div className="p-8 border-b md:border-b-0 md:border-r border-foreground hover:bg-secondary transition-colors">
              <TerminalSquare className="w-8 h-8 text-foreground mb-8" />
              <h3 className="font-mono-tech text-sm tracking-widest uppercase font-bold mb-4">AUDITORIA // CRIATIVA</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">Verificamos projetos de design, tech e inovação estritamente sob a lente dos 18 Objetivos de Desenvolvimento Sustentável da ONU, adotando o contexto brasileiro de igualdade.</p>
            </div>

            <div className="p-8 border-b md:border-b-0 md:border-r border-foreground hover:bg-secondary transition-colors bg-secondary/30">
              <Network className="w-8 h-8 text-foreground mb-8" />
              <h3 className="font-mono-tech text-sm tracking-widest uppercase font-bold mb-4">QUÁDRUPLA // HÉLICE</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">Orquestramos uma matriz ganha-ganha onde Academia (IES), Estado (B2G), Indústria (B2B) e Sociedade Civil (Talentos) colaboram para inovar.</p>
            </div>

            <div className="p-8 hover:bg-secondary transition-colors">
              <Cpu className="w-8 h-8 text-primary mb-8" />
              <h3 className="font-mono-tech text-sm tracking-widest uppercase font-bold mb-4 text-primary">VALOR // COMPARTILHADO</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">Geramos lucro que constrói. Quando a força criativa atua num sistema ESG corporativo, ela regenera a sua vida e a economia local.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement Section: Raw Typography */}
      <section className="py-32 bg-primary text-primary-foreground border-b border-foreground">
        <div className="container px-6 text-center">
          <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight max-w-5xl mx-auto leading-[0.85] uppercase">
            "A MENTE INOVADORA É A ÚLTIMA VANTAGEM COMPETITIVA QUE <span className="italic underline decoration-foreground underline-offset-8">REGENERA</span> O PLANETA."
          </h2>
          <div className="mt-12 font-mono-tech text-xs tracking-widest uppercase opacity-80 border border-primary-foreground inline-block px-4 py-2">
            STATEMENT_OF_PURPOSE [1.0]
          </div>
        </div>
      </section>

      {/* Call to Action Grid */}
      <section className="py-24 bg-background">
        <div className="container px-6 max-w-screen-xl mx-auto text-center flex flex-col items-center">

          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter max-w-2xl mx-auto mb-16 uppercase">
            FAÇA PARTE DESTA <span className="italic">OPERAÇÃO</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-foreground w-full max-w-3xl">
            <Link href="/login/empresa">
              <div className="p-10 border-b md:border-b-0 md:border-r border-foreground cursor-pointer group hover:bg-foreground hover:text-background transition-colors flex flex-col items-center justify-center">
                <span className="font-mono-tech text-sm tracking-widest uppercase font-bold mb-2">&gt; SOU EMPRESA</span>
                <span className="font-sans text-xs opacity-60">Escalar ESG via Talento</span>
              </div>
            </Link>
            <Link href="/login/talento">
              <div className="p-10 cursor-pointer group hover:bg-primary hover:text-primary-foreground transition-colors flex flex-col items-center justify-center">
                <span className="font-mono-tech text-sm tracking-widest uppercase font-bold mb-2">&gt; SOU TALENTO</span>
                <span className="font-sans text-xs opacity-60">Resolver Problemas Mapeados</span>
              </div>
            </Link>
          </div>

          <Link href="/">
            <button className="mt-12 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground inline-flex items-center transition-colors">
              &lt; RETURN_ROOT
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
