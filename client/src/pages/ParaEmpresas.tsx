import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/ContactForm';
import { 
  Building2, 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Zap
} from 'lucide-react';

const ParaEmpresas = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Talentos Qualificados',
      description: 'Acesso a jovens universitários pré-selecionados com habilidades em ESG, sustentabilidade e inovação.'
    },
    {
      icon: Target,
      title: 'Projetos Sob Medida',
      description: 'Squads personalizados de acordo com as necessidades específicas do seu projeto de impacto.'
    },
    {
      icon: TrendingUp,
      title: 'Impacto Mensurável',
      description: 'Acompanhe métricas de impacto social e ambiental geradas pelos projetos desenvolvidos.'
    },
    {
      icon: Shield,
      title: 'Gestão Simplificada',
      description: 'Plataforma completa para gerenciar projetos, equipes e avaliações em um só lugar.'
    },
    {
      icon: Award,
      title: 'Reputação ESG',
      description: 'Fortaleça a imagem da sua empresa com práticas sustentáveis e responsabilidade social.'
    },
    {
      icon: BarChart3,
      title: 'ROI Comprovado',
      description: 'Investimento acessível com retorno garantido em inovação e desenvolvimento sustentável.'
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Publique seu Projeto',
      description: 'Descreva o desafio ESG que sua empresa precisa resolver e os requisitos do squad.'
    },
    {
      step: '02',
      title: 'Receba Candidaturas',
      description: 'Jovens talentos demonstram interesse e nossa equipe faz uma pré-seleção qualificada.'
    },
    {
      step: '03',
      title: 'Monte seu Squad',
      description: 'Escolha os talentos ideais e nossa plataforma forma o squad perfeito para seu projeto.'
    },
    {
      step: '04',
      title: 'Acompanhe e Avalie',
      description: 'Gerencie o projeto, acompanhe entregas e avalie o desempenho do squad em tempo real.'
    },
  ];

  const plans = [
    {
      name: 'Squad Box Starter',
      price: 'R$ 15.000',
      period: '/projeto',
      description: 'Ideal para projetos pontuais',
      features: [
        'Squad de 3-5 talentos',
        'Duração de 3 meses',
        'Acompanhamento mensal',
        'Relatório de impacto final',
        'Suporte por e-mail'
      ]
    },
    {
      name: 'Squad Digital Impact',
      price: 'R$ 28.000',
      period: '/projeto',
      description: 'Para projetos de transformação digital',
      features: [
        'Squad de 5-7 talentos especializados',
        'Duração de 4 meses',
        'Acompanhamento quinzenal',
        'Relatórios de impacto mensais',
        'Suporte prioritário',
        'Acesso a ferramentas premium'
      ],
      highlighted: true
    },
    {
      name: 'Squad ODS Accelerator',
      price: 'R$ 38.000',
      period: '/projeto',
      description: 'Projetos complexos alinhados aos ODS',
      features: [
        'Squad de 7-10 talentos multidisciplinares',
        'Duração de 6 meses',
        'Acompanhamento semanal',
        'Dashboard de métricas em tempo real',
        'Consultoria ESG incluída',
        'Certificação de impacto'
      ]
    },
  ];

  const testimonials = [
    {
      company: 'TechCorp Brasil',
      logo: <Building2 className="text-primary" size={36} />,
      text: 'O Brasil Sustenta nos conectou com talentos excepcionais que transformaram nossa estratégia ESG. Em 4 meses, desenvolvemos 3 projetos de impacto com ROI comprovado.',
      author: 'Maria Silva',
      role: 'Diretora de Sustentabilidade'
    },
    {
      company: 'GreenEnergy SA',
      logo: <Zap className="text-sun-2" size={36} />,
      text: 'Contratamos um squad para desenvolver nossa plataforma de monitoramento de carbono. O resultado superou expectativas e ainda ganhamos o prêmio de inovação sustentável.',
      author: 'João Santos',
      role: 'CEO'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-30"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Para Empresas</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Conecte sua Empresa a{' '}
              <span className="text-primary">Talentos ESG</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transforme desafios de sustentabilidade em oportunidades de inovação com squads de jovens talentos universitários especializados em ESG.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login/empresa">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-semibold">
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Ver Como Funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Por que escolher o Brasil Sustenta?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A plataforma que conecta empresas a jovens talentos para projetos de impacto ESG com resultados mensuráveis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Como Funciona o Processo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e eficiente que conecta empresas a talentos em 4 etapas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
                  <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nossos Modelos de Squad
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o modelo ideal para o seu projeto ESG. Todos incluem talentos pré-selecionados e acompanhamento profissional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-card border rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'border-border'
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-block px-3 py-1 bg-primary text-black text-sm font-semibold rounded-full mb-4">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login/empresa">
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-primary hover:bg-primary/90 text-black'
                        : 'bg-card border border-border hover:bg-primary/10'
                    }`}
                  >
                    Começar Projeto
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              O que dizem nossos Parceiros
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empresas líderes do Brasil já transformaram seus desafios ESG em resultados concretos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.logo}</div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.company}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.author} • {testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pronto para Gerar Impacto?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a mais de 200 empresas que já transformaram seus desafios ESG em oportunidades de inovação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login/empresa">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-semibold">
                  Criar Conta Gratuita
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Falar com Consultor
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParaEmpresas;
