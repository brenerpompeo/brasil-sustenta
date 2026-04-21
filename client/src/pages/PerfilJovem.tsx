import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Globe, 
  GraduationCap,
  Calendar,
  Briefcase,
  Edit,
  Save,
  X,
  MapPin,
  Award,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'wouter';

const skillsOptions = [
  "React", "TypeScript", "Node.js", "Python", "UI/UX", "Data Science", 
  "Marketing Digital", "Gestão de Projetos", "Comunicação", "Estratégia ESG",
  "Design Thinking", "Inglês Fluente", "Figma", "Sustentabilidade"
];

const PerfilJovem = () => {
  const { data: user } = trpc.auth.me.useQuery();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: profileData, refetch } = trpc.profile.getMyProfile.useQuery();
  const updateMutation = trpc.profile.updateTalentProfile.useMutation({
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao atualizar perfil');
    },
  });

  const profile: any = profileData?.type === 'jovem' ? profileData.profile : null;
  
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    phone: '',
    birthDate: '',
    course: '',
    semester: 1,
    graduationYear: new Date().getFullYear() + 2,
    ra: '',
    bio: '',
    skills: [] as string[],
    linkedin: '',
    github: '',
    portfolio: '',
    avatar: '',
    isAvailable: true,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        cpf: profile.cpf || '',
        phone: profile.phone || '',
        birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString().split('T')[0] : '',
        course: profile.course || '',
        semester: profile.semester || 1,
        graduationYear: profile.graduationYear || new Date().getFullYear() + 2,
        ra: profile.ra || '',
        bio: profile.bio || '',
        skills: profile.skills || [],
        linkedin: profile.linkedin || '',
        github: profile.github || '',
        portfolio: profile.portfolio || '',
        avatar: profile.avatar || '',
        isAvailable: profile.isAvailable ?? true,
      });
    }
  }, [profile]);

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        cpf: profile.cpf || '',
        phone: profile.phone || '',
        birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString().split('T')[0] : '',
        course: profile.course || '',
        semester: profile.semester || 1,
        graduationYear: profile.graduationYear || new Date().getFullYear() + 2,
        ra: profile.ra || '',
        bio: profile.bio || '',
        skills: profile.skills || [],
        linkedin: profile.linkedin || '',
        github: profile.github || '',
        portfolio: profile.portfolio || '',
        avatar: profile.avatar || '',
        isAvailable: profile.isAvailable ?? true,
      });
    }
    setIsEditing(false);
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h2>
          <p className="text-muted-foreground mb-6">Você precisa estar logado para acessar esta página.</p>
          <Link href="/auth/jovem">
            <Button className="bg-primary hover:bg-primary/90 text-black">
              Fazer Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-lg">BS</span>
              </div>
              <span className="text-white font-bold text-lg">Brasil Sustenta</span>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
              Voltar ao Início
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Profile Header Card */}
        <Card className="p-8 border-border bg-card">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center overflow-hidden">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">Perfil de Jovem Talento</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.isAvailable 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {formData.isAvailable ? 'Disponível para projetos' : 'Indisponível'}
                  </span>
                </div>
              </div>
            </div>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-primary hover:bg-primary/90 text-black"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="bg-primary hover:bg-primary/90 text-black"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  disabled={updateMutation.isPending}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formData.skills.length}</div>
              <div className="text-sm text-muted-foreground">Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formData.semester}º</div>
              <div className="text-sm text-muted-foreground">Semestre</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formData.graduationYear}</div>
              <div className="text-sm text-muted-foreground">Formação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Projetos</div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-8 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Informações Pessoais</h2>
              <p className="text-sm text-muted-foreground">Seus dados de contato e identificação</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="000.000.000-00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  value={user.email || ''}
                  disabled
                  className="pl-10 opacity-60"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">O e-mail não pode ser alterado</p>
            </div>
          </div>
        </Card>

        {/* Academic Information */}
        <Card className="p-8 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Formação Acadêmica</h2>
              <p className="text-sm text-muted-foreground">Sua universidade e curso</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label htmlFor="course">Curso</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="Ex: Engenharia de Produção"
                />
              </div>
              <div>
                <Label htmlFor="semester">Semestre Atual</Label>
                <Input
                  id="semester"
                  type="number"
                  min={1}
                  max={12}
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: parseInt(e.target.value) || 1})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ra">RA (Registro Acadêmico)</Label>
                <Input
                  id="ra"
                  value={formData.ra}
                  onChange={(e) => setFormData({...formData, ra: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="Seu número de registro"
                />
              </div>
              <div>
                <Label htmlFor="graduationYear">Ano de Formatura</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  min={2024}
                  max={2040}
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({...formData, graduationYear: parseInt(e.target.value) || new Date().getFullYear() + 2})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Bio & Skills */}
        <Card className="p-8 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Bio & Expertises</h2>
              <p className="text-sm text-muted-foreground">Seu pitch profissional e habilidades</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="bio">Bio Profissional</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                disabled={!isEditing}
                rows={4}
                placeholder="Conte brevemente sua trajetória e seu interesse em projetos de impacto..."
                className="mt-1"
              />
            </div>

            <div>
              <Label className="mb-3 block">Habilidades Técnicas</Label>
              <div className="flex flex-wrap gap-2">
                {skillsOptions.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => isEditing && toggleSkill(skill)}
                    disabled={!isEditing}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                      formData.skills.includes(skill)
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-muted border-border text-muted-foreground hover:bg-muted/80"
                    } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                disabled={!isEditing}
                className="w-4 h-4 rounded border-border bg-background"
              />
              <Label htmlFor="isAvailable" className="text-sm cursor-pointer">
                Estou disponível para novos projetos
              </Label>
            </div>
          </div>
        </Card>

        {/* External Links */}
        <Card className="p-8 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Links Externos</h2>
              <p className="text-sm text-muted-foreground">Suas redes profissionais</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="relative mt-1">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder="linkedin.com/in/seu-perfil"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <div className="relative mt-1">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder="github.com/seu-usuario"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="portfolio">Portfólio</Label>
              <div className="relative mt-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder="seusite.com.br"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/dashboard/jovem">
            <Button variant="outline" className="w-full">
              Ir para Dashboard
            </Button>
          </Link>
          <Link href="/oportunidades">
            <Button className="w-full bg-primary hover:bg-primary/90 text-black">
              Ver Oportunidades
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PerfilJovem;
