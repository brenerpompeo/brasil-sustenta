import { BarChart3, Lightbulb, Link2, Megaphone } from 'lucide-react';
import { Link } from 'wouter';

const talents = [
  {
    title: 'Pesquisa, dados e indicadores',
    context: 'Perfis de administracao, economia, engenharia, relacoes internacionais e areas correlatas.',
    skills: ['Benchmark', 'Pesquisa aplicada', 'Indicadores', 'Analise ESG'],
    bio: 'Transformam desafios abertos em hipoteses, leituras de mercado, estrutura de indicadores e recomendações praticas.',
    icon: BarChart3,
  },
  {
    title: 'Produto, UX e operacao',
    context: 'Perfis de design, computacao, produto, service design e tecnologia.',
    skills: ['UX', 'Prototipagem', 'Fluxos', 'Solucao digital'],
    bio: 'Estruturam jornadas, prototipos, interfaces e operacoes capazes de levar a tese de impacto para a experiencia real.',
    icon: Lightbulb,
  },
  {
    title: 'Narrativa, comunicacao e engajamento',
    context: 'Perfis de comunicacao, publicidade, jornalismo, marketing e areas criativas.',
    skills: ['Storytelling', 'Conteudo', 'Marca', 'Engajamento'],
    bio: 'Traduzem metas e entregas em mensagem clara para stakeholders, comunidades, liderancas internas e empregabilidade do projeto.',
    icon: Megaphone,
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
              Os perfis que <span className="italic font-light text-primary">entram em squad</span>
            </h2>
            <p className="text-[1.125rem] text-muted-foreground font-medium">
              Em vez de exibir personas ficticias, a plataforma deixa claro o tipo de repertorio que realmente compoe uma entrega forte.
            </p>
          </div>
          <Link href="/para-empresas" className="inline-flex items-center justify-center bg-primary text-black text-[14px] font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 hover:shadow-primary/10 hover:-translate-y-0.5 transition-all w-full md:w-auto">
            Explorar formatos de squad
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary/50 text-primary">
                  <talent.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground leading-tight mb-1 tracking-tighter">{talent.title}</h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <Link2 className="w-3 h-3" /> Pronto para projetos interdisciplinares
                  </div>
                </div>
              </div>

              {/* Data Rows */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-[13px] text-muted-foreground font-medium">
                  <BarChart3 className="w-4 h-4 text-muted-foreground/40" />
                  {talent.context}
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
              <p className="text-[14px] text-muted-foreground/80 leading-relaxed mt-auto pt-6 border-t border-border">
                {talent.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TalentsSection;
