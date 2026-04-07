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
    <section className="py-24 lg:py-32 bg-[#F8FAFC] border-b border-paper-3 relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-widest uppercase text-sky-1 mb-4">Rede Acadêmica</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-black text-ink leading-[1.1] mb-6">
            Parceiros <span className="italic font-light text-sky-1">Universitários</span>
          </h2>
          <p className="text-[1.125rem] text-ink-3 font-medium">
            Conectados com a vanguarda das instituições de ensino superior do Brasil.
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-[1000px] mx-auto">
          {universities.map((university, index) => (
            <div
              key={index}
              className="bg-white border border-paper-3 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-sky-1/40 hover:shadow-[0_8px_30px_rgba(56,189,248,0.08)] transition-all duration-300 group cursor-default aspect-square animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <p className="font-display text-2xl font-black text-ink group-hover:text-sky-1 transition-colors leading-none">
                {university.name}
              </p>
              <p className="text-[11px] font-bold text-ink-4 mt-3 text-center leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider uppercase">
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
