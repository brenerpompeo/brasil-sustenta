import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, GraduationCap, Briefcase, TrendingUp, UserCheck, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { icon: Users, label: 'Total de Usuários', value: '1,234', change: '+12%', color: 'text-blue-500' },
    { icon: Building2, label: 'Empresas Ativas', value: '89', change: '+8%', color: 'text-purple-500' },
    { icon: GraduationCap, label: 'Talentos Cadastrados', value: '856', change: '+15%', color: 'text-primary' },
    { icon: Briefcase, label: 'Projetos Ativos', value: '42', change: '+5%', color: 'text-orange-500' },
  ];

  const recentProjects = [
    { id: 1, title: 'Projeto ESG - Sustentabilidade Corporativa', company: 'Tech Solutions', status: 'open', applicants: 12 },
    { id: 2, title: 'Campanha de Marketing Verde', company: 'EcoMark', status: 'in_progress', applicants: 8 },
    { id: 3, title: 'Website Institucional Acessível', company: 'Inclusiva Tech', status: 'open', applicants: 15 },
    { id: 4, title: 'Design Thinking para ODS', company: 'Impacto Social', status: 'in_progress', applicants: 6 },
  ];

  const pendingApprovals = [
    { type: 'empresa', name: 'Green Solutions Ltda', date: '2 horas atrás' },
    { type: 'talento', name: 'Maria Silva', date: '5 horas atrás' },
    { type: 'universidade', name: 'UFMG', date: '1 dia atrás' },
    { type: 'talento', name: 'João Santos', date: '1 dia atrás' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-primary/10 text-primary',
      in_progress: 'bg-blue-500/10 text-blue-500',
      completed: 'bg-green-500/10 text-green-500',
    };
    const labels = {
      open: 'Aberto',
      in_progress: 'Em Andamento',
      completed: 'Concluído',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da plataforma Brasil Sustenta</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-accent flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-primary">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Projetos Recentes</span>
                <a href="/admin/projetos" className="text-sm text-primary hover:underline font-normal">
                  Ver todos
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1 truncate">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.company}</p>
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-foreground">{project.applicants}</p>
                        <p className="text-xs text-muted-foreground">Candidatos</p>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>Aprovações Pendentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.type === 'empresa' ? 'bg-purple-500/20 text-purple-500' :
                      item.type === 'talento' ? 'bg-primary/20 text-primary' :
                      'bg-blue-500/20 text-blue-500'
                    }`}>
                      {item.type === 'empresa' ? <Building2 className="w-5 h-5" /> :
                       item.type === 'talento' ? <GraduationCap className="w-5 h-5" /> :
                       <Users className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/admin/empresas" className="p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <Building2 className="w-8 h-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-1">Aprovar Empresas</h4>
                <p className="text-sm text-muted-foreground">Revisar cadastros pendentes</p>
              </a>
              
              <a href="/admin/talentos" className="p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <GraduationCap className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-1">Gerenciar Talentos</h4>
                <p className="text-sm text-muted-foreground">Visualizar perfis de jovens</p>
              </a>
              
              <a href="/admin/blog" className="p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-1">Publicar Post</h4>
                <p className="text-sm text-muted-foreground">Criar novo conteúdo</p>
              </a>
              
              <a href="/admin/eventos" className="p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <TrendingUp className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-1">Criar Evento</h4>
                <p className="text-sm text-muted-foreground">Agendar novo evento</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
