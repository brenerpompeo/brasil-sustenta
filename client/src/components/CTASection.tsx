import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const CTASection = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-[--leaf] pb-32 pt-40 text-black">
      {/* Dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[100rem] px-8 lg:px-24">
        <div className="flex flex-col items-end justify-between gap-16 lg:flex-row">
          {/* Massive provocative headline */}
          <h2 className="font-display text-7xl font-black leading-[0.75] tracking-tighter sm:text-[8rem] lg:text-[14rem]">
            Não é
            <br />
            Caridade.
            <br />
            <span className="opacity-30">É Infra.</span>
          </h2>

          {/* Right column: manifesto + CTA */}
          <div className="max-w-xl mb-12">
            <p className="mb-12 font-display text-2xl font-black italic leading-[1.1] md:text-4xl">
              Sustentabilidade sem viabilidade econômica é ficção poética.
            </p>
            <p className="mb-16 font-body text-lg font-bold uppercase tracking-tighter md:text-xl">
              O Brasil Sustenta transforma a biocapacidade e o talento brasileiro em um ativo financeiro
              auditável e soberano.
            </p>

            {/* Portal CTAs */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/para-jovens"
                className="group flex h-32 flex-col justify-center border border-black/20 p-8 transition-all hover:bg-black hover:text-[--leaf]"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
                  01 // TALENTO
                </span>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-xl font-black">Submeter Node</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </div>
              </Link>
              <Link
                href="/para-empresas"
                className="group flex h-32 flex-col justify-center border border-black/20 p-8 transition-all hover:bg-black hover:text-[--sun]"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
                  02 // EMPRESA
                </span>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-xl font-black">Deploy Squad</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
