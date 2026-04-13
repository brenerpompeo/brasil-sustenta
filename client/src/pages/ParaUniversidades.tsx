import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { 
  School, 
  Award,
  Briefcase,
  Target,
  ChevronDown,
  Loader2,
  CheckCircle2,
  Handshake,
  Globe,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

import { SEO } from '@/components/SEO';

export default function ParaUniversidades() {
  // FAQ State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Partnership Form State
  const [partnershipSubmitted, setPartnershipSubmitted] = useState(false);
  const [partnershipForm, setPartnershipForm] = useState({
    universityName: '',
    cnpj: '',
    state: '',
    city: '',
    website: '',
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: '',
    studentsCount: '',
    coursesOffered: '',
    message: '',
  });

  const partnershipMutation = trpc.student.requestPartnership.useMutation({
    onSuccess: () => {
      setPartnershipSubmitted(true);
      toast.success('Solicitação enviada com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao enviar solicitação');
    },
  });

  const handlePartnershipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnershipForm.universityName || !partnershipForm.contactName || !partnershipForm.contactEmail) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    partnershipMutation.mutate(partnershipForm);
  };

  const faqData = [
    {
      question: 'Quais são os benefícios da parceria?',
      answer: 'Universidades parceiras oferecem aos alunos acesso prioritário a oportunidades remuneradas, eventos exclusivos, workshops com empresas, networking qualificado e certificações reconhecidas no mercado.',
    },
    {
      question: 'Como funciona o modelo de convênio?',
      answer: 'O convênio é gratuito e não envolve custos para a universidade. Assinamos um termo de parceria e passamos a conectar seus estudantes a projetos reais de impacto.',
    },
    {
      question: 'A universidade precisa fazer alguma gestão?',
      answer: 'Não! A Brasil Sustenta cuida de toda a gestão de squads, seleção e acompanhamento técnico.',
    },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
      <SEO 
        title="Para Universidades | Hubs de Inovação para a Economia Regenerativa"
        description="Transforme sua IES em um polo de talentos para a nova economia. Projetos de extensão baseados em squads criativos e impacto real nos ODS."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 flex items-center justify-center overflow-hidden border-b border-border">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,var(--tw-gradient-from)_0%,transparent_70%)] from-primary/10 via-transparent to-transparent opacity-50"></div>

        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
             <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in shadow-sm">
                <School className="w-3.5 h-3.5 fill-current" />
                <span>Alianças Estratégicas e Extensão</span>
             </div>
             
             <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-[0.95] tracking-tighter mb-8 animate-fade-in-up">
                Hubs de <span className="text-primary italic font-serif font-light text-glow-emerald">Inovação</span><br />
                para uma Economia <span className="underline decoration-primary/30 underline-offset-8">Regenerativa</span>.
             </h1>
             
             <p className="text-[1.125rem] text-muted-foreground font-medium mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                O **Brasil Sustenta** conecta a academia ao core business das marcas globais. Transforme o conhecimento em <span className="text-foreground">Impacto ODS</span> auditável e squads criativos de alto desempenho.
             </p>

             <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up delay-200">
                <Button 
                   size="lg" 
                   className="h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                   onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                   Solicitar Parceria Formal
                   <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link href="/login/universidade">
                   <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl border border-border text-foreground bg-secondary/50 backdrop-blur-sm font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 hover:border-primary/30 transition-all">
                      Painel do Parceiro
                   </Button>
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Institutional Value Bento Grid */}
      <section className="py-24 bg-secondary/5 border-b border-border">
        <div className="container max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
               <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tighter text-foreground mb-6">
                 Arquitetura de <span className="italic font-serif font-light text-primary text-center text-glow-emerald">Talento</span>. <br />Impacto Sistêmico.
               </h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-card border border-border px-4 py-2 rounded-xl h-fit">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Impacto Mensurável
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-card border border-border rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-primary/30 transition-all shadow-sm">
                <div className="relative z-10">
                   <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-8 border border-border group-hover:bg-primary/10 transition-colors">
                      <Briefcase className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                   </div>
                   <h3 className="font-display text-3xl font-bold tracking-tighter text-foreground mb-4">Empregabilidade e Carreira</h3>
                   <p className="text-muted-foreground font-medium text-lg max-w-lg leading-relaxed">
                      Mais de 30% dos alunos que participam dos squads são efetivados. Transforme sua taxa de empregabilidade através de experiência prática em projetos de ponta.
                   </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-full bg-primary/5 skew-x-[-15deg] translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="md:col-span-4 bg-primary text-black rounded-[2.5rem] p-10 shadow-2xl shadow-primary/30 flex flex-col">
                <div className="w-14 h-14 bg-black/10 rounded-2xl flex items-center justify-center mb-8 border border-black/20">
                   <Award className="w-7 h-7 text-black" />
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tighter mb-4 leading-tight">Certificações de Mercado</h3>
                <p className="text-black/80 font-medium mb-6">Validação de horas complementares e competências alinhadas aos ODS.</p>
                <div className="mt-auto pt-6 border-t border-black/10 flex items-center justify-between text-black">
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Reconhecido pela ONU</span>
                   <ShieldCheck className="w-5 h-5 opacity-90" />
                </div>
            </div>

            <div className="md:col-span-4 bg-card border border-border rounded-[2.5rem] p-10 group hover:border-primary/30 transition-all shadow-sm">
                <div className="w-14 h-14 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-8">
                   <Handshake className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tighter text-foreground mb-4">Conexão Corporativa</h3>
                <p className="text-muted-foreground font-medium">Sua universidade em contato direto com as maiores empresas através de convênios estratégicos.</p>
            </div>

            <div className="md:col-span-4 bg-card border border-border rounded-[2.5rem] p-10 group hover:border-primary/30 transition-all shadow-sm">
                <div className="w-14 h-14 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-8">
                   <Target className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tighter text-foreground mb-4">Relatórios ODS</h3>
                <p className="text-muted-foreground font-medium">Métricas de impacto social e ambiental geradas por seus alunos para relatórios de sustentabilidade.</p>
            </div>

            <div className="md:col-span-4 bg-foreground text-background rounded-[2.5rem] p-10 flex flex-col shadow-xl">
                 <div className="w-14 h-14 bg-background/10 rounded-2xl flex items-center justify-center mb-8 border border-background/10">
                    <Globe className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="font-display text-2xl font-bold tracking-tighter mb-4">Parceria Gratuita</h3>
                 <p className="font-medium leading-relaxed opacity-80">Sem taxas de adesão, mensalidades ou burocracia excessiva.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container max-w-[1200px] mx-auto">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '200+', label: 'IES Parceiras', color: 'text-primary' },
                { value: '8.5k+', label: 'Alunos Impactados', color: 'text-sky-400' },
                { value: '500+', label: 'Projetos Verificados', color: 'text-emerald-400' },
                { value: '98%', label: 'Taxa de Retenção', color: 'text-amber-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-[2rem] p-8 text-center group hover:shadow-2xl hover:shadow-primary/5 transition-all outline-none">
                   <div className={`font-display text-4xl md:text-6xl font-bold tracking-tighter mb-2 ${stat.color}`}>{stat.value}</div>
                   <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-secondary/5 border-b border-border">
        <div className="container max-w-[1200px] mx-auto">
           <div className="max-w-3xl mx-auto flex flex-col gap-12">
              <div className="text-center">
                 <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tighter text-foreground mb-4">Acordo de <span className="italic font-serif font-light text-primary">Impacto</span>.</h2>
                 <p className="text-[1.125rem] text-muted-foreground font-medium">As respostas que a coordenação e reitoria buscam.</p>
              </div>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className={`bg-card rounded-2xl border transition-all duration-300 ${expandedFaq === index ? 'border-primary/50 shadow-xl shadow-primary/5' : 'border-border shadow-sm'}`}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left"
                    >
                      <span className={`text-lg font-bold font-display tracking-tighter transition-colors ${expandedFaq === index ? 'text-primary' : 'text-foreground'}`}>{faq.question}</span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${expandedFaq === index ? 'bg-primary text-black rotate-180' : 'bg-secondary text-muted-foreground'}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-8 pb-8 text-muted-foreground font-medium leading-relaxed animate-fade-in-up">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Main Partnership Form */}
      <section id="partnership-form" className="py-32 bg-background relative border-b border-border">
        <div className="container max-w-[1200px] relative z-10 py-12">
          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tighter text-foreground leading-[1.05] mb-6">
                  Solicite a <span className="text-primary italic font-serif font-light">Homologação</span> da sua Instituição.
                </h2>
                <p className="text-[1.125rem] text-muted-foreground font-medium max-w-2xl mx-auto">Nossos especialistas em parcerias acadêmicas retornarão em até 48 horas úteis.</p>
             </div>

             {partnershipSubmitted ? (
               <div className="bg-card border border-primary/20 rounded-[3rem] p-16 text-center animate-fade-in shadow-2xl shadow-primary/5">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-4 tracking-tighter">Solicitação Recebida!</h3>
                  <p className="text-xl text-muted-foreground font-medium mb-10 leading-relaxed">
                    Agradecemos o interesse da <strong>{partnershipForm.universityName}</strong>. Protocolo: BS-{Math.floor(Math.random()*10000)}
                  </p>
                  <Button variant="outline" onClick={() => setPartnershipSubmitted(false)} className="h-12 px-8 rounded-xl border-border text-foreground font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/5">Nova Solicitação</Button>
               </div>
             ) : (
               <form onSubmit={handlePartnershipSubmit} className="bg-card border border-border rounded-[3rem] p-12 space-y-10 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-primary text-black text-[10px] font-bold flex items-center justify-center shadow-lg shadow-primary/20">01</div>
                       <h4 className="font-display text-xl font-bold text-foreground tracking-tighter">Identificação Institucional</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2 md:col-span-2">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Nome Fantasia da Universidade</Label>
                          <Input
                             className="h-14 rounded-xl border-border bg-secondary/50 focus:bg-secondary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground"
                             value={partnershipForm.universityName}
                             onChange={(e) => setPartnershipForm({ ...partnershipForm, universityName: e.target.value })}
                             placeholder="Ex: Mackenzie, USP, PUC..."
                             required
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">CNPJ Principal</Label>
                          <Input
                             className="h-14 rounded-xl border-border bg-secondary/50 focus:bg-secondary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground"
                             value={partnershipForm.cnpj}
                             onChange={(e) => setPartnershipForm({ ...partnershipForm, cnpj: e.target.value })}
                             placeholder="00.000.000/0001-00"
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Website Institucional</Label>
                          <Input
                             type="url"
                             className="h-14 rounded-xl border-border bg-secondary/50 focus:bg-secondary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground"
                             value={partnershipForm.website}
                             onChange={(e) => setPartnershipForm({ ...partnershipForm, website: e.target.value })}
                             placeholder="www.univ.edu.br"
                          />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center">02</div>
                       <h4 className="font-display text-xl font-bold text-foreground tracking-tighter">Ponto de Contato Direto</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Nome do Responsável</Label>
                          <Input
                             className="h-14 rounded-xl border-border bg-secondary/50 focus:bg-secondary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground"
                             value={partnershipForm.contactName}
                             onChange={(e) => setPartnershipForm({ ...partnershipForm, contactName: e.target.value })}
                             placeholder="Prof. ou Gestor(a)"
                             required
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Governamental</Label>
                          <Input
                             type="email"
                             className="h-14 rounded-xl border-border bg-secondary/50 focus:bg-secondary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground"
                             value={partnershipForm.contactEmail}
                             onChange={(e) => setPartnershipForm({ ...partnershipForm, contactEmail: e.target.value })}
                             placeholder="nome@univ.edu.br"
                             required
                          />
                       </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={partnershipMutation.isPending} 
                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] group mt-8"
                  >
                    {partnershipMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>Formalizar Pedido de Parceria <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" /></span>}
                  </Button>
                </form>
              )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background border-b border-border">
         <div className="container text-center py-10">
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tighter text-foreground mb-8">Integre sua Universidade ao ecossistema <span className="text-primary italic font-serif font-light">Brasil Sustenta</span>.</h2>
            <Link href="/">
               <Button variant="ghost" className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 hover:text-foreground h-12 px-8 rounded-xl border border-transparent hover:border-border">
                  Voltar ao Portal Principal
               </Button>
            </Link>
         </div>
      </section>

      <Footer />
    </div>
  );
}
