import { SEO } from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Network, MapPin, Users, Globe2, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Comunidade() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <SEO 
        title="Comunidade Brasil Sustenta | Seja a Revolução Local"
        description="Junte-se à revolução ESG. Candidate-se para ser um Representante Local, crie um HUB na sua universidade ou participe como Voluntário Educacional."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-border">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -ms-32 w-96 h-96 bg-[#26BDE2]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container relative z-10 px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-border rounded-full text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6">
              <Network className="w-3.5 h-3.5 text-primary" />
              Mobilização de Base (Grassroots)
            </div>
            
            <h1 className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-bold leading-[1.05] tracking-tighter mb-8">
              A revolução ambiental <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#26BDE2]">
                começa no nível local.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed mb-10 max-w-2xl">
              Existimos para que a transição corporativa sustentável seja transparente, massiva e descentralizada. 
              Atuamos através de voluntários, estudantes e líderes regionais que transformam suas realidades locais.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#embaixadores" className="bg-primary text-black font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
                Quero ser Representante
              </a>
              <a href="#hubs" className="bg-white/5 border border-border text-foreground font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
                 Criar um HUB
                 <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Action Grid (Fashion Rev Inspired) */}
      <section className="py-24 relative z-10" id="embaixadores">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-[2rem] sm:text-[2.75rem] font-bold">Junte-se à linha de frente</h2>
            <p className="text-muted-foreground mt-4 text-[1.1rem]">
              Saiba como você pode ativar a nossa rede na sua cidade ou instituição.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Representantes Locais</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Para representar sua cidade: participe do chamado para Representantes Locais. As inscrições abrem uma vez por ano. Seja a ponte oficial entre o Brasil Sustenta e as empresas da sua região.
              </p>
              <button className="text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                Aplicar agora <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-colors group" id="hubs">
              <div className="w-14 h-14 rounded-2xl bg-[#26BDE2]/10 flex items-center justify-center mb-6 group-hover:bg-[#26BDE2]/20 transition-colors">
                <GraduationCap className="w-7 h-7 text-[#26BDE2]" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Voluntariado Educacional (HUBs)</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Para estudantes e docentes: Inscreva-se para criar um núcleo (HUB) de tecnologia sustentável dentro do seu polo universitário. Treine seu esquadrão localmente.
              </p>
              <button className="text-[#26BDE2] font-bold text-sm tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                Criar Núcleo <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-colors group" id="voluntarios">
              <div className="w-14 h-14 rounded-2xl bg-[#4C9F38]/10 flex items-center justify-center mb-6 group-hover:bg-[#4C9F38]/20 transition-colors">
                <Users className="w-7 h-7 text-[#4C9F38]" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Apoio em Eventos</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A principal oportunidade para apoiar o movimento sazonalmente em mutirões de inovação locais focados na Agenda 2030 (ODS). Ajude a executar nossos hackathons ESG.
              </p>
              <button className="text-[#4C9F38] font-bold text-sm tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                Ver Agenda <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Manifest */}
      <section className="py-24 bg-paper relative overflow-hidden border-t-2 border-border shadow-2xl">
         <div className="container px-6 lg:px-8 max-w-[1000px] mx-auto text-center relative z-10">
            <Globe2 className="w-16 h-16 text-primary mx-auto mb-8 opacity-20" />
            <h2 className="font-serif text-[1.5rem] sm:text-[2rem] font-light leading-relaxed text-foreground/90 italic">
               "Somos desenvolvedores, gestores, estudantes e consumidores. Somos a academia, os escritores, líderes de negócios, as marcas e os decisores políticos. Somos a indústria e o público. Somos o ecossistema local. Nós somos a transição."
            </h2>
            <div className="mt-12 flex justify-center">
               <a href="/login/jovem" className="bg-foreground text-background font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                 Assinar o Manifesto <BookOpen className="w-4 h-4" />
               </a>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
