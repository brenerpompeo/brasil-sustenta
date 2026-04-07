import { useState } from 'react';
import { Mail, Target, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';

const features = [
  { icon: Target, label: 'Oportunidades de impacto' },
  { icon: TrendingUp, label: 'Insights do mercado' },
  { icon: Users, label: 'Networking qualificado' },
];

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, insira seu e-mail');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      toast.success('Inscrição realizada com sucesso!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#F8FAFC] border-y border-paper-3 relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[800px] mx-auto">
        <div className="bg-white border border-paper-3 rounded-[2rem] p-10 lg:p-16 shadow-sm animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-[11px] font-bold tracking-widest uppercase text-leaf-2 mb-4">Comunidade</div>
            <h2 className="font-display text-[2rem] lg:text-[2.5rem] font-black text-ink leading-[1.1] mb-4">
              Fique por dentro do <span className="italic font-light text-leaf-1">ESG</span>
            </h2>
            <p className="text-[15px] text-ink-3 font-medium max-w-lg mx-auto">
              Insights, oportunidades e tendências do mercado ESG direto no seu e-mail.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-2.5 text-[13px] font-semibold text-ink-2">
                  <div className="w-8 h-8 bg-paper border border-paper-3 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-leaf-1" />
                  </div>
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 h-12 bg-paper border border-paper-3 rounded-xl text-[14px] font-medium text-ink placeholder:text-ink-4 focus:outline-none focus:ring-2 focus:ring-leaf-2/30 focus:border-leaf-2 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-ink hover:bg-ink-1 text-white font-bold text-[14px] h-12 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? 'Inscrevendo...' : 'Inscrever-se'}
              </button>
            </div>
            <p className="text-[11px] text-ink-4 text-center mt-4 font-medium">
              Sem spam. Cancele quando quiser.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
