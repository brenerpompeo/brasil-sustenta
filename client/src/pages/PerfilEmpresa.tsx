import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Mail, Globe, Briefcase, Users, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { LogoUpload } from '@/components/LogoUpload';
import { Link } from 'wouter';

const PerfilEmpresa = () => {
  const { data: user } = trpc.auth.me.useQuery();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: profileData, refetch } = trpc.profile.getMyProfile.useQuery();
  const updateMutation = trpc.profile.updateCompanyProfile.useMutation({
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao atualizar perfil');
    },
  });

  const profile: any = profileData?.type === 'empresa' ? profileData.profile : null;
  
  const [formData, setFormData] = useState({
    companyName: profile?.companyName || '',
    cnpj: profile?.cnpj || '',
    industry: profile?.industry || '',
    size: profile?.size || 'media',
    description: profile?.description || '',
    website: profile?.website || '',
    logo: profile?.logo || '',
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    const profile: any = profileData?.type === 'empresa' ? profileData.profile : null;
    setFormData({
      companyName: profile?.companyName || '',
      cnpj: profile?.cnpj || '',
      industry: profile?.industry || '',
      size: profile?.size || 'media',
      description: profile?.description || '',
      website: profile?.website || '',
      logo: profile?.logo || '',
    });
    setIsEditing(false);
  };

  const handleLogoUpload = (url: string) => {
    setFormData({...formData, logo: url});
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h2>
          <p className="text-muted-foreground mb-6">Você precisa estar logado para acessar esta página.</p>
          <Link href="/auth/empresa">
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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Building2 className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">Perfil de Empresa</p>
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

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Projetos Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Squads Formados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Talentos Contratados</div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Informações da Empresa</h2>
          
          <div className="space-y-6">
            {/* Logo Upload */}
            <div>
              <Label>Logo da Empresa</Label>
              <div className="mt-2">
                <LogoUpload
                  currentLogo={formData.logo}
                  onUploadSuccess={handleLogoUpload}
                  type="logo"
                />
              </div>
            </div>

            <div className="border-t border-border my-6"></div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName">Nome da Empresa *</Label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <div className="relative mt-1">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="industry">Setor</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="size">Porte</Label>
                <select
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  disabled={!isEditing}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground disabled:opacity-50"
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
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">E-mail Corporativo</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="pl-10 opacity-60"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                O e-mail não pode ser alterado
              </p>
            </div>

            <div>
              <Label htmlFor="description">Descrição da Empresa</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                disabled={!isEditing}
                rows={4}
                placeholder="Conte um pouco sobre sua empresa, missão e valores..."
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link href="/dashboard/empresa">
            <Button variant="outline" className="w-full">
              Ir para Dashboard
            </Button>
          </Link>
          <Link href="/projetos/criar">
            <Button className="w-full bg-primary hover:bg-primary/90 text-black">
              Criar Novo Projeto
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PerfilEmpresa;
