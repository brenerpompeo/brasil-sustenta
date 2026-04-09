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
  TrendingUp, 
  Award,
  Briefcase,
  ChevronDown,
  Loader2,
  CheckCircle2,
  Star,
  Zap,
  ArrowRight,
  Users
} from 'lucide-react';

import { SEO } from '@/components/SEO';

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
        answer: 'Não é obrigatório, mas universidades parceiras têm benefícios extras como eventos exclusivos e vagas prioritárias. Se sua universidade não é parceira, você pode convidá-la através do formulário.',
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
    <div className="min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
      <SEO 
        title="Para Jovens | Revolucione Seu Início de Carreira. Aplique para Squads Exclusivos"
        description="Assuma riscos que importam. Ingresse nos Squads ESG do Brasil Sustenta, conecte-se com marcas globais e gere renda enquanto impulsiona sua jornada."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-border">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--tw-gradient-from)_0%,transparent_70%)] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 animate-fade-in-up">
              <Star className="w-3.5 h-3.5 text-primary mr-2" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Futuro & Carreira com Propósito</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 leading-[1.05] tracking-tighter animate-fade-in-up">
              Seu <span className="italic font-light font-serif text-primary">Talento</span>,<br />
              Gerando <span className="underline decoration-primary/30 underline-offset-8">Impacto Real</span>.
            </h1>
            
            <p className="text-[1.125rem] text-muted-foreground font-medium mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              Trabalhe em projetos ESG de grandes empresas, receba remuneração digna e construa um currículo que o mercado disputa.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up delay-200">
              <Link href="/login/jovem">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-all hover:scale-[1.02] shadow-xl shadow-primary/10 tracking-widest uppercase text-xs">
                  Quero ser um Talento
                </Button>
              </Link>
              <Link href="/oportunidades">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 border-border text-foreground font-bold rounded-xl hover:bg-white/5 transition-all uppercase tracking-widest text-xs">
                  Explorar Projetos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Bento Grid */}
      <section className="py-24 bg-secondary/5 border-b border-border">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-fade-in-up">
            <div className="max-w-2xl">
               <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tighter">
                Mais que um <span className="italic font-serif font-light text-primary">Estágio</span>. <br />Uma experiência de Elite.
              </h2>
              <p className="text-[1.125rem] text-muted-foreground font-medium">Conectamos as mentes mais inquietas das universidades aos desafios reais das organizações contemporâneas.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-card border border-border px-4 py-2 rounded-xl h-fit">
              <Zap className="w-4 h-4 fill-current" />
              Upgrade na sua Carreira
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 */}
            <div className="md:col-span-2 bg-card border border-border rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-primary/30 transition-all">
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                  <Briefcase className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-3xl font-bold text-foreground font-display tracking-tighter mb-4">Experiência Profissional Direta</h3>
                <p className="text-muted-foreground font-medium text-lg max-w-md">Esqueça as simulações. No Brasil Sustenta você entra no core de projetos reais de sustentabilidade e inovação social de empresas líderes.</p>
                <div className="mt-auto pt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  Ver portfólios de exemplo <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute top-1/2 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
            </div>

            {/* Bento Card 2 */}
            <div className="bg-primary text-black rounded-[2.5rem] p-10 flex flex-col shadow-2xl shadow-primary/20">
               <div className="w-14 h-14 bg-black/10 rounded-2xl flex items-center justify-center mb-8 border border-black/20">
                  <TrendingUp className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-2xl font-bold font-display tracking-tighter mb-4 leading-tight">Remuneração Acima da Média</h3>
                <p className="text-black/80 font-medium mb-6">Receba entre R$ 800 e R$ 2.500 por projeto. Valorizamos seu tempo e conhecimento técnico.</p>
                <div className="mt-auto bg-black/10 rounded-2xl p-4 border border-black/20">
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-1">Média Mensal</span>
                  <p className="text-3xl font-display font-black tracking-tighter">R$ 1.850,00</p>
                </div>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-card border border-border rounded-[2.5rem] p-10 group hover:border-primary/30 transition-all">
               <div className="w-14 h-14 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-8">
                  <Users className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-foreground font-display tracking-tighter mb-4">Networking de Alto Nível</h3>
                <p className="text-muted-foreground font-medium">Acesso direto a CXOs e gestores de ESG que estão moldando o futuro das grandes corporações.</p>
            </div>

            {/* Bento Card 4 */}
            <div className="bg-card border border-border rounded-[2.5rem] p-10 group hover:border-primary/30 transition-all">
               <div className="w-14 h-14 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-8">
                  <Award className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-foreground font-display tracking-tighter mb-4">Certificação com Peso</h3>
                <p className="text-muted-foreground font-medium">Certificados digitais endossados pelas empresas e pela plataforma, validando impacto real.</p>
            </div>

            {/* Bento Card 5 */}
            <div className="bg-card text-foreground rounded-[2.5rem] p-10 border border-border relative overflow-hidden group hover:border-primary/30 transition-all">
               <div className="w-14 h-14 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-8">
                  <Rocket className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-display tracking-tighter mb-4 leading-tight">Carreira Acelerada</h3>
                <p className="text-muted-foreground font-medium mb-6">30% dos talentos que passam por nossos squads são contratados por empresas.</p>
                <div className="flex gap-1 animate-pulse">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-1.5 bg-primary/20 rounded-full"></div>)}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ System */}
      <section className="py-24 bg-background relative border-b border-border">
        <div className="container max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-secondary border border-border rounded-full mb-4">
               <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground">Knowledge Hub</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground tracking-tighter mb-6">Tire suas <span className="italic font-serif font-light text-primary">Dúvidas</span>.</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {['geral', 'processo', 'beneficios'].map((c) => (
                <button
                  key={c}
                  onClick={() => { setActiveCategory(c as any); setExpandedFaq(null); }}
                  className={`px-6 h-12 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                    activeCategory === c 
                    ? 'bg-foreground text-background border-foreground shadow-xl' 
                    : 'bg-card text-muted-foreground border-border hover:bg-white/5'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData[activeCategory].map((faq, index) => (
              <div
                key={index}
                className={`bg-card rounded-2xl border transition-all duration-300 ${expandedFaq === index ? 'border-primary/50 shadow-xl shadow-primary/5' : 'border-border'}`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg font-bold font-display tracking-tight transition-colors ${expandedFaq === index ? 'text-primary' : 'text-foreground'}`}>{faq.question}</span>
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
      </section>

      {/* Split Form Section */}
      <section className="py-24 bg-secondary/5 border-b border-border overflow-hidden relative">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Invitation Form */}
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="font-display text-4xl font-bold text-foreground tracking-tighter mb-6">Não viu sua <span className="text-primary font-serif font-light italic">Instituição</span>?</h2>
                <p className="text-[1.125rem] text-muted-foreground font-medium">Convide sua universidade para fazer parte do hub e abra portas para centenas de colegas.</p>
              </div>

              {invitationSubmitted ? (
                <div className="bg-card border border-primary/20 rounded-[2.5rem] p-12 text-center shadow-xl shadow-primary/5 animate-fade-in">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground tracking-tighter mb-2">Convite Protocolado!</h3>
                  <p className="text-muted-foreground font-medium mb-6">Entraremos em contato com a <strong>{invitationForm.universityName}</strong> em seu nome.</p>
                  <Button variant="outline" onClick={() => setInvitationSubmitted(false)} className="rounded-xl border-border text-foreground font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/5">Novo Convite</Button>
                </div>
              ) : (
                <form onSubmit={handleInvitationSubmit} className="bg-card border border-border rounded-[2.5rem] p-10 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="i-student-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Seu Nome</Label>
                      <Input
                        id="i-student-name"
                        className="h-14 rounded-xl border-border bg-secondary/50 focus:bg-secondary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground"
                        value={invitationForm.studentName}
                        onChange={(e) => setInvitationForm({ ...invitationForm, studentName: e.target.value })}
                        placeholder="Nome completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="i-student-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Seu Email</Label>
                       <Input
                        id="i-student-email"
                        type="email"
                        className="h-14 rounded-xl border-border bg-secondary/50 focus:bg-secondary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground"
                        value={invitationForm.studentEmail}
                        onChange={(e) => setInvitationForm({ ...invitationForm, studentEmail: e.target.value })}
                        placeholder="email@univ.edu"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="i-university-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Nome da Universidade</Label>
                    <Input
                      id="i-university-name"
                      className="h-14 rounded-xl border-border bg-secondary/50 focus:bg-secondary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground"
                      value={invitationForm.universityName}
                      onChange={(e) => setInvitationForm({ ...invitationForm, universityName: e.target.value })}
                      placeholder="Ex: USP, Federal do Ceará..."
                      required
                    />
                  </div>
                  <Button type="submit" disabled={invitationMutation.isPending} className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-[0.2em] text-[10px] group">
                    {invitationMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Enviar Convite Formal <ArrowRight className="inline ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>}
                  </Button>
                </form>
              )}
            </div>

            {/* Right: Question Form */}
            <div className="space-y-8 lg:mt-24 animate-fade-in-up delay-100">
              <div className="bg-card border border-border rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h3 className="font-display text-3xl font-bold tracking-tighter text-foreground mb-6">Atendimento ao Talento</h3>
                  <p className="text-muted-foreground font-medium mb-8 leading-relaxed">Nossa equipe de mentoria e suporte está pronta para ajudá-lo a encontrar a melhor oportunidade.</p>
                  
                  {questionSubmitted ? (
                    <div className="bg-secondary/30 border border-border rounded-xl p-6">
                       <p className="font-bold flex items-center gap-2 mb-2 text-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> Dúvida recebida!</p>
                       <p className="text-sm text-muted-foreground">Responderemos em até 24h úteis.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleQuestionSubmit} className="space-y-4">
                      <div>
                        <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 block">Seu Nome</Label>
                        <Input
                          value={questionForm.name}
                          onChange={(e) => setQuestionForm({ ...questionForm, name: e.target.value })}
                          className="h-14 rounded-xl border-border bg-secondary/50 text-foreground font-medium"
                          placeholder="Ex: João Silva"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 block">Seu E-mail</Label>
                        <Input
                          value={questionForm.email}
                          type="email"
                          onChange={(e) => setQuestionForm({ ...questionForm, email: e.target.value })}
                          className="h-14 rounded-xl border-border bg-secondary/50 text-foreground font-medium"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 block">Sua Dúvida</Label>
                        <Textarea
                          value={questionForm.question}
                          onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                          className="rounded-xl border-border bg-secondary/50 text-foreground font-medium min-h-[120px]"
                          placeholder="Fale conosco..."
                        />
                      </div>
                      <Button type="submit" disabled={questionMutation.isPending} className="w-full h-14 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
                        {questionMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Protocolar Pergunta'}
                      </Button>
                    </form>
                  )}
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container max-w-[1200px] mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground tracking-tighter leading-[1.05] mb-10">
              O futuro <span className="italic font-serif font-light text-primary">não espera</span>.<br />Seja o Protagonista.
            </h2>
            <div className="bg-card border border-border p-3 rounded-2xl flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Link href="/login/jovem" className="flex-1">
                <Button className="w-full h-14 rounded-xl bg-foreground text-background font-bold uppercase tracking-[0.2em] text-[10px]">
                  Cadastrar Agora
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="ghost" className="w-full h-14 rounded-xl text-muted-foreground font-bold uppercase tracking-[0.2em] text-[10px] border border-transparent hover:border-border hover:bg-white/5">
                  Voltar para Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
