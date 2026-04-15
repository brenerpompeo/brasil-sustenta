import { ArrowRight, Building2, GraduationCap, School2 } from 'lucide-react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container px-6 lg:px-8 max-w-[900px] mx-auto relative z-10">
        <div className="text-center animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40 mb-6">Escolha sua entrada</div>
          
          <h2 className="font-display text-[2.5rem] md:text-[4rem] font-bold text-foreground leading-[1.05] mb-8 tracking-tighter">
            A proposta e uma so.<br /><span className="italic font-light text-primary">a porta muda por buyer</span>.
          </h2>

          <p className="text-[1.125rem] text-muted-foreground font-medium mb-12 max-w-xl mx-auto">
            Empresas compram execucao, universidades ativam extensao e talentos entram em projetos reais. A experiencia ja comeca segmentada.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            <Card className="rounded-[1.5rem] border-border bg-card text-left shadow-sm">
              <CardContent className="p-6">
                <Building2 className="mb-5 h-6 w-6 text-primary" />
                <h3 className="mb-2 font-display text-2xl font-bold tracking-tight text-foreground">Empresa</h3>
                <p className="mb-6 text-sm font-medium leading-7 text-muted-foreground">
                  Publicar desafio, ver shortlist com fit score e acompanhar entrega.
                </p>
                <Link href="/login/empresa" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary">
                  Entrar como empresa <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-[1.5rem] border-border bg-card text-left shadow-sm">
              <CardContent className="p-6">
                <School2 className="mb-5 h-6 w-6 text-primary" />
                <h3 className="mb-2 font-display text-2xl font-bold tracking-tight text-foreground">Universidade</h3>
                <p className="mb-6 text-sm font-medium leading-7 text-muted-foreground">
                  Ativar extensao com dados, visibilidade institucional e conexao com empresas.
                </p>
                <Link href="/login/universidade" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary">
                  Entrar como IES <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-[1.5rem] border-border bg-card text-left shadow-sm">
              <CardContent className="p-6">
                <GraduationCap className="mb-5 h-6 w-6 text-primary" />
                <h3 className="mb-2 font-display text-2xl font-bold tracking-tight text-foreground">Talento</h3>
                <p className="mb-6 text-sm font-medium leading-7 text-muted-foreground">
                  Construir portfolio, entrar em squads e ganhar experiencia observavel.
                </p>
                <Link href="/login/jovem" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary">
                  Entrar como talento <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
