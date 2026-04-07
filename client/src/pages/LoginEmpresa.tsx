import { useState } from 'react';
import { Link } from 'wouter';
import { Building2, Mail, Lock, Globe, Briefcase, Users, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getLoginUrl } from '@/const';

const LoginEmpresa = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    industry: '',
    size: 'media',
    website: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Manus OAuth with userType parameter
    window.location.href = `${getLoginUrl()}&userType=empresa`;
  };

  return (
    <div className="min-h-screen bg-paper flex font-body selection:bg-leaf-5 selection:text-leaf">
      {/* ── LEFT SIDE: HEAVY MARKETING / CONTEXT ── */}
      <div className="hidden lg:flex flex-1 bg-ink relative overflow-hidden items-center justify-center p-20">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-leaf/10 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-leaf/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-xl">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-16 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Voltar para a Home</span>
            </button>
          </Link>

          <div className="mb-12">
            <div className="w-16 h-16 bg-leaf-2/20 rounded-2xl flex items-center justify-center mb-10 border border-leaf/30 shadow-xl shadow-leaf/10">
              <Building2 className="w-8 h-8 text-leaf-3" />
            </div>
            <h2 className="font-display text-[3.5rem] font-black text-white leading-[1.05] mb-8">
              Sua Empresa no <span className="italic font-light text-leaf-3">Próximo Nível</span> ESG.
            </h2>
            <p className="text-xl text-white/60 leading-relaxed font-medium">
              Conectamos corporações a talentos de elite para resolver desafios reais de sustentabilidade e inovação social.
            </p>
          </div>

          <div className="space-y-8 mt-16 border-t border-white/5 pt-12">
            {[
              { icon: Users, title: "Squads Multidisciplinares", desc: "Equipes qualificadas prontas para execução imediata." },
              { icon: Briefcase, title: "Gestão de Impacto", desc: "Dashboards em tempo real para monitorar cada entrega." },
              { icon: Globe, title: "Conformidade ODS", desc: "Relatórios prontos para auditorias e certificações ESG." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-leaf/20 transition-colors">
                  <item.icon className="w-5 h-5 text-leaf-3/70 group-hover:text-leaf-3 transition-colors" />
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
        <div className="w-full max-w-[420px] animate-fade-in-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-12">
             <Link href="/">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-leaf rounded-xl flex items-center justify-center">
                    <span className="text-white font-black text-xs">BS</span>
                  </div>
                  <span className="font-display text-xl font-black text-ink">Brasil Sustenta</span>
                </div>
             </Link>
          </div>

          {/* Form Header */}
          <div className="mb-10">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-leaf-1 mb-3">Portal Corporativo</div>
            <h1 className="font-display text-4xl font-black text-ink leading-tight mb-3">
              {isLogin ? 'Bem-vindo ao Impacto' : 'Junte-se à Rede'}
            </h1>
            <p className="text-[15px] text-ink-3 font-medium leading-relaxed">
              {isLogin 
                ? 'Acesse o portal da sua empresa para gerenciar squads e projetos ativos.' 
                : 'Cadastre sua organização e comece a formar squads de alto impacto hoje.'}
            </p>
          </div>

          {/* Form Actions */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1.5">
                  <Label htmlFor="companyName" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Nome da Empresa</Label>
                  <div className="relative mt-1">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Ex: Sustentabilidade S.A."
                      className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-leaf-5 focus:border-leaf-3 transition-all font-medium text-ink"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="cnpj" className="text-[11px] font-black uppercase tracking-widest text-ink-4">CNPJ</Label>
                    <Input
                      id="cnpj"
                      type="text"
                      placeholder="00.000.000/0001-00"
                      className="h-12 bg-white border-paper-3 rounded-xl focus:ring-leaf-5 focus:border-leaf-3 transition-all font-medium text-ink"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="size" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Porte</Label>
                    <div className="relative">
                      <select
                        id="size"
                        className="w-full h-12 px-4 rounded-xl border border-paper-3 bg-white text-ink font-medium text-sm appearance-none outline-none focus:ring-2 focus:ring-leaf-5 focus:border-leaf-3 transition-all"
                      >
                        <option value="pequena">Até 50 colab.</option>
                        <option value="media">50 a 500 colab.</option>
                        <option value="grande">Acima de 500</option>
                      </select>
                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-ink-4 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="website" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Website ou LinkedIn</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://..."
                      className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-leaf-5 focus:border-leaf-3 transition-all font-medium text-ink"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest text-ink-4">E-mail Corporativo</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@empresa.com.br"
                    className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-leaf-5 focus:border-leaf-3 transition-all font-medium text-ink"
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="space-y-1.5">
                   <div className="flex justify-between items-center pr-1">
                      <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Senha</Label>
                      <button type="button" className="text-[11px] font-bold text-leaf-1 hover:underline">Esqueceu a senha?</button>
                   </div>
                  <div className="relative mt-1">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-leaf-5 focus:border-leaf-3 transition-all font-medium text-ink"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-ink hover:bg-ink-2 text-white font-bold h-14 rounded-xl shadow-lg shadow-leaf/10 transition-all hover:scale-[1.01] mt-4"
            >
              {isLogin ? 'Entrar no Portal' : 'Criar Conta Corporativa'}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-8 text-center border-t border-paper-3 pt-8">
            <p className="text-[14px] text-ink-3 font-medium">
              {isLogin ? 'Ainda não é parceiro?' : 'Já possui cadastro corporativo?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-leaf-1 hover:text-leaf font-black transition-colors"
              >
                {isLogin ? 'Cadastre sua Empresa' : 'Acessar Conta'}
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
              <Link href="/login/jovem">
                <button className="w-full py-4 rounded-xl border border-paper-3 hover:border-sky-2/30 hover:bg-sky-3/10 text-xs font-black uppercase tracking-widest text-ink transition-all">Jovem Talento</button>
              </Link>
              <Link href="/login/universidade">
                <button className="w-full py-4 rounded-xl border border-paper-3 hover:border-violet-2/30 hover:bg-violet-3/10 text-xs font-black uppercase tracking-widest text-ink transition-all">Universidade</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEmpresa;
