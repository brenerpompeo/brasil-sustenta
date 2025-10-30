import { useState } from 'react';
import { Link } from 'wouter';
import { GraduationCap, Mail, Lock, User, Phone, Linkedin, Github, Calendar } from 'lucide-react';
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
              {isLogin ? 'Bem-vindo de volta' : 'Comece sua jornada'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Acesse sua conta e explore novas oportunidades' 
                : 'Crie seu perfil e conecte-se com empresas inovadoras'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="fullName">Nome Completo *</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      className="pl-10"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      type="text"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="course">Curso *</Label>
                  <div className="relative mt-1">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="course"
                      type="text"
                      placeholder="Ex: Engenharia Ambiental"
                      className="pl-10"
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="semester">Semestre</Label>
                    <Input
                      id="semester"
                      type="number"
                      placeholder="Ex: 5"
                      min="1"
                      max="12"
                      value={formData.semester}
                      onChange={(e) => setFormData({...formData, semester: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="graduationYear">Ano de Formação</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="graduationYear"
                        type="number"
                        placeholder="2026"
                        className="pl-10"
                        min="2024"
                        max="2030"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <div className="relative mt-1">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="linkedin.com/in/seuperfil"
                      className="pl-10"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="github">GitHub (opcional)</Label>
                  <div className="relative mt-1">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="github"
                      type="url"
                      placeholder="github.com/seuperfil"
                      className="pl-10"
                      value={formData.github}
                      onChange={(e) => setFormData({...formData, github: e.target.value})}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">E-mail *</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
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
              <Link href="/login/empresa" className="flex-1">
                <Button variant="outline" className="w-full border-border hover:border-primary/50">
                  Empresa
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
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Transforme Conhecimento em Impacto
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Participe de projetos reais em ESG e sustentabilidade. Desenvolva habilidades práticas, 
              construa portfólio e conecte-se com empresas líderes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Experiência Prática</h3>
                <p className="text-sm text-muted-foreground">
                  Trabalhe em projetos reais e desenvolva competências valorizadas pelo mercado
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Networking Qualificado</h3>
                <p className="text-sm text-muted-foreground">
                  Conecte-se com profissionais e empresas comprometidas com transformação social
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Flexibilidade Total</h3>
                <p className="text-sm text-muted-foreground">
                  Escolha projetos que se encaixam na sua agenda e área de interesse
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginJovem;
