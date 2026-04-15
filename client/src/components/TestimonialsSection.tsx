import { Building2, GraduationCap, School2 } from 'lucide-react';

const testimonials = [
  {
    name: 'Empresa',
    role: 'Buyer corporativo',
    company: 'RH / ESG / Inovacao',
    text: 'Preciso de um fluxo simples para transformar desafio em squad, enxergar o fit dos talentos e acompanhar entregas sem virar um projeto pesado de consultoria.',
    icon: Building2,
  },
  {
    name: 'Universidade',
    role: 'Buyer institucional',
    company: 'Extensao / Coordenacao',
    text: 'Preciso conectar meus alunos ao mercado com menos atrito, gerar relatorios e evidencias, e fazer a extensao caber na operacao academica.',
    icon: School2,
  },
  {
    name: 'Talento',
    role: 'Usuario final',
    company: 'Graduacao / Recem-formado',
    text: 'Quero sair da teoria, entrar em projeto real, construir portfolio verificavel e entender porque fui selecionado para aquele desafio.',
    icon: GraduationCap,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden border-y border-border">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Prova de valor</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
            O que cada lado da rede <span className="italic font-light text-primary">precisa enxergar</span>
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium">
            Em vez de inflar prova social, a home passa a explicitar o que empresa, universidade e talento querem validar para confiar no produto.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-[1.5rem] p-10 hover:border-primary/30 transition-all duration-300 relative group animate-fade-in-up flex flex-col shadow-sm hover:shadow-primary/5"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-8">
                <testimonial.icon className="w-10 h-10 text-primary/20 group-hover:text-primary transition-colors" />
              </div>

              {/* Testimonial Text */}
              <p className="text-[16px] font-medium text-foreground/90 leading-relaxed mb-10 flex-1 italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-6 border-t border-border">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-secondary">
                  <testimonial.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-[15px] text-foreground">{testimonial.name}</p>
                  <p className="text-[12px] font-semibold text-muted-foreground">
                    {testimonial.role} · <span className="text-primary">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
