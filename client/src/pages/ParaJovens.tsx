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
  School
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-radial from-primary/20 via-primary/5 to-transparent">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              <span>Oportunidades para Jovens Talentos</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Transforme seu{' '}
              <span className="text-primary">Talento</span>
              <br />
              em Experiência Real
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Participe de projetos ESG em empresas reais, desenvolva habilidades práticas,
              construa seu portfólio e receba remuneração enquanto ainda está na universidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login/jovem">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-semibold">
                  Criar Meu Perfil Gratuito
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Ver Projetos Disponíveis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Por que Participar?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vantagens exclusivas para jovens talentos que querem fazer a diferença
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Experiência Profissional Real',
                description: 'Trabalhe em projetos reais de empresas, não simulações. Construa um portfólio sólido que impressiona recrutadores.',
              },
              {
                icon: TrendingUp,
                title: 'Remuneração Justa',
                description: 'Receba entre R$ 800 e R$ 2.500/mês por projeto. Seu talento tem valor e você merece ser recompensado.',
              },
              {
                icon: Users,
                title: 'Networking Profissional',
                description: 'Conecte-se com líderes de empresas, mentores experientes e outros talentos universitários de todo o Brasil.',
              },
              {
                icon: Award,
                title: 'Certificações Reconhecidas',
                description: 'Certificados digitais da Brasil Sustenta e das empresas parceiras para valorizar seu currículo.',
              },
              {
                icon: GraduationCap,
                title: 'Desenvolvimento de Habilidades',
                description: 'Aprenda na prática: gestão de projetos, trabalho em equipe, comunicação corporativa e resolução de problemas.',
              },
              {
                icon: Rocket,
                title: 'Oportunidades de Carreira',
                description: '30% dos talentos são contratados pelas empresas após o projeto. Seu próximo emprego pode começar aqui.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Tire suas Dúvidas
              </h2>
              <p className="text-lg text-muted-foreground">
                Respostas para as perguntas mais frequentes de estudantes
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {[
                { id: 'geral' as const, label: 'Geral' },
                { id: 'processo' as const, label: 'Processo' },
                { id: 'beneficios' as const, label: 'Benefícios' },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setExpandedFaq(null);
                  }}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-primary text-black'
                      : 'bg-card text-muted-foreground hover:bg-card/80 border border-border'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqData[activeCategory].map((faq, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">
                Não encontrou sua dúvida? Envie sua pergunta abaixo!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Question Form Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Envie sua Dúvida
              </h2>
              <p className="text-lg text-muted-foreground">
                Nossa equipe responderá por email em até 24 horas
              </p>
            </div>

            {questionSubmitted ? (
              <div className="bg-card border border-primary/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Dúvida Enviada!
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Recebemos sua pergunta e responderemos em breve no email <strong>{questionForm.email}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="q-name">Seu Nome *</Label>
                    <Input
                      id="q-name"
                      value={questionForm.name}
                      onChange={(e) => setQuestionForm({ ...questionForm, name: e.target.value })}
                      placeholder="Nome completo"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="q-email">Seu Email *</Label>
                    <Input
                      id="q-email"
                      type="email"
                      value={questionForm.email}
                      onChange={(e) => setQuestionForm({ ...questionForm, email: e.target.value })}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="q-university">Universidade</Label>
                    <Input
                      id="q-university"
                      value={questionForm.university}
                      onChange={(e) => setQuestionForm({ ...questionForm, university: e.target.value })}
                      placeholder="Ex: USP, UNICAMP, UFMG"
                    />
                  </div>

                  <div>
                    <Label htmlFor="q-course">Curso</Label>
                    <Input
                      id="q-course"
                      value={questionForm.course}
                      onChange={(e) => setQuestionForm({ ...questionForm, course: e.target.value })}
                      placeholder="Ex: Administração, Design"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="q-question">Sua Dúvida *</Label>
                  <Textarea
                    id="q-question"
                    value={questionForm.question}
                    onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                    placeholder="Descreva sua dúvida com o máximo de detalhes possível..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={questionMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-semibold text-lg py-6"
                >
                  {questionMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Dúvida'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* University Invitation Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <School className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Convide sua Universidade
              </h2>
              <p className="text-lg text-muted-foreground">
                Ajude sua universidade a se tornar parceira e traga mais oportunidades para seus colegas
              </p>
            </div>

            {invitationSubmitted ? (
              <div className="bg-card border border-primary/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Convite Enviado!
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Entraremos em contato com <strong>{invitationForm.universityName}</strong> para apresentar nossa proposta de parceria.
                </p>
                <p className="text-sm text-muted-foreground">
                  Você receberá atualizações no email <strong>{invitationForm.studentEmail}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleInvitationSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Seus Dados</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="i-student-name">Seu Nome *</Label>
                      <Input
                        id="i-student-name"
                        value={invitationForm.studentName}
                        onChange={(e) => setInvitationForm({ ...invitationForm, studentName: e.target.value })}
                        placeholder="Nome completo"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="i-student-email">Seu Email *</Label>
                      <Input
                        id="i-student-email"
                        type="email"
                        value={invitationForm.studentEmail}
                        onChange={(e) => setInvitationForm({ ...invitationForm, studentEmail: e.target.value })}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="i-course">Seu Curso</Label>
                    <Input
                      id="i-course"
                      value={invitationForm.course}
                      onChange={(e) => setInvitationForm({ ...invitationForm, course: e.target.value })}
                      placeholder="Ex: Engenharia Ambiental"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Dados da Universidade</h4>
                  
                  <div>
                    <Label htmlFor="i-university-name">Nome da Universidade *</Label>
                    <Input
                      id="i-university-name"
                      value={invitationForm.universityName}
                      onChange={(e) => setInvitationForm({ ...invitationForm, universityName: e.target.value })}
                      placeholder="Ex: Universidade Federal de Minas Gerais"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="i-state">Estado (UF)</Label>
                      <Input
                        id="i-state"
                        value={invitationForm.state}
                        onChange={(e) => setInvitationForm({ ...invitationForm, state: e.target.value.toUpperCase().slice(0, 2) })}
                        placeholder="MG"
                        maxLength={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="i-city">Cidade</Label>
                      <Input
                        id="i-city"
                        value={invitationForm.city}
                        onChange={(e) => setInvitationForm({ ...invitationForm, city: e.target.value })}
                        placeholder="Belo Horizonte"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Contato da Universidade (Opcional)</h4>
                  <p className="text-sm text-muted-foreground">
                    Se você conhece alguém da coordenação ou reitoria, nos ajude com o contato
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="i-contact-name">Nome do Contato</Label>
                      <Input
                        id="i-contact-name"
                        value={invitationForm.contactName}
                        onChange={(e) => setInvitationForm({ ...invitationForm, contactName: e.target.value })}
                        placeholder="Prof. João Silva"
                      />
                    </div>

                    <div>
                      <Label htmlFor="i-contact-email">Email do Contato</Label>
                      <Input
                        id="i-contact-email"
                        type="email"
                        value={invitationForm.contactEmail}
                        onChange={(e) => setInvitationForm({ ...invitationForm, contactEmail: e.target.value })}
                        placeholder="contato@universidade.edu.br"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="i-message">Mensagem (Opcional)</Label>
                  <Textarea
                    id="i-message"
                    value={invitationForm.message}
                    onChange={(e) => setInvitationForm({ ...invitationForm, message: e.target.value })}
                    placeholder="Conte-nos por que sua universidade seria uma ótima parceira..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={invitationMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-semibold text-lg py-6"
                >
                  {invitationMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando Convite...
                    </>
                  ) : (
                    'Enviar Convite'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl p-12 border border-primary/30">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Junte-se a centenas de estudantes que já estão transformando talento em experiência real
            </p>
            <Link href="/login/jovem">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-semibold text-lg px-10">
                Criar Meu Perfil Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
