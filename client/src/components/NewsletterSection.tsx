import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

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
    <section className="border-t border-white/[0.05] bg-[--paper] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="border border-white/[0.05] p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
                COMUNIDADE // RADAR_ESG
              </p>
              <h2
                className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
              >
                Fique por dentro do
                <span className="font-light italic text-[--leaf]"> ESG</span>.
              </h2>
              <p className="mt-6 font-sans text-[14px] font-medium leading-relaxed text-[--ink]/40">
                Insights, oportunidades e tendências do mercado ESG direto no seu e-mail. Sem spam. Cancele quando quiser.
              </p>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-3">
                {['Oportunidades de impacto', 'Insights de mercado', 'Networking qualificado'].map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/[0.07] px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[--ink]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[--ink]/30" />
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 font-mono text-[13px] text-[--ink] placeholder:text-[--ink]/30 focus:border-[--leaf]/40 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-11 cursor-pointer items-center justify-center border border-[--leaf] bg-[--leaf] px-7 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[--paper] shadow-[0_0_24px_rgba(0,255,133,0.22)] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Inscrevendo...' : 'Inscrever-se'}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
