import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carolina Albuquerque',
    role: 'Diretora de Sustentabilidade',
    company: 'Petrobras',
    rating: 5,
    text: 'O projeto desenvolvido superou nossas expectativas. A equipe demonstrou profissionalismo e comprometimento excepcionais.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carolina',
  },
  {
    name: 'Roberto Martins',
    role: 'CEO',
    company: 'Natura',
    rating: 5,
    text: 'Trabalhar com o Brasil Sustenta nos permitiu acelerar nossa agenda ESG com soluções inovadoras e custo-efetivas.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
  },
  {
    name: 'Juliana Santos',
    role: 'Gerente de Inovação',
    company: 'Itaú',
    rating: 5,
    text: 'A qualidade dos talentos e a agilidade na formação dos squads tornaram nossa experiência excepcional.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            O Que dizem nossos <span className="text-primary">Parceiros</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Empresas líderes do Brasil já transformaram seus desafios ESG em
            resultados concretos através da nossa plataforma.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-primary/20"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
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
