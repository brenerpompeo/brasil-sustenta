import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carolina Albuquerque',
    role: 'Diretora de Sustentabilidade',
    company: 'Petrobras',
    text: 'O projeto desenvolvido superou nossas expectativas. A equipe demonstrou profissionalismo e comprometimento excepcionais.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carolina',
  },
  {
    name: 'Roberto Martins',
    role: 'CEO',
    company: 'Natura',
    text: 'Trabalhar com o Brasil Sustenta nos permitiu acelerar nossa agenda ESG com soluções inovadoras e custo-efetivas.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
  },
  {
    name: 'Juliana Santos',
    role: 'Gerente de Inovação',
    company: 'Itaú',
    text: 'A qualidade dos talentos e a agilidade na formação dos squads tornaram nossa experiência excepcional.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden border-y border-border">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Depoimentos</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
            O que dizem os <span className="italic font-light text-primary">Parceiros</span>
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium">
            Líderes de multinacionais brasileiras já transformaram seus desafios com a nossa plataforma.
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
                <Quote className="w-10 h-10 text-primary/20 group-hover:text-primary transition-colors" />
              </div>

              {/* Testimonial Text */}
              <p className="text-[16px] font-medium text-foreground/90 leading-relaxed mb-10 flex-1 italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border flex-shrink-0 bg-secondary">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
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
