const universities = [
  { name: 'USP', fullName: 'Universidade de São Paulo' },
  { name: 'UFRJ', fullName: 'Universidade Federal do Rio de Janeiro' },
  { name: 'UNICAMP', fullName: 'Universidade Estadual de Campinas' },
  { name: 'PUC', fullName: 'Pontifícia Universidade Católica' },
  { name: 'FGV', fullName: 'Fundação Getulio Vargas' },
  { name: 'UFMG', fullName: 'Universidade Federal de Minas Gerais' },
];

const UniversityPartnersSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Parceiros Universitários
          </h2>
          <p className="text-xl text-muted-foreground">
            Conectados com as melhores instituições de ensino do Brasil
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {universities.map((university, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer aspect-square"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                  {university.name}
                </p>
                <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {university.fullName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniversityPartnersSection;
