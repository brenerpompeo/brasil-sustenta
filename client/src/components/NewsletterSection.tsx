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
    <section className="py-24 lg:py-32 bg-background border-y border-border relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[800px] mx-auto">
        <div className="bg-card border border-border rounded-[2rem] p-10 lg:p-16 shadow-2xl animate-fade-in-up shadow-primary/5">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Comunidade</div>
            <h2 className="font-display text-[2rem] lg:text-[3rem] font-bold text-foreground leading-[1.1] mb-4">
              Fique por dentro do <span className="italic font-light text-primary">ESG</span>
            </h2>
            <p className="text-[15px] text-muted-foreground font-medium max-w-lg mx-auto">
              Insights, oportunidades e tendências do mercado ESG direto no seu e-mail.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-2.5 text-[13px] font-semibold text-foreground/80">
                  <div className="w-8 h-8 bg-secondary border border-border rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
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
                  className="w-full pl-11 pr-4 h-12 bg-secondary border border-border rounded-xl text-[14px] font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-black font-bold text-[14px] h-12 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Inscrevendo...' : 'Inscrever-se'}
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground text-center mt-4 font-medium">
              Sem spam. Cancele quando quiser.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
