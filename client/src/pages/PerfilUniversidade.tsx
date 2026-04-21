import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { 
  Building2,
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  Users,
  GraduationCap,
  Edit,
  Save,
  X,
  University
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'wouter';

const PerfilUniversidade = () => {
  const { data: user } = trpc.auth.me.useQuery();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: profileData, refetch } = trpc.profile.getMyProfile.useQuery();
  const updateMutation = trpc.profile.updateUniversityProfile.useMutation({
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao atualizar perfil');
    },
  });

  const profile: any = profileData?.type === 'universidade' ? profileData.profile : null;
  
  const [formData, setFormData] = useState({
    universityName: '',
    acronym: '',
    cnpj: '',
    state: '',
    city: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    logo: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        universityName: profile.universityName || '',
        acronym: profile.acronym || '',
        cnpj: profile.cnpj || '',
        state: profile.state || '',
        city: profile.city || '',
        contactPerson: profile.contactPerson || '',
        contactEmail: profile.contactEmail || '',
        contactPhone: profile.contactPhone || '',
        website: profile.website || '',
        logo: profile.logo || '',
      });
    }
  }, [profile]);

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        universityName: profile.universityName || '',
        acronym: profile.acronym || '',
        cnpj: profile.cnpj || '',
        state: profile.state || '',
        city: profile.city || '',
        contactPerson: profile.contactPerson || '',
        contactEmail: profile.contactEmail || '',
        contactPhone: profile.contactPhone || '',
        website: profile.website || '',
        logo: profile.logo || '',
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h2>
          <p className="text-muted-foreground mb-6">Você precisa estar logado para acessar esta página.</p>
          <Link href="/auth/ies">
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
                {formData.logo ? (
                  <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <University className="w-10 h-10 text-primary" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">Perfil de Universidade</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    Parceira Brasil Sustenta
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
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Estudantes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Projetos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Squads</div>
            </div>
          </div>
        </Card>

        {/* Institution Information */}
        <Card className="p-8 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Informações da Instituição</h2>
              <p className="text-sm text-muted-foreground">Dados cadastrais da universidade</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="universityName">Nome da Universidade</Label>
                <Input
                  id="universityName"
                  value={formData.universityName}
                  onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="Ex: Universidade Federal do Rio de Janeiro"
                />
              </div>
              <div>
                <Label htmlFor="acronym">Sigla</Label>
                <Input
                  id="acronym"
                  value={formData.acronym}
                  onChange={(e) => setFormData({...formData, acronym: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="Ex: UFRJ"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="00.000.000/0001-00"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <div className="relative mt-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="www.universidade.edu.br"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">Estado</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="Ex: RJ"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="city">Cidade</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="Ex: Rio de Janeiro"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-8 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Informações de Contato</h2>
              <p className="text-sm text-muted-foreground">Dados do representante institucional</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Nome do Contato</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="Nome do representante"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Telefone</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="contactEmail">E-mail de Contato</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder="contato@universidade.edu.br"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">E-mail de Login</Label>
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

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/dashboard/universidade">
            <Button variant="outline" className="w-full">
              Ir para Dashboard
            </Button>
          </Link>
          <Button className="w-full bg-primary hover:bg-primary/90 text-black" disabled>
            Ver Parceiros
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PerfilUniversidade;
