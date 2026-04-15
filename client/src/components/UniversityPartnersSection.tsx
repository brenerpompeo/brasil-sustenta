const universities = [
  { name: 'Extensao', fullName: 'Projetos reais conectados ao curriculo' },
  { name: 'NDE', fullName: 'Evidencias e relatorios para coordenacao' },
  { name: 'Inovacao', fullName: 'Parcerias com desafios de empresas' },
  { name: 'Polos', fullName: 'Distribuicao regional de talento e oferta' },
  { name: 'Labs', fullName: 'Ligacao entre pesquisa aplicada e mercado' },
  { name: 'Carreiras', fullName: 'Empregabilidade e portfolio observavel' },
];

const UniversityPartnersSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background border-b border-border relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Rede Acadêmica</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
            Camada universitaria pronta para <span className="italic font-light text-primary">escala</span>
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium">
            O papel da universidade nao e figurativo. Ele entra como canal de supply, prova institucional e operacao de extensao.
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-[1000px] mx-auto">
          {universities.map((university, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center hover:border-primary/40 hover:shadow-primary/5 transition-all duration-300 group cursor-default aspect-square animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <p className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-none tracking-tighter">
                {university.name}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground/40 mt-3 text-center leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-[0.2em] uppercase">
                {university.fullName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniversityPartnersSection;
