import { Star, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const talents = [
  {
    name: 'Ana Carolina Silva',
    university: 'Universidade de São Paulo',
    course: 'Engenharia Ambiental',
    year: '3º ano',
    rating: 4.9,
    location: 'São Paulo, SP',
    skills: ['Sustentabilidade', 'Gestão Ambiental', 'Análise de Dados'],
    bio: 'Apaixonada por soluções sustentáveis e inovação ambiental. Experiência em projetos de economia circular e gestão de resíduos.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
  },
  {
    name: 'Pedro Henrique Costa',
    university: 'Universidade Federal do Rio de Janeiro',
    course: 'Administração',
    year: '4º ano',
    rating: 5.0,
    location: 'Rio de Janeiro, RJ',
    skills: ['ESG', 'Estratégia', 'Relatórios de Sustentabilidade'],
    bio: 'Especialista em estratégias ESG e relatórios de sustentabilidade corporativa. Focado em impacto social e governança.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
  },
  {
    name: 'Mariana Oliveira',
    university: 'Universidade Estadual de Campinas',
    course: 'Design de Produto',
    year: '2º ano',
    rating: 4.8,
    location: 'Campinas, SP',
    skills: ['UI/UX Design', 'Design Thinking', 'Prototipagem'],
    bio: 'Criativa e focada em experiências digitais inovadoras. Experiência em projetos de impacto social e design centrado no usuário.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
  },
];

const TalentsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Conheça nossos <span className="text-primary">Talentos</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Estudantes universitários brasileiros prontos para transformar
            desafios ESG em soluções inovadoras para sua empresa.
          </p>
        </div>

        {/* Talents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {talents.map((talent, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
            >
              {/* Profile Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="w-32 h-32 rounded-full border-4 border-card group-hover:scale-110 transition-transform duration-300"
                />
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-foreground">{talent.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name & University */}
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {talent.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {talent.university} • {talent.year}
                </p>

                {/* Course & Location */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{talent.course}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-4 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{talent.location}</span>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {talent.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {talent.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className="w-full border-primary/50 text-primary hover:bg-primary/10"
                >
                  Ver Perfil Completo
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-black font-semibold px-8"
          >
            Ver Todos os Talentos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TalentsSection;
