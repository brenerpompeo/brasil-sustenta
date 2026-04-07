import { useState } from 'react';
import { Link } from 'wouter';
import { School, Mail, Lock, User, Phone, MapPin, Building2, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getLoginUrl } from '@/const';

const LoginUniversidade = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    universityName: '',
    acronym: '',
    cnpj: '',
    state: '',
    city: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Manus OAuth with userType parameter
    window.location.href = `${getLoginUrl()}&userType=universidade`;
  };

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="min-h-screen bg-paper flex font-body selection:bg-violet-3 selection:text-violet">
      {/* ── LEFT SIDE: ACADEMIC MARKETING ── */}
      <div className="hidden lg:flex flex-1 bg-ink relative overflow-hidden items-center justify-center p-20">
        <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-violet/10 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-violet/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-xl">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-16 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Voltar para a Home</span>
            </button>
          </Link>

          <div className="mb-12">
            <div className="w-16 h-16 bg-violet-2/20 rounded-2xl flex items-center justify-center mb-10 border border-violet/30 shadow-xl shadow-violet/10">
              <School className="w-8 h-8 text-violet-3" />
            </div>
            <h2 className="font-display text-[3.5rem] font-black text-white leading-[1.05] mb-8">
              Sua Instituição no <span className="italic font-light text-violet-3">Centro do Impacto</span>.
            </h2>
            <p className="text-xl text-white/60 leading-relaxed font-medium">
              Conecte seus alunos ao mercado ESG e fortaleça o pilar de extensão universitária com projetos reais e auditáveis.
            </p>
          </div>

          <div className="space-y-8 mt-16 border-t border-white/5 pt-12">
            {[
              { icon: School, title: "Empregabilidade Real", desc: "Destaque seus alunos em projetos práticos com grandes corporações." },
              { icon: Building2, title: "Visibilidade de Marca", desc: "Sua universidade reconhecida como polo de formação sustentável." },
              { icon: MapPin, title: "Impacto Regional", desc: "Projetos que transformam comunidades locais e geram horas de extensão." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet/20 transition-colors">
                  <item.icon className="w-5 h-5 text-violet-3/70 group-hover:text-violet-3 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-snug mb-1">{item.title}</h3>
                  <p className="text-sm text-white/40 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT SIDE: AUTHENTICATION FORM ── */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 relative bg-paper">
        <div className="w-full max-w-[440px] animate-fade-in-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-12">
             <Link href="/">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet rounded-xl flex items-center justify-center">
                    <span className="text-white font-black text-xs">BS</span>
                  </div>
                  <span className="font-display text-xl font-black text-ink">Brasil Sustenta</span>
                </div>
             </Link>
          </div>

          {/* Form Header */}
          <div className="mb-10">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-violet-2 mb-3">Portal Acadêmico</div>
            <h1 className="font-display text-4xl font-black text-ink leading-tight mb-3">
              {isLogin ? 'Bem-vindo ao Portal' : 'Seja Parceira'}
            </h1>
            <p className="text-[15px] text-ink-3 font-medium leading-relaxed">
              {isLogin 
                ? 'Acesse a gestão de convênios e acompanhe o impacto acadêmico dos seus alunos.' 
                : 'Solicite adesão à rede e conecte sua instituição ao ecossistema de inovação social.'}
            </p>
          </div>

          {/* Form Actions */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <Label htmlFor="universityName" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Nome da Instituição</Label>
                  <div className="relative">
                    <School className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                    <Input
                      id="universityName"
                      placeholder="Universidade Federal de..."
                      className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-violet-2/20 focus:border-violet-2 transition-all font-medium text-ink"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="acronym" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Sigla</Label>
                    <Input
                      id="acronym"
                      placeholder="Ex: USP"
                      className="h-12 bg-white border-paper-3 rounded-xl focus:ring-violet-2/20 focus:border-violet-2 transition-all font-medium text-ink"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="state" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Estado</Label>
                    <div className="relative">
                      <select
                        id="state"
                        className="w-full h-12 px-4 rounded-xl border border-paper-3 bg-white text-ink font-medium text-sm appearance-none outline-none focus:ring-2 focus:ring-violet-2/20 focus:border-violet-2 transition-all"
                      >
                        <option value="">UF</option>
                        {brazilianStates.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-ink-4 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contactPerson" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Responsável pela Parceria</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                    <Input
                      id="contactPerson"
                      placeholder="Nome do Coordenador"
                      className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-violet-2/20 focus:border-violet-2 transition-all font-medium text-ink"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest text-ink-4">E-mail Institucional (@edu.br)</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@universidade.edu.br"
                    className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-violet-2/20 focus:border-violet-2 transition-all font-medium text-ink"
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center pr-1">
                    <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Senha</Label>
                    <button type="button" className="text-[11px] font-bold text-violet-2 hover:underline">Esqueceu?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-violet-2/20 focus:border-violet-2 transition-all font-medium text-ink"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-ink hover:bg-ink-2 text-white font-bold h-14 rounded-xl shadow-lg shadow-violet/10 transition-all hover:scale-[1.01] mt-4"
            >
              {isLogin ? 'Entrar no Portal Institucional' : 'Solicitar Token de Adesão'}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-8 text-center border-t border-paper-3 pt-8">
            <p className="text-[14px] text-ink-3 font-medium">
              {isLogin ? 'Ainda não é parceira?' : 'Já possui acesso institucional?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-violet-2 hover:text-violet font-black transition-colors"
              >
                {isLogin ? 'Solicite Parceria' : 'Acesse sua Conta'}
              </button>
            </p>
          </div>

          {/* Other Login Options */}
          <div className="mt-12">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-paper-3"></div></div>
              <div className="relative flex justify-center text-[11px] font-black uppercase tracking-[0.2em]"><span className="bg-paper px-4 text-ink-4">Outros Acessos</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/login/empresa">
                <button className="w-full py-4 rounded-xl border border-paper-3 hover:border-leaf-2/30 hover:bg-leaf-5/10 text-xs font-black uppercase tracking-widest text-ink transition-all">Empresa</button>
              </Link>
              <Link href="/login/jovem">
                <button className="w-full py-4 rounded-xl border border-paper-3 hover:border-sky-2/30 hover:bg-sky-5/10 text-xs font-black uppercase tracking-widest text-ink transition-all">Jovem Talento</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUniversidade;
