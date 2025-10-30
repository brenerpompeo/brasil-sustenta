import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Pronto para Gerar Impacto?
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Seja você uma empresa buscando soluções sustentáveis ou um talento
            querendo fazer a diferença, o Brasil Sustenta é o seu próximo passo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black font-semibold px-10 py-6 text-lg"
            >
              Sou Empresa
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-foreground text-foreground hover:bg-muted font-semibold px-10 py-6 text-lg"
            >
              Sou Jovem Talento
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
