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
  Handshake
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-radial from-primary/20 via-primary/5 to-transparent">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <School className="w-4 h-4" />
              <span>Parcerias Universitárias</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Conecte seus Alunos ao{' '}
              <span className="text-primary">Mercado ESG</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Torne-se uma universidade parceira e ofereça aos seus estudantes oportunidades
              reais de trabalho remunerado em projetos de sustentabilidade e inovação social.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-black font-semibold"
                onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Solicitar Parceria
              </Button>
              <Link href="/login/universidade">
                <Button size="lg" variant="outline">
                  Já sou Parceiro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Por que ser Parceiro?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Benefícios exclusivos para universidades que querem preparar alunos para o futuro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Empregabilidade dos Alunos',
                description: 'Aumente a taxa de empregabilidade oferecendo experiências profissionais reais enquanto os alunos ainda estão cursando. Mais de 30% são efetivados após os projetos.',
              },
              {
                icon: Handshake,
                title: 'Conexão com o Mercado',
                description: 'Fortaleça o relacionamento da universidade com empresas líderes em ESG, criando pontes entre academia e mercado de trabalho.',
              },
              {
                icon: Users,
                title: 'Desenvolvimento Integral',
                description: 'Seus alunos desenvolvem habilidades técnicas e soft skills essenciais: trabalho em equipe, gestão de projetos e resolução de problemas reais.',
              },
              {
                icon: Award,
                title: 'Reconhecimento e Certificações',
                description: 'Alunos recebem certificações reconhecidas pelo mercado, valorizando o currículo e a reputação da instituição.',
              },
              {
                icon: Target,
                title: 'Alinhamento com ODS',
                description: 'Contribua para os Objetivos de Desenvolvimento Sustentável da ONU através de projetos práticos de impacto social e ambiental.',
              },
              {
                icon: TrendingUp,
                title: 'Relatórios de Impacto',
                description: 'Receba relatórios semestrais com métricas de participação, desempenho dos alunos e impacto gerado pelos projetos.',
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

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Como Funciona a Parceria?
              </h2>
              <p className="text-lg text-muted-foreground">
                Processo simples e sem burocracia
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  step: '01',
                  title: 'Solicitação de Parceria',
                  description: 'Preencha o formulário abaixo com os dados da universidade e aguarde nosso contato em até 48 horas.',
                },
                {
                  step: '02',
                  title: 'Reunião de Alinhamento',
                  description: 'Agendamos uma reunião online para apresentar a plataforma, tirar dúvidas e alinhar expectativas.',
                },
                {
                  step: '03',
                  title: 'Assinatura do Convênio',
                  description: 'Formalizamos a parceria com um termo de convênio digital. Processo rápido e sem custos.',
                },
                {
                  step: '04',
                  title: 'Ativação e Divulgação',
                  description: 'Criamos materiais de divulgação personalizados e começamos a conectar seus alunos a oportunidades reais.',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{item.step}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: '200+', label: 'Universidades Parceiras' },
                { value: '8.5k+', label: 'Alunos Participantes' },
                { value: '500+', label: 'Projetos Concluídos' },
                { value: '95%', label: 'Satisfação das IES' },
              ].map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-2xl p-8">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Respostas para as dúvidas mais comuns sobre a parceria
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
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
          </div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section id="partnership-form" className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Solicite uma Parceria
              </h2>
              <p className="text-lg text-muted-foreground">
                Preencha o formulário e nossa equipe entrará em contato em até 48 horas
              </p>
            </div>

            {partnershipSubmitted ? (
              <div className="bg-card border border-primary/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Solicitação Enviada!
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Recebemos a solicitação de parceria da <strong>{partnershipForm.universityName}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Nossa equipe entrará em contato com <strong>{partnershipForm.contactName}</strong> no email{' '}
                  <strong>{partnershipForm.contactEmail}</strong> em até 48 horas úteis.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnershipSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Dados da Universidade</h4>
                  
                  <div>
                    <Label htmlFor="p-university-name">Nome da Universidade *</Label>
                    <Input
                      id="p-university-name"
                      value={partnershipForm.universityName}
                      onChange={(e) => setPartnershipForm({ ...partnershipForm, universityName: e.target.value })}
                      placeholder="Ex: Universidade Federal de Minas Gerais"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="p-cnpj">CNPJ</Label>
                      <Input
                        id="p-cnpj"
                        value={partnershipForm.cnpj}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, cnpj: e.target.value })}
                        placeholder="00.000.000/0000-00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="p-website">Website</Label>
                      <Input
                        id="p-website"
                        type="url"
                        value={partnershipForm.website}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, website: e.target.value })}
                        placeholder="https://universidade.edu.br"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="p-state">Estado (UF) *</Label>
                      <Input
                        id="p-state"
                        value={partnershipForm.state}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, state: e.target.value.toUpperCase().slice(0, 2) })}
                        placeholder="MG"
                        maxLength={2}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="p-city">Cidade *</Label>
                      <Input
                        id="p-city"
                        value={partnershipForm.city}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, city: e.target.value })}
                        placeholder="Belo Horizonte"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="p-students-count">Número de Alunos</Label>
                      <Select
                        value={partnershipForm.studentsCount}
                        onValueChange={(value) => setPartnershipForm({ ...partnershipForm, studentsCount: value })}
                      >
                        <SelectTrigger id="p-students-count">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="< 1.000">Menos de 1.000</SelectItem>
                          <SelectItem value="1.000 - 5.000">1.000 a 5.000</SelectItem>
                          <SelectItem value="5.000 - 10.000">5.000 a 10.000</SelectItem>
                          <SelectItem value="10.000 - 20.000">10.000 a 20.000</SelectItem>
                          <SelectItem value="> 20.000">Mais de 20.000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="p-courses">Principais Cursos</Label>
                      <Input
                        id="p-courses"
                        value={partnershipForm.coursesOffered}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, coursesOffered: e.target.value })}
                        placeholder="Ex: Administração, Engenharia, Design"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Dados do Contato</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="p-contact-name">Nome Completo *</Label>
                      <Input
                        id="p-contact-name"
                        value={partnershipForm.contactName}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, contactName: e.target.value })}
                        placeholder="Nome do responsável"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="p-contact-role">Cargo/Função</Label>
                      <Input
                        id="p-contact-role"
                        value={partnershipForm.contactRole}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, contactRole: e.target.value })}
                        placeholder="Ex: Coordenador de Extensão"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="p-contact-email">Email *</Label>
                      <Input
                        id="p-contact-email"
                        type="email"
                        value={partnershipForm.contactEmail}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, contactEmail: e.target.value })}
                        placeholder="contato@universidade.edu.br"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="p-contact-phone">Telefone</Label>
                      <Input
                        id="p-contact-phone"
                        value={partnershipForm.contactPhone}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, contactPhone: e.target.value })}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="p-message">Mensagem (Opcional)</Label>
                  <Textarea
                    id="p-message"
                    value={partnershipForm.message}
                    onChange={(e) => setPartnershipForm({ ...partnershipForm, message: e.target.value })}
                    placeholder="Conte-nos mais sobre o interesse da universidade em se tornar parceira..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={partnershipMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-semibold text-lg py-6"
                >
                  {partnershipMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando Solicitação...
                    </>
                  ) : (
                    'Solicitar Parceria'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Junte-se às Universidades Parceiras
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Mais de 200 instituições de ensino já confiam na Brasil Sustenta para conectar seus alunos ao mercado ESG
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-black font-semibold text-lg px-10"
              onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Solicitar Parceria Agora
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
