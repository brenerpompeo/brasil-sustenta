import { useState } from 'react';
import { Link } from 'wouter';
import { GraduationCap, Mail, Lock, User, Phone, Linkedin, Github, Calendar, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getLoginUrl } from '@/const';

const LoginJovem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    phone: '',
    course: '',
    semester: '',
    graduationYear: '',
    linkedin: '',
    github: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Manus OAuth with userType parameter
    window.location.href = `${getLoginUrl()}&userType=jovem`;
  };

  return (
    <div className="min-h-screen bg-paper flex font-body selection:bg-sky-3 selection:text-sky">
      {/* ── LEFT SIDE: TALENT MARKETING ── */}
      <div className="hidden lg:flex flex-1 bg-ink relative overflow-hidden items-center justify-center p-20">
        <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-sky/10 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-sky/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-xl">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-16 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Voltar para a Home</span>
            </button>
          </Link>

          <div className="mb-12">
            <div className="w-16 h-16 bg-sky-2/20 rounded-2xl flex items-center justify-center mb-10 border border-sky/30 shadow-xl shadow-sky/10">
              <GraduationCap className="w-8 h-8 text-sky-3" />
            </div>
            <h2 className="font-display text-[3.5rem] font-black text-white leading-[1.05] mb-8">
              Sua Carreira de <span className="italic font-light text-sky-3">Impacto</span> começa aqui.
            </h2>
            <p className="text-xl text-white/60 leading-relaxed font-medium">
              Conecte-se com as empresas mais inovadoras do Brasil e resolva desafios ESG reais enquanto estuda.
            </p>
          </div>

          <div className="space-y-8 mt-16 border-t border-white/5 pt-12">
            {[
              { icon: GraduationCap, title: "Experiência Prática", desc: "Aplique seus conhecimentos acadêmicos em cenários corporativos reais." },
              { icon: User, title: "Networking de Elite", desc: "Esteja no radar de gestores e líderes de sustentabilidade." },
              { icon: Calendar, title: "Flexibilidade Híbrida", desc: "Projetos em squads que respeitam sua rotina universitária." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-sky/20 transition-colors">
                  <item.icon className="w-5 h-5 text-sky-3/70 group-hover:text-sky-3 transition-colors" />
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
                  <div className="w-10 h-10 bg-sky rounded-xl flex items-center justify-center">
                    <span className="text-white font-black text-xs">BS</span>
                  </div>
                  <span className="font-display text-xl font-black text-ink">Brasil Sustenta</span>
                </div>
             </Link>
          </div>

          {/* Form Header */}
          <div className="mb-10">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-1 mb-3">Portal do Talento</div>
            <h1 className="font-display text-4xl font-black text-ink leading-tight mb-3">
              {isLogin ? 'Bem-vindo de volta' : 'Inicie sua Jornada'}
            </h1>
            <p className="text-[15px] text-ink-3 font-medium leading-relaxed">
              {isLogin 
                ? 'Acesse seu dashboard para ver oportunidades e acompanhar seus squads.' 
                : 'Crie seu perfil profissional e conecte-se com projetos de impacto social.'}
            </p>
          </div>

          {/* Form Actions */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                    <Input
                      id="fullName"
                      placeholder="Seu nome completo"
                      className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-sky-2/20 focus:border-sky-2 transition-all font-medium text-ink"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="course" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Curso</Label>
                    <Input
                      id="course"
                      placeholder="Ex: Engenharia"
                      className="h-12 bg-white border-paper-3 rounded-xl focus:ring-sky-2/20 focus:border-sky-2 transition-all font-medium text-ink"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="semester" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Semestre/Ano</Label>
                    <Input
                      id="semester"
                      placeholder="Ex: 5º Semestre"
                      className="h-12 bg-white border-paper-3 rounded-xl focus:ring-sky-2/20 focus:border-sky-2 transition-all font-medium text-ink"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                    <Label htmlFor="linkedin" className="text-[11px] font-black uppercase tracking-widest text-ink-4">LinkedIn</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-4" />
                      <Input
                        id="linkedin"
                        placeholder="link..."
                        className="pl-9 h-11 bg-white border-paper-3 rounded-xl focus:ring-sky-2/20 focus:border-sky-2 transition-all font-medium text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="github" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Github (opcional)</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-4" />
                      <Input
                        id="github"
                        placeholder="link..."
                        className="pl-9 h-11 bg-white border-paper-3 rounded-xl focus:ring-sky-2/20 focus:border-sky-2 transition-all font-medium text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest text-ink-4">E-mail Acadêmico ou Pessoal</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-sky-2/20 focus:border-sky-2 transition-all font-medium text-ink"
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center pr-1">
                    <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-widest text-ink-4">Senha</Label>
                    <button type="button" className="text-[11px] font-bold text-sky hover:underline">Esqueceu?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 h-12 bg-white border-paper-3 rounded-xl focus:ring-sky-2/20 focus:border-sky-2 transition-all font-medium text-ink"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-ink hover:bg-ink-2 text-white font-bold h-14 rounded-xl shadow-lg shadow-sky/10 transition-all hover:scale-[1.01] mt-4"
            >
              {isLogin ? 'Entrar na Plataforma' : 'Criar Perfil de Talento'}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-8 text-center border-t border-paper-3 pt-8">
            <p className="text-[14px] text-ink-3 font-medium">
              {isLogin ? 'Ainda não faz parte?' : 'Já possui perfil de talento?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sky hover:text-sky-2 font-black transition-colors"
              >
                {isLogin ? 'Cadastre-se Grátis' : 'Acesse sua Conta'}
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

export default LoginJovem;
