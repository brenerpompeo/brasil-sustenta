import { Target, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10 px-4 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Transforme o Potencial.</span>
              <br />
              <span className="text-primary">Impulse o Impacto.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Conectamos empresas a jovens talentos para projetos de
            sustentabilidade e inovação, criando um futuro mais verde.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-6 text-lg"
            >
              Para Empresas
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-muted-foreground text-foreground hover:bg-muted font-semibold px-8 py-6 text-lg"
            >
              Para Jovens
            </Button>
          </div>

          {/* Icon Features */}
          <div className="flex items-center justify-center gap-8 pt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <div className="flex flex-col items-center space-y-2 group">
              <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-all duration-300">
                <Target className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-all duration-300">
                <Users className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-all duration-300">
                <Globe className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
