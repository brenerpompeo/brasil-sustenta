import { useState } from 'react';
import { Mail, Target, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const features = [
  { icon: Target, label: 'Oportunidades de impacto' },
  { icon: TrendingUp, label: 'Insights do Mercado' },
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
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Inscrição realizada com sucesso!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
      <div className="container px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content Card */}
          <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Fique por dentro das{' '}
                <span className="text-primary">novidades ESG</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Receba insights, oportunidades de impacto e tendências do
                mercado ESG diretamente no seu e-mail.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-muted-foreground"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
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
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-background border-border"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-black font-semibold h-12 px-8"
                >
                  {loading ? 'Inscrevendo...' : 'Inscrever-se'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Sem spam. Cancele quando quiser.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
