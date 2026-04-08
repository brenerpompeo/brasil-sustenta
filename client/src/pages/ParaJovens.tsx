import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { 
  Rocket, 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Award,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  School,
  Star,
  Target,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function ParaJovens() {
  // FAQ State
  const [activeCategory, setActiveCategory] = useState<'geral' | 'processo' | 'beneficios'>('geral');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Question Form State
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    name: '',
    email: '',
    university: '',
    course: '',
    question: '',
  });

  // University Invitation Form State
  const [invitationSubmitted, setInvitationSubmitted] = useState(false);
  const [invitationForm, setInvitationForm] = useState({
    studentName: '',
    studentEmail: '',
    universityName: '',
    state: '',
    city: '',
    course: '',
    contactName: '',
    contactEmail: '',
    message: '',
  });

  const questionMutation = trpc.student.submitQuestion.useMutation({
    onSuccess: () => {
      setQuestionSubmitted(true);
      toast.success('Dúvida enviada com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao enviar dúvida');
    },
  });

  const invitationMutation = trpc.student.inviteUniversity.useMutation({
    onSuccess: () => {
      setInvitationSubmitted(true);
      toast.success('Convite enviado com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao enviar convite');
    },
  });

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionForm.name || !questionForm.email || !questionForm.question) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    questionMutation.mutate(questionForm);
  };

  const handleInvitationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitationForm.studentName || !invitationForm.studentEmail || !invitationForm.universityName) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    invitationMutation.mutate(invitationForm);
  };

  const faqData = {
    geral: [
      {
        question: 'O que é o Brasil Sustenta?',
        answer: 'O Brasil Sustenta é uma plataforma que conecta jovens talentos universitários a empresas para projetos de sustentabilidade, ESG e inovação social. Oferecemos oportunidades reais de trabalho remunerado enquanto você ainda está na universidade.',
      },
      {
        question: 'Preciso pagar para participar?',
        answer: 'Não! A participação é 100% gratuita para estudantes. Você se cadastra, monta seu perfil, candidata-se a projetos e, se selecionado, recebe remuneração pelo trabalho realizado.',
      },
      {
        question: 'Quais cursos podem participar?',
        answer: 'Aceitamos estudantes de todos os cursos! Projetos ESG precisam de talentos diversos: Administração, Comunicação, Design, Engenharias, Ciências Sociais, Direito, TI, Marketing e muito mais.',
      },
      {
        question: 'Minha universidade precisa ser parceira?',
        answer: 'Não é obrigatório, mas universidades parceiras têm benefícios extras como eventos exclusivos e vagas prioritárias. Se sua universidade não é parceira, você pode convidá-la através do formulário "Convide sua Universidade".',
      },
    ],
    processo: [
      {
        question: 'Como funciona o processo de seleção?',
        answer: 'Você se cadastra, completa seu perfil com habilidades e portfólio, navega pelos projetos disponíveis, candidata-se aos que te interessam e, se aprovado pela empresa, entra para o squad do projeto.',
      },
      {
        question: 'Quanto tempo dura um projeto?',
        answer: 'Varia de 1 a 6 meses dependendo do escopo. A maioria dos projetos dura entre 2-3 meses, com dedicação de 10-20 horas semanais, compatível com seus estudos.',
      },
      {
        question: 'Posso participar de mais de um projeto?',
        answer: 'Sim, desde que consiga gerenciar o tempo. Recomendamos começar com um projeto para garantir qualidade na entrega e depois expandir conforme sua disponibilidade.',
      },
      {
        question: 'O trabalho é remoto ou presencial?',
        answer: 'A maioria dos projetos é 100% remota, permitindo que você trabalhe de qualquer lugar. Alguns projetos podem ter encontros presenciais opcionais ou híbridos.',
      },
    ],
    beneficios: [
      {
        question: 'Qual é a remuneração?',
        answer: 'A remuneração varia por projeto e função, geralmente entre R$ 800 a R$ 2.500 por mês. Você vê o valor antes de se candidatar e negocia diretamente com a empresa.',
      },
      {
        question: 'Recebo certificado ao final do projeto?',
        answer: 'Sim! Ao concluir um projeto, você recebe certificado digital da Brasil Sustenta e da empresa parceira, além de avaliação de desempenho que fica no seu perfil.',
      },
      {
        question: 'Posso ser efetivado pela empresa?',
        answer: 'Muitos estudantes são contratados pelas empresas após o projeto! Mais de 30% dos talentos que se destacam recebem proposta de estágio ou emprego.',
      },
      {
        question: 'Quais habilidades vou desenvolver?',
        answer: 'Além de habilidades técnicas da sua área, você desenvolve soft skills essenciais: trabalho em equipe, gestão de projetos, comunicação corporativa, resolução de problemas reais e networking profissional.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden">
      <Header />

      {/* Hero Section - Sky Theme */}
      <section className="relative pt-40 pb-32 flex items-center justify-center overflow-hidden bg-paper">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-sky/5 blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-sky-2/5 blur-[100px]"></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-sky-5 blur-[80px] opacity-20"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-sky/5 border border-sky-3/20 text-sky-1 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 animate-fade-in">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Futuro & Carreira com Propósito</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-ink font-display leading-[0.85] tracking-tight mb-8 animate-fade-in-up">
              Seu <span className="text-sky italic font-light">Talento</span>,<br />
              Gerando <span className="underline decoration-sky-4/30 underline-offset-8">Impacto Real</span>.
            </h1>
            
            <p className="text-xl md:text-2xl text-ink-2 font-medium mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              Trabalhe em projetos ESG de grandes empresas, receba remuneração digna e construa um currículo que o mercado disputa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <Link href="/login/jovem">
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-sky hover:bg-sky-1 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-sky/20 transition-all hover:scale-105 active:scale-95">
                  Quero ser um Talento
                </Button>
              </Link>
              <Link href="/dashboard/jovem?preview=true">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 border-paper-3 text-ink-2 bg-paper/50 backdrop-blur-sm font-black uppercase tracking-widest text-xs hover:bg-paper hover:border-sky/30">
                  Explorar Projetos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Bento Grid */}
      <section className="py-24 bg-paper-2 border-y border-paper-3">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
               <h2 className="text-4xl md:text-6xl font-black text-ink font-display leading-[0.9] tracking-tighter mb-6">
                Mais que um <span className="italic font-light text-sky">Estágio</span>. <br />Uma experiência de <span className="text-leaf">Elite</span>.
              </h2>
              <p className="text-lg text-ink-2 font-medium">Conectamos as mentes mais inquietas das universidades aos desafios reais das organizações contemporâneas.</p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky bg-white border border-paper-3 px-4 py-2 rounded-xl h-fit">
              <Zap className="w-4 h-4 fill-current" />
              Upgrade na sua Carreira
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 */}
            <div className="md:col-span-2 bg-paper border border-paper-3 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-sky/30 transition-all">
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-16 h-16 bg-sky/5 rounded-2xl flex items-center justify-center mb-8 border border-sky/10">
                  <Briefcase className="w-8 h-8 text-sky" />
                </div>
                <h3 className="text-3xl font-black text-ink font-display mb-4">Experiência Profissional Direta</h3>
                <p className="text-ink-2 font-medium text-lg max-w-md">Esqueça as simulações. No Brasil Sustenta você entra no core de projetos reais de sustentabilidade e inovação social de empresas líderes.</p>
                <div className="mt-auto pt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky">
                  Ver portfólios de exemplo <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute top-1/2 -right-10 w-64 h-64 bg-sky/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
            </div>

            {/* Bento Card 2 */}
            <div className="bg-sky text-white rounded-[2.5rem] p-10 flex flex-col shadow-2xl shadow-sky/30">
               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-black font-display mb-4 leading-tight">Remuneração Acima da Média</h3>
                <p className="text-white/80 font-medium mb-6">Receba entre R$ 800 e R$ 2.500 por projeto. Valorizamos seu tempo e seu conhecimento técnico.</p>
                <div className="mt-auto bg-white/10 rounded-2xl p-4 border border-white/20">
                  <span className="text-[11px] font-black uppercase tracking-widest block mb-1">Média Mensal</span>
                  <p className="text-3xl font-black">R$ 1.850,00</p>
                </div>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-paper border border-paper-3 rounded-[2.5rem] p-10 group hover:border-sky/30 transition-all">
               <div className="w-14 h-14 bg-paper-3 rounded-2xl flex items-center justify-center mb-8 border border-paper-4/30">
                  <Users className="w-7 h-7 text-ink-2" />
                </div>
                <h3 className="text-2xl font-black font-display mb-4">Networking de Alto Nível</h3>
                <p className="text-ink-2 font-medium">Acesso direto a CXOs e gestores de ESG que estão moldando o futuro das grandes corporações.</p>
            </div>

            {/* Bento Card 4 */}
            <div className="bg-paper border border-paper-3 rounded-[2.5rem] p-10 group hover:border-sky/30 transition-all">
               <div className="w-14 h-14 bg-paper-3 rounded-2xl flex items-center justify-center mb-8 border border-paper-4/30">
                  <Award className="w-7 h-7 text-ink-2" />
                </div>
                <h3 className="text-2xl font-black font-display mb-4">Certificação com Peso</h3>
                <p className="text-ink-2 font-medium">Certificados digitais endossados pelas empresas e pela plataforma, validando sua entrega de impacto.</p>
            </div>

            {/* Bento Card 5 */}
            <div className="bg-paper text-ink rounded-[2.5rem] p-10 border border-paper-3 relative overflow-hidden group hover:border-sky/30 transition-all">
               <div className="w-14 h-14 bg-paper-2 rounded-2xl flex items-center justify-center mb-8 border border-paper-4/30">
                  <Rocket className="w-7 h-7 text-sky" />
                </div>
                <h3 className="text-2xl font-black font-display mb-4 leading-tight">Carreira Acelerada</h3>
                <p className="text-ink-2 font-medium mb-6">30% dos talentos que passam por nossos squads são contratados permanentemente pelas empresas.</p>
                <div className="flex gap-1 animate-pulse">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-1.5 bg-sky/20 rounded-full"></div>)}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ System - Redesigned */}
      <section className="py-24 bg-paper relative">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-2 mb-4">Knowledge Hub</div>
            <h2 className="text-5xl font-black text-ink font-display tracking-tight mb-6">Tire suas <span className="italic font-light text-ink-4">Dúvidas</span>.</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {['geral', 'processo', 'beneficios'].map((c) => (
                <button
                  key={c}
                  onClick={() => { setActiveCategory(c as any); setExpandedFaq(null); }}
                  className={`px-6 h-11 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === c 
                    ? 'bg-ink text-white shadow-xl shadow-ink/20 transform -translate-y-1' 
                    : 'bg-paper-2 text-ink-4 hover:bg-paper-3 hover:text-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqData[activeCategory].map((faq, index) => (
              <div
                key={index}
                className={`bg-paper-2 rounded-2xl border transition-all duration-300 ${expandedFaq === index ? 'border-sky-3/30 bg-paper shadow-xl shadow-sky/5' : 'border-paper-3'}`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg font-bold transition-colors ${expandedFaq === index ? 'text-sky' : 'text-ink'}`}>{faq.question}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${expandedFaq === index ? 'bg-sky text-white rotate-180' : 'bg-paper-3 text-ink-4'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-8 pb-8 text-ink-2 font-medium leading-relaxed animate-fade-in-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Form Section - Dual Purpose */}
      <section className="py-24 bg-paper-2 border-t border-paper-3 overflow-hidden relative">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Invitation Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-ink font-display tracking-tight mb-6">Não viu sua <span className="text-sky underline decoration-sky-3/20">Instituição</span>?</h2>
                <p className="text-lg text-ink-2 font-medium">Convide sua universidade para fazer parte do hub e abra portas para centenas de colegas.</p>
              </div>

              {invitationSubmitted ? (
                <div className="bg-white border border-emerald-100 rounded-[2.5rem] p-12 text-center shadow-xl shadow-emerald-500/5 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-ink mb-2">Convite Protocolado!</h3>
                  <p className="text-ink-3 font-medium mb-6">Entraremos em contato com a <strong>{invitationForm.universityName}</strong> em seu nome.</p>
                  <Button variant="outline" onClick={() => setInvitationSubmitted(false)} className="rounded-xl border-paper-3 font-black uppercase tracking-widest text-[11px]">Novo Convite</Button>
                </div>
              ) : (
                <form onSubmit={handleInvitationSubmit} className="bg-paper border border-paper-3 rounded-[2.5rem] p-10 space-y-6 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="i-student-name" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Seu Nome</Label>
                      <Input
                        id="i-student-name"
                        className="h-14 rounded-xl border-paper-3 bg-paper-2 focus:bg-white focus:ring-4 focus:ring-sky/10 transition-all font-bold"
                        value={invitationForm.studentName}
                        onChange={(e) => setInvitationForm({ ...invitationForm, studentName: e.target.value })}
                        placeholder="Nome completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="i-student-email" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Seu Email</Label>
                       <Input
                        id="i-student-email"
                        type="email"
                        className="h-14 rounded-xl border-paper-3 bg-paper-2 focus:bg-white focus:ring-4 focus:ring-sky/10 transition-all font-bold"
                        value={invitationForm.studentEmail}
                        onChange={(e) => setInvitationForm({ ...invitationForm, studentEmail: e.target.value })}
                        placeholder="email@univ.edu"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="i-university-name" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Nome da Universidade</Label>
                    <Input
                      id="i-university-name"
                      className="h-14 rounded-xl border-paper-3 bg-paper-2 focus:bg-white focus:ring-4 focus:ring-sky/10 transition-all font-bold"
                      value={invitationForm.universityName}
                      onChange={(e) => setInvitationForm({ ...invitationForm, universityName: e.target.value })}
                      placeholder="Ex: USP, Federal do Ceará..."
                      required
                    />
                  </div>
                  <Button type="submit" disabled={invitationMutation.isPending} className="w-full h-16 rounded-2xl bg-sky hover:bg-sky-1 text-white font-black uppercase tracking-widest text-xs group">
                    {invitationMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Enviar Convite Formal <ArrowRight className="inline ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>}
                  </Button>
                </form>
              )}
            </div>

            {/* Right: Question Form */}
            <div className="space-y-8 lg:mt-24">
              <div className="bg-sky-1 text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl shadow-sky/20">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black font-display mb-6">Atendimento ao Talento</h3>
                  <p className="text-white/80 font-medium mb-8 leading-relaxed">Nossa equipe de mentoria e suporte está pronta para te ajudar a navegar pela plataforma e encontrar a melhor oportunidade.</p>
                  
                  {questionSubmitted ? (
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                       <p className="font-bold flex items-center gap-2 mb-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Dúvida recebida!</p>
                       <p className="text-sm opacity-80">Responderemos em até 24h úteis.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleQuestionSubmit} className="space-y-4">
                      <Input
                        value={questionForm.name}
                        onChange={(e) => setQuestionForm({ ...questionForm, name: e.target.value })}
                        className="h-14 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:ring-white/30 font-bold"
                        placeholder="Seu Nome"
                      />
                      <Input
                        value={questionForm.email}
                        type="email"
                        onChange={(e) => setQuestionForm({ ...questionForm, email: e.target.value })}
                        className="h-14 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:ring-white/30 font-bold"
                        placeholder="Seu melhor email"
                      />
                      <Textarea
                        value={questionForm.question}
                        onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                        className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:ring-white/30 font-bold min-h-[120px]"
                        placeholder="Fale conosco..."
                      />
                      <Button type="submit" disabled={questionMutation.isPending} className="w-full h-14 rounded-xl bg-white text-sky hover:bg-paper font-black uppercase tracking-widest text-[11px]">
                        {questionMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Protocolar Pergunta'}
                      </Button>
                    </form>
                  )}
                </div>
                <Users className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
              </div>
            </div>
          </div>
        </div>
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sky/5 skew-x-[15deg] origin-top translate-x-1/2 pointer-events-none"></div>
      </section>

      {/* Closing CTA */}
      <section className="py-32 bg-paper relative overflow-hidden">
        <div className="container text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-ink font-display tracking-tight leading-[0.9] mb-10">
              O futuro <span className="italic font-light text-sky">não espera</span>.<br />Seja o <span className="text-ink-2">Protagonista</span>.
            </h2>
            <div className="bg-paper-2 border border-paper-3 p-2 rounded-2xl flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Link href="/login/jovem" className="flex-1">
                <Button className="w-full h-14 rounded-xl bg-ink text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-ink/20">
                  Cadastrar Agora
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="ghost" className="w-full h-14 rounded-xl text-ink-3 font-black uppercase tracking-widest text-[11px] hover:bg-white">
                  Voltar para Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-30">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky/20 to-transparent"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
