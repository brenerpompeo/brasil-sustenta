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
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-y border-paper-3">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-widest uppercase text-ink-4 mb-4">Social Proof</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-black text-ink leading-[1.1] mb-6">
            O que dizem os <span className="italic font-light text-leaf-1">Parceiros</span>
          </h2>
          <p className="text-[1.125rem] text-ink-3 font-medium">
            Líderes de multinacionais brasileiras já transformaram seus desafios com a nossa plataforma.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-paper border border-paper-3 rounded-[1.5rem] p-10 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 relative group animate-fade-in-up flex flex-col"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-8">
                <Quote className="w-10 h-10 text-leaf-2/30 group-hover:text-leaf-1/30 transition-colors" />
              </div>

              {/* Testimonial Text */}
              <p className="text-[16px] font-medium text-ink-2 leading-relaxed mb-10 flex-1">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-6 border-t border-paper-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-paper-3 flex-shrink-0 bg-paper">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[15px] text-ink">{testimonial.name}</p>
                  <p className="text-[12px] font-semibold text-ink-3">
                    {testimonial.role} · <span className="text-leaf-1">{testimonial.company}</span>
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
