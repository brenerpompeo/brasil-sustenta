import { useState } from 'react';
import { Link } from 'wouter';
import { Building2, Mail, Lock, User, Globe, Briefcase, Users } from 'lucide-react';
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
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 mb-8 cursor-pointer">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-xl">BS</span>
              </div>
              <span className="text-white font-bold text-xl">Brasil Sustenta</span>
            </div>
          </Link>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Acesse sua conta de empresa e gerencie seus projetos ESG' 
                : 'Cadastre sua empresa e comece a transformar o futuro'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="companyName">Nome da Empresa *</Label>
                  <div className="relative mt-1">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Sua Empresa Ltda"
                      className="pl-10"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <div className="relative mt-1">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cnpj"
                      type="text"
                      placeholder="00.000.000/0000-00"
                      className="pl-10"
                      value={formData.cnpj}
                      onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">Setor</Label>
                    <Input
                      id="industry"
                      type="text"
                      placeholder="Ex: Tecnologia"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="size">Porte</Label>
                    <select
                      id="size"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                      value={formData.size}
                      onChange={(e) => setFormData({...formData, size: e.target.value})}
                    >
                      <option value="pequena">Pequena</option>
                      <option value="media">Média</option>
                      <option value="grande">Grande</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://suaempresa.com.br"
                      className="pl-10"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">E-mail Corporativo *</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contato@empresa.com.br"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div>
                <Label htmlFor="password">Senha *</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Lembrar-me</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-12"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-semibold"
              >
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </div>

          {/* Other Login Options */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Ou acesse como:</p>
            <div className="flex gap-3">
              <Link href="/login/jovem" className="flex-1">
                <Button variant="outline" className="w-full border-border hover:border-primary/50">
                  Jovem Talento
                </Button>
              </Link>
              <Link href="/login/universidade" className="flex-1">
                <Button variant="outline" className="w-full border-border hover:border-primary/50">
                  Universidade
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-primary/10 to-background items-center justify-center p-12">
        <div className="max-w-lg">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Conecte-se com Talentos Universitários
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Acesse jovens profissionais qualificados para projetos ESG, sustentabilidade e inovação. 
              Forme squads sob medida e gere impacto real.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Squads Multidisciplinares</h3>
                <p className="text-sm text-muted-foreground">
                  Monte equipes com competências diversificadas para seus projetos
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Gestão Simplificada</h3>
                <p className="text-sm text-muted-foreground">
                  Acompanhe projetos, avalie talentos e gerencie entregas em um só lugar
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Impacto Mensurável</h3>
                <p className="text-sm text-muted-foreground">
                  Resultados concretos em ESG, ODS e transformação social
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEmpresa;
