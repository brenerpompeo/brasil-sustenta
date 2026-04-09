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

import { SEO } from '@/components/SEO';

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
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <SEO 
        title="Para Empresas | ESG na Prática com Talentos em Ascensão"
        description="Reduza os custos e acelere o impacto do seu ESG corporativo integrando jovens talentos apaixonados por sustentabilidade às suas squads e projetos."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--tw-gradient-from)_0%,transparent_70%)] from-primary/10 via-transparent to-transparent opacity-50"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Para Empresas</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 leading-[1.05] tracking-tighter animate-fade-in-up">
              Conecte sua Empresa a<br />
              <span className="italic font-light text-primary">Talentos ESG</span>
            </h1>
            <p className="text-[1.125rem] text-muted-foreground mb-12 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up delay-100">
              Transforme desafios de sustentabilidade em oportunidades de inovação com squads de jovens talentos universitários especializados em ESG.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up delay-200">
              <Link href="/login/empresa">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-all hover:scale-[1.02] shadow-xl shadow-primary/10">
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 border-border text-foreground font-bold rounded-xl hover:bg-white/5 transition-all">
                Ver Como Funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 lg:py-32 bg-secondary/5 border-b border-border">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tighter">
              Por que escolher o <span className="italic font-light text-primary">Brasil Sustenta?</span>
            </h2>
            <p className="text-[1.125rem] text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              A plataforma que conecta empresas a jovens talentos para projetos de impacto ESG com resultados mensuráveis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-secondary border border-border rounded-[12px] flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                  <benefit.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4 tracking-tighter">{benefit.title}</h3>
                <p className="text-[14px] text-muted-foreground font-medium leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 lg:py-32 bg-background border-b border-border">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tighter">
              Como Funciona o <span className="italic font-light text-primary">Processo</span>
            </h2>
            <p className="text-[1.125rem] text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Um processo simples e eficiente que conecta empresas a talentos em 4 etapas estratégicas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-card border border-border rounded-2xl p-10 hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="font-display text-6xl font-bold text-primary/10 mb-6 group-hover:text-primary/20 transition-colors">{item.step}</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4 tracking-tighter">{item.title}</h3>
                  <p className="text-[14px] text-muted-foreground font-medium leading-relaxed">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-border group-hover:text-primary/30 transition-colors" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 lg:py-32 bg-secondary/5 border-b border-border">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tighter">
              Nossos Modelos de <span className="italic font-light text-primary">Squad</span>
            </h2>
            <p className="text-[1.125rem] text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Escolha o modelo ideal para o seu projeto ESG. Todos incluem talentos pré-selecionados e acompanhamento profissional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-card border rounded-2xl p-10 transition-all duration-500 animate-fade-in-up flex flex-col ${
                  plan.highlighted
                    ? 'border-primary shadow-2xl shadow-primary/10 scale-105 z-10'
                    : 'border-border hover:border-primary/20'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.highlighted && (
                  <div className="inline-block self-start px-3 py-1 bg-primary text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 italic">
                    Mais Popular
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold text-foreground mb-2 tracking-tighter">{plan.name}</h3>
                <p className="text-[14px] text-muted-foreground mb-8 font-medium leading-relaxed">{plan.description}</p>
                <div className="mb-8">
                  <span className="font-display text-4xl font-bold text-primary tracking-tighter">{plan.price}</span>
                  <span className="text-muted-foreground/60 text-sm font-semibold ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-muted-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login/empresa">
                  <Button
                    className={`w-full h-12 rounded-xl font-bold text-[13px] transition-all hover:scale-[1.02] ${
                      plan.highlighted
                        ? 'bg-primary hover:bg-primary/90 text-black shadow-lg shadow-primary/20'
                        : 'bg-secondary border border-border text-foreground hover:bg-white/5'
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
      <section className="py-24 lg:py-32 bg-background border-b border-border">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tighter">
              O que dizem nossos <span className="italic font-light text-primary">Parceiros</span>
            </h2>
            <p className="text-[1.125rem] text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Empresas líderes do Brasil já transformaram seus desafios ESG em resultados concretos conosco.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-10 hover:border-primary/20 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-secondary border border-border rounded-xl flex items-center justify-center text-primary transform -rotate-3 transition-transform group-hover:rotate-0">
                    {testimonial.logo}
                  </div>
                  <div className="ml-5">
                    <div className="font-display text-lg font-bold text-foreground tracking-tighter">{testimonial.company}</div>
                    <div className="text-[12px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
                      {testimonial.author} • {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-[15px] text-muted-foreground italic leading-relaxed font-medium">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 lg:py-32 bg-secondary/5 border-b border-border relative overflow-hidden">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container px-6 lg:px-8 max-w-[900px] mx-auto relative z-10">
          <div className="text-center animate-fade-in-up">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter leading-[1.05]">
              Pronto para Gerar<br /><span className="italic font-light text-primary">Impacto Real</span>?
            </h2>
            <p className="text-[1.125rem] text-muted-foreground font-medium mb-12 max-w-xl mx-auto leading-relaxed">
              Junte-se a mais de 200 empresas que já transformaram seus desafios ESG em oportunidades de inovação.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/login/empresa">
                <Button size="lg" className="h-14 px-10 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl shadow-xl shadow-primary/10 transition-all hover:scale-[1.02]">
                  Criar Conta Gratuita
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-10 border-border text-foreground font-bold rounded-xl hover:bg-white/5 transition-all">
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
