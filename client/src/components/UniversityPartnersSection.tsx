const universities = [
  { name: 'USP', fullName: 'Universidade de São Paulo' },
  { name: 'UFRJ', fullName: 'Universidade Federal do RJ' },
  { name: 'UNICAMP', fullName: 'Universidade Est. de Campinas' },
  { name: 'PUC', fullName: 'Pontifícia Universidade Católica' },
  { name: 'FGV', fullName: 'Fundação Getulio Vargas' },
  { name: 'UFMG', fullName: 'Universidade Federal de MG' },
];

const UniversityPartnersSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background border-b border-border relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Rede Acadêmica</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
            Parceiros <span className="italic font-light text-primary">Universitários</span>
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium">
            Conectados com a vanguarda das instituições de ensino superior do Brasil.
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
