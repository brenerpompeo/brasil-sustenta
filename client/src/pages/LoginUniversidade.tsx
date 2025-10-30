import { useState } from 'react';
import { Link } from 'wouter';
import { School, Mail, Lock, User, Phone, MapPin, Building2, Calendar } from 'lucide-react';
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
              {isLogin ? 'Bem-vindo de volta' : 'Seja nossa parceira'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Acesse sua conta e acompanhe seus alunos' 
                : 'Cadastre sua instituição e conecte alunos ao mercado'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="universityName">Nome da Instituição *</Label>
                  <div className="relative mt-1">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="universityName"
                      type="text"
                      placeholder="Universidade Federal de..."
                      className="pl-10"
                      value={formData.universityName}
                      onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="acronym">Sigla</Label>
                    <Input
                      id="acronym"
                      type="text"
                      placeholder="Ex: UFMG"
                      value={formData.acronym}
                      onChange={(e) => setFormData({...formData, acronym: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      type="text"
                      placeholder="00.000.000/0000-00"
                      value={formData.cnpj}
                      onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <select
                      id="state"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      required
                    >
                      <option value="">Selecione</option>
                      {brazilianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="city"
                        type="text"
                        placeholder="Cidade"
                        className="pl-10"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactPerson">Responsável pela Parceria *</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="contactPerson"
                      type="text"
                      placeholder="Nome do coordenador/gestor"
                      className="pl-10"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactEmail">E-mail do Responsável *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="coordenador@universidade.edu.br"
                      className="pl-10"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactPhone">Telefone de Contato</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="(00) 0000-0000"
                      className="pl-10"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">E-mail Institucional *</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contato@universidade.edu.br"
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
              {isLogin ? 'Entrar' : 'Solicitar Parceria'}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? 'Ainda não é parceira?' : 'Já é parceira?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-semibold"
              >
                {isLogin ? 'Solicite parceria' : 'Faça login'}
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
              <Link href="/login/jovem" className="flex-1">
                <Button variant="outline" className="w-full border-border hover:border-primary/50">
                  Jovem Talento
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
              <School className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Conecte Seus Alunos ao Mercado
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Faça parte da rede de universidades parceiras. Ofereça aos seus alunos oportunidades 
              práticas em projetos ESG e fortaleça a empregabilidade.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <School className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Empregabilidade Ampliada</h3>
                <p className="text-sm text-muted-foreground">
                  Conecte alunos com empresas líderes em sustentabilidade e inovação social
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Visibilidade Institucional</h3>
                <p className="text-sm text-muted-foreground">
                  Destaque sua instituição como referência em formação para o mercado ESG
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Acompanhamento em Tempo Real</h3>
                <p className="text-sm text-muted-foreground">
                  Monitore o desempenho dos alunos e o impacto da parceria com relatórios detalhados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUniversidade;
