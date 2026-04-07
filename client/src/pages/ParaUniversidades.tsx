import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { 
  School, 
  Users, 
  TrendingUp, 
  Award,
  Briefcase,
  Target,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  Handshake,
  Globe,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

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
    if (!partnershipForm.universityName || !partnershipForm.state || !partnershipForm.city || 
        !partnershipForm.contactName || !partnershipForm.contactEmail) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    partnershipMutation.mutate(partnershipForm);
  };

  const faqData = [
    {
      question: 'Quais são os benefícios da parceria?',
      answer: 'Universidades parceiras oferecem aos alunos acesso prioritário a oportunidades remuneradas, eventos exclusivos, workshops com empresas, networking qualificado e certificações reconhecidas no mercado. Além disso, a instituição fortalece sua conexão com o mercado de trabalho e projetos ESG.',
    },
    {
      question: 'Como funciona o modelo de convênio?',
      answer: 'O convênio é gratuito e não envolve custos para a universidade. Assinamos um termo de parceria, divulgamos oportunidades para seus alunos, realizamos eventos na instituição e fornecemos relatórios semestrais de impacto com métricas de participação e resultados.',
    },
    {
      question: 'Quais cursos podem participar?',
      answer: 'Todos os cursos são bem-vindos! Projetos ESG precisam de talentos diversos: Administração, Comunicação, Design, Engenharias, Ciências Sociais, Direito, TI, Marketing, Ciências Ambientais e muito mais. Quanto mais diversidade, melhor para os projetos.',
    },
    {
      question: 'Como os alunos são selecionados?',
      answer: 'Os alunos se cadastram na plataforma, montam seus perfis com habilidades e portfólio, e se candidatam aos projetos de interesse. As empresas avaliam os candidatos e selecionam os mais adequados. A universidade não interfere no processo de seleção.',
    },
    {
      question: 'A universidade precisa fazer alguma gestão?',
      answer: 'Não! A Brasil Sustenta cuida de toda a gestão: divulgação, seleção, matching, acompanhamento de projetos e pagamentos. A universidade apenas facilita a comunicação com os alunos e pode participar de eventos se desejar.',
    },
    {
      question: 'Quantos alunos já participaram?',
      answer: 'Mais de 8.500 jovens talentos já participaram de projetos através da Brasil Sustenta, vindos de mais de 200 universidades parceiras em todo o Brasil. A cada semestre, esse número cresce significativamente.',
    },
    {
      question: 'Como acompanhamos o desempenho dos alunos?',
      answer: 'Fornecemos relatórios semestrais com métricas de participação, avaliações de desempenho, projetos concluídos e feedback das empresas. A universidade pode usar esses dados para avaliar a empregabilidade de seus alunos.',
    },
    {
      question: 'Há algum custo ou taxa?',
      answer: 'Não! A parceria é 100% gratuita para universidades. Nosso modelo de receita vem das empresas que contratam os squads. Universidades e alunos não pagam nada para participar.',
    },
  ];

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden">
      <Header />

      {/* Hero Section - Violet Theme */}
      <section className="relative pt-40 pb-32 flex items-center justify-center overflow-hidden bg-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-violet/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-violet-2/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
             <div className="inline-flex items-center gap-2 bg-violet/5 border border-violet-3/20 text-violet px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 animate-fade-in shadow-sm">
                <School className="w-3.5 h-3.5 fill-current" />
                <span>Alianças Estratégicas e Extensão</span>
             </div>
             
             <h1 className="text-6xl md:text-8xl font-black text-ink font-display leading-[0.85] tracking-tight mb-8 animate-fade-in-up">
                Eleve o <span className="text-violet italic font-light">Impacto</span> da sua <span className="underline decoration-violet-4/30 underline-offset-8">Instituição</span>.
             </h1>
             
             <p className="text-xl md:text-2xl text-ink-3 font-medium mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                Conecte seus estudantes ao mercado ESG global através de squads multidisciplinares e projetos de impacto real, sem burocracia ou custos para a IES.
             </p>

             <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                <Button 
                   size="lg" 
                   className="h-16 px-10 rounded-2xl bg-violet hover:bg-violet-1 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-violet/20 transition-all hover:scale-105 active:scale-95"
                   onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                   Solicitar Parceria Formal
                </Button>
                <Link href="/login/universidade">
                   <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 border-paper-3 text-ink-2 bg-white/50 backdrop-blur-sm font-black uppercase tracking-widest text-xs hover:bg-white hover:border-violet/30">
                      Painel do Parceiro
                   </Button>
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Institutional Value Bento Grid */}
      <section className="py-24 bg-paper-2 border-y border-paper-3">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
               <h2 className="text-4xl md:text-6xl font-black text-ink font-display leading-[0.9] tracking-tighter mb-6">
                 Proposta de <span className="italic font-light text-violet text-center">Valor</span> <br />para a <span className="text-ink-4">Academia</span>.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-violet bg-white border border-paper-3 px-4 py-2 rounded-xl h-fit">
              <Sparkles className="w-4 h-4 fill-current" />
              Impacto Mensurável
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Empregabilidade */}
            <div className="md:col-span-8 bg-white border border-paper-3 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-violet/30 transition-all shadow-sm">
                <div className="relative z-10">
                   <div className="w-16 h-16 bg-violet/5 rounded-2xl flex items-center justify-center mb-8 border border-violet/10">
                      <Briefcase className="w-8 h-8 text-violet" />
                   </div>
                   <h3 className="text-3xl font-black text-ink font-display mb-4">Empregabilidade e Carreira</h3>
                   <p className="text-ink-3 font-medium text-lg max-w-lg leading-relaxed">
                      Mais de 30% dos alunos que participam dos squads são efetivados. Transforme sua taxa de empregabilidade através de experiência prática em projetos de ponta.
                   </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-full bg-violet/5 skew-x-[-15deg] translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Certificação */}
            <div className="md:col-span-4 bg-violet text-white rounded-[2.5rem] p-10 shadow-2xl shadow-violet/30 flex flex-col">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                   <Award className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black font-display mb-4 leading-tight">Certificações de Mercado</h3>
                <p className="opacity-80 font-medium mb-6">Validação de horas complementares e competências alinhadas aos Objetivos de Desenvolvimento Sustentável (ODS).</p>
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                   <span className="text-[11px] font-black uppercase tracking-widest">Reconhecido pela ONU</span>
                   <ShieldCheck className="w-5 h-5 opacity-60" />
                </div>
            </div>

            {/* Networking */}
            <div className="md:col-span-4 bg-white border border-paper-3 rounded-[2.5rem] p-10 group hover:border-violet/30 transition-all shadow-sm">
                <div className="w-14 h-14 bg-paper-3 rounded-2xl flex items-center justify-center mb-8">
                   <Handshake className="w-7 h-7 text-ink" />
                </div>
                <h3 className="text-2xl font-black font-display mb-4">Conexão Corporativa</h3>
                <p className="text-ink-3 font-medium">Sua universidade em contato direto com as maiores empresas do Brasil através de convênios estratégicos.</p>
            </div>

            {/* Métricas */}
            <div className="md:col-span-4 bg-white border border-paper-3 rounded-[2.5rem] p-10 group hover:border-violet/30 transition-all shadow-sm">
                <div className="w-14 h-14 bg-paper-3 rounded-2xl flex items-center justify-center mb-8">
                   <Target className="w-7 h-7 text-ink" />
                </div>
                <h3 className="text-2xl font-black font-display mb-4">Relatórios ODS</h3>
                <p className="text-ink-3 font-medium">Métricas de impacto social e ambiental geradas por seus alunos, prontas para seu relatório anual de sustentabilidade.</p>
            </div>

            {/* Zero Custo */}
            <div className="md:col-span-4 bg-ink text-white rounded-[2.5rem] p-10 flex flex-col shadow-xl">
                 <div className="w-14 h-14 bg-paper/10 rounded-2xl flex items-center justify-center mb-8 border border-paper/10">
                    <Globe className="w-7 h-7 text-violet" />
                 </div>
                 <h3 className="text-2xl font-black font-display mb-4">Parceria Gratuita</h3>
                 <p className="text-ink-5 font-medium leading-relaxed">Sem taxas de adesão, mensalidades ou burocracia excessiva. Foco total no sucesso do educando.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="py-24 bg-white">
        <div className="container">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '200+', label: 'IES Parceiras', color: 'text-violet' },
                { value: '8.5k+', label: 'Alunos Impactados', color: 'text-sky' },
                { value: '500+', label: 'Projetos Verificados', color: 'text-emerald-600' },
                { value: '98%', label: 'Taxa de Retenção', color: 'text-amber-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-paper border border-paper-3 rounded-[2rem] p-8 text-center group hover:shadow-xl transition-all">
                   <div className={`text-4xl md:text-6xl font-black font-display mb-2 ${stat.color}`}>{stat.value}</div>
                   <div className="text-[11px] font-black uppercase tracking-widest text-ink-4">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Accordion FAQ - Redesigned */}
      <section className="py-24 bg-paper-2 border-t border-paper-3">
        <div className="container">
           <div className="max-w-3xl mx-auto flex flex-col gap-12">
              <div className="text-center">
                 <h2 className="text-5xl font-black text-ink font-display tracking-tight mb-4">Acordo de <span className="italic font-light text-violet">Impacto</span>.</h2>
                 <p className="text-ink-3 font-medium">As respostas que a coordenação e reitoria buscam.</p>
              </div>

              <div className="space-y-3">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-3xl border transition-all duration-300 ${expandedFaq === index ? 'border-violet/30 shadow-2xl shadow-violet/5' : 'border-paper-3 shadow-sm'}`}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-8 py-7 flex items-center justify-between text-left"
                    >
                      <span className={`text-xl font-bold transition-colors ${expandedFaq === index ? 'text-violet' : 'text-ink'}`}>{faq.question}</span>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${expandedFaq === index ? 'bg-violet text-white rotate-180 shadow-lg shadow-violet/20' : 'bg-paper-2 text-ink-4'}`}>
                        <ChevronDown className="w-5 h-5 font-black" />
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-8 pb-8 text-ink-3 font-medium text-lg leading-relaxed animate-fade-in-up">
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
      <section id="partnership-form" className="py-32 bg-white relative">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-ink font-display tracking-tighter leading-[0.9] mb-8">
                  Solicite a <span className="text-violet italic font-light">Homologação</span> da sua Instituição.
                </h2>
                <p className="text-xl text-ink-3 font-medium max-w-2xl mx-auto">Nossos especialistas em parcerias acadêmicas retornarão em até 48 horas úteis.</p>
             </div>

             {partnershipSubmitted ? (
               <div className="bg-paper-2 border border-violet/20 rounded-[3rem] p-16 text-center animate-fade-in shadow-2xl shadow-violet/5">
                  <div className="w-24 h-24 bg-violet/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-violet/20">
                    <CheckCircle2 className="w-12 h-12 text-violet" />
                  </div>
                  <h3 className="text-3xl font-black text-ink mb-4 font-display">Solicitação Recebida!</h3>
                  <p className="text-xl text-ink-3 font-medium mb-10 leading-relaxed">
                    Agradecemos o interesse da <strong>{partnershipForm.universityName}</strong>. Protocolo: BS-{Math.floor(Math.random()*10000)}
                  </p>
                  <Button variant="outline" onClick={() => setPartnershipSubmitted(false)} className="h-12 px-8 rounded-xl border-paper-3 font-black uppercase tracking-widest text-[11px]">Nova Solicitação</Button>
               </div>
             ) : (
               <form onSubmit={handlePartnershipSubmit} className="bg-white border border-paper-3 rounded-[3.5rem] p-12 space-y-10 shadow-2xl shadow-ink/5">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-violet text-white text-[11px] font-black flex items-center justify-center shadow-lg shadow-violet/20">01</div>
                       <h4 className="text-lg font-black text-ink uppercase tracking-tight">Identificação Institucional</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2 md:col-span-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4 ml-1">Nome Fantasia da Universidade</Label>
                          <Input
                             className="h-16 rounded-2xl border-paper-3 bg-paper-2 focus:bg-white focus:ring-4 focus:ring-violet/10 transition-all font-bold text-lg"
                             value={partnershipForm.universityName}
                             onChange={(e) => setPartnershipForm({ ...partnershipForm, universityName: e.target.value })}
                             placeholder="Ex: Mackenzie, USP, PUC..."
                             required
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4 ml-1">CNPJ Principal</Label>
                          <Input
                             className="h-14 rounded-xl border-paper-3 bg-paper-2 focus:bg-white transition-all font-bold"
                             value={partnershipForm.cnpj}
                             onChange={(e) => setPartnershipForm({ ...partnershipForm, cnpj: e.target.value })}
                             placeholder="00.000.000/0001-00"
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4 ml-1">Website Institucional</Label>
                          <Input
                             type="url"
                             className="h-14 rounded-xl border-paper-3 bg-paper-2 focus:bg-white transition-all font-bold"
                             value={partnershipForm.website}
                             onChange={(e) => setPartnershipForm({ ...partnershipForm, website: e.target.value })}
                             placeholder="www.univ.edu.br"
                          />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-ink text-white text-[11px] font-black flex items-center justify-center">02</div>
                       <h4 className="text-lg font-black text-ink uppercase tracking-tight">Ponto de Contato Direto</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4 ml-1">Nome do Responsável</Label>
                          <Input
                             className="h-14 rounded-xl border-paper-3 bg-paper-2 focus:bg-white transition-all font-bold"
                             value={partnershipForm.contactName}
                             onChange={(e) => setPartnershipForm({ ...partnershipForm, contactName: e.target.value })}
                             placeholder="Prof. ou Gestor(a)"
                             required
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4 ml-1">Email Governamental/Educacional</Label>
                          <Input
                             type="email"
                             className="h-14 rounded-xl border-paper-3 bg-paper-2 focus:bg-white transition-all font-bold"
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
                    className="w-full h-20 rounded-[1.5rem] bg-violet hover:bg-violet-1 text-white font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-violet/30 transition-all active:scale-[0.98] group"
                  >
                    {partnershipMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>Formalizar Pedido de Parceria <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" /></span>}
                  </Button>
               </form>
             )}
          </div>
        </div>
      </section>

      {/* Footer Closing */}
      <section className="py-24 bg-paper border-t border-paper-3">
         <div className="container text-center">
            <h2 className="text-4xl font-black text-ink font-display tracking-tight mb-8">Integre sua Universidade ao ecossistema <span className="text-violet">Brasil Sustenta</span>.</h2>
            <Link href="/">
               <Button variant="ghost" className="text-ink-4 font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-ink">
                  Voltar ao Portal Principal
               </Button>
            </Link>
         </div>
      </section>

      <Footer />
    </div>
  );
}
