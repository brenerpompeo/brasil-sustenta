import { Star, MapPin, Calendar } from 'lucide-react';
import { Link } from 'wouter';

const talents = [
  {
    name: 'Ana Carolina Silva',
    university: 'USP',
    course: 'Engenharia Ambiental',
    year: '3º ano',
    rating: 4.9,
    location: 'S. Paulo, SP',
    skills: ['Sustentabilidade', 'Gestão', 'Análise de Dados'],
    bio: 'Focada em soluções de impacto tangível e estruturação de projetos ESG em empresas multinacionais.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
  },
  {
    name: 'Pedro Henrique Costa',
    university: 'UFRJ',
    course: 'Administração',
    year: '4º ano',
    rating: 5.0,
    location: 'Rio de Janeiro',
    skills: ['ESG', 'Estratégia', 'Relatórios Sustentáveis'],
    bio: 'Desenvolve frameworks para relatórios corporativos com métricas rigorosas de governança no setor logístico.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
  },
  {
    name: 'Mariana Oliveira',
    university: 'UNICAMP',
    course: 'Design de Produto',
    year: '2º ano',
    rating: 4.8,
    location: 'Campinas, SP',
    skills: ['UX', 'Service Design', 'Prototipagem'],
    bio: 'Cria produtos circulares otimizando a experiência do usuário, focada em métricas de aderência e retenção.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
  },
];

const TalentsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border">
      <div className="absolute top-0 right-0 w-full h-[600px] bg-primary/5 rounded-bl-full blur-[120px] pointer-events-none"></div>

      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 animate-fade-in-up">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Elite Acadêmica</div>
            <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6 tracking-tighter">
              O futuro <span className="italic font-light text-primary">começa com eles.</span>
            </h2>
            <p className="text-[1.125rem] text-muted-foreground font-medium">
              Vistos rigorosamente pelas melhores universidades do país.
            </p>
          </div>
          <Link href="/para-empresas" className="inline-flex items-center justify-center bg-primary text-black text-[14px] font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 hover:shadow-primary/10 hover:-translate-y-0.5 transition-all w-full md:w-auto">
            Explorar Perfis
          </Link>
        </div>

        {/* Talents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talents.map((talent, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-[1.5rem] p-8 hover:border-primary/30 transition-all duration-300 group flex flex-col h-full animate-fade-in-up shadow-sm hover:shadow-primary/5"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Header Box */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-secondary border border-border flex-shrink-0">
                  <img src={talent.image} alt={talent.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground leading-tight mb-1 tracking-tighter">{talent.name}</h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <Star className="w-3 h-3 fill-primary" /> {talent.rating} Rating
                  </div>
                </div>
              </div>

              {/* Data Rows */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-[13px] text-muted-foreground font-medium">
                  <Calendar className="w-4 h-4 text-muted-foreground/40" />
                  {talent.course} ({talent.university})
                </div>
                <div className="flex items-center gap-3 text-[13px] text-muted-foreground font-medium">
                  <MapPin className="w-4 h-4 text-muted-foreground/40" />
                  {talent.location}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {talent.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-secondary text-muted-foreground border border-border text-[10px] font-bold tracking-[0.1em] uppercase rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-[14px] text-muted-foreground/80 leading-relaxed mt-auto pt-6 border-t border-border italic">
                "{talent.bio}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TalentsSection;
