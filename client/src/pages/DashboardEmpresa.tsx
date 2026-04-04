import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Briefcase, Users, FileText, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import FormularioCriarProjeto from "@/components/FormularioCriarProjeto";
import ListagemProjetos from "@/components/ListagemProjetos";

export default function DashboardEmpresa() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Redirecionar se não autenticado
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || user.userType !== "empresa") {
    setLocation("/login/empresa");
    return null;
  }

  // Buscar dados da empresa
  const { data: profileData } = trpc.profile.getMyProfile.useQuery();
  const { data: projectsData, isLoading: projectsLoading, refetch: refetchProjects } = trpc.company.getMyProjects.useQuery({
    limit: 10,
    offset: 0,
  });

  const companyProfile = profileData?.type === "empresa" ? profileData.profile : null;
  const projects = projectsData?.projects || [];
  const companyName = profileData?.type === "empresa" && "companyName" in profileData.profile ? profileData.profile.companyName : user?.name;

  // Contar projetos por status
  const stats = {
    total: projectsData?.total || 0,
    draft: projects.filter(p => p.status === "draft").length,
    open: projects.filter(p => p.status === "open").length,
    inProgress: projects.filter(p => p.status === "in_progress").length,
  };

  const handleProjectCreated = () => {
    setShowCreateForm(false);
    refetchProjects();
    setActiveTab("projetos");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard da Empresa
              </h1>
              <p className="text-foreground/60">
                Bem-vindo, {companyName}
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {showCreateForm ? (
          <FormularioCriarProjeto
            onSuccess={handleProjectCreated}
            onCancel={() => setShowCreateForm(false)}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projetos">Meus Projetos</TabsTrigger>
              <TabsTrigger value="candidatos">Candidatos</TabsTrigger>
              <TabsTrigger value="squads">Squads</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total Projects Card */}
                <Card className="bg-card border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground/60 text-sm font-medium mb-1">
                        Total de Projetos
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stats.total}
                      </p>
                    </div>
                    <Briefcase className="w-10 h-10 text-primary/30" />
                  </div>
                </Card>

                {/* Draft Projects Card */}
                <Card className="bg-card border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground/60 text-sm font-medium mb-1">
                        Rascunhos
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stats.draft}
                      </p>
                    </div>
                    <FileText className="w-10 h-10 text-yellow-500/30" />
                  </div>
                </Card>

                {/* Open Projects Card */}
                <Card className="bg-card border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground/60 text-sm font-medium mb-1">
                        Abertos
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stats.open}
                      </p>
                    </div>
                    <Users className="w-10 h-10 text-primary/30" />
                  </div>
                </Card>

                {/* In Progress Card */}
                <Card className="bg-card border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground/60 text-sm font-medium mb-1">
                        Em Andamento
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stats.inProgress}
                      </p>
                    </div>
                    <Briefcase className="w-10 h-10 text-green-500/30" />
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-card border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Ações Rápidas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Plus className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">
                        Criar Novo Projeto
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/40" />
                  </button>

                  <button
                    onClick={() => setActiveTab("projetos")}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">
                        Ver Meus Projetos
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/40" />
                  </button>

                  <button
                    onClick={() => setActiveTab("candidatos")}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">
                        Ver Candidatos
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/40" />
                  </button>
                </div>
              </Card>
            </TabsContent>

            {/* Projetos Tab */}
            <TabsContent value="projetos">
              <ListagemProjetos
                projects={projects}
                isLoading={projectsLoading}
                onRefresh={refetchProjects}
              />
            </TabsContent>

            {/* Candidatos Tab */}
            <TabsContent value="candidatos">
              <Card className="bg-card border border-border p-8 text-center">
                <Users className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Candidatos
                </h3>
                <p className="text-foreground/60 mb-4">
                  Selecione um projeto para visualizar os candidatos
                </p>
                <Button
                  onClick={() => setActiveTab("projetos")}
                  variant="outline"
                >
                  Ver Meus Projetos
                </Button>
              </Card>
            </TabsContent>

            {/* Squads Tab */}
            <TabsContent value="squads">
              <Card className="bg-card border border-border p-8 text-center">
                <Briefcase className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Squads
                </h3>
                <p className="text-foreground/60">
                  Seus squads formados aparecerão aqui
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
