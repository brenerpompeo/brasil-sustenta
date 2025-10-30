import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, Ban, CheckCircle } from 'lucide-react';

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');

  const users = [
    { id: 1, name: 'Maria Silva', email: 'maria@email.com', type: 'jovem', status: 'active', createdAt: '15/01/2025' },
    { id: 2, name: 'Tech Solutions Ltda', email: 'contato@techsolutions.com', type: 'empresa', status: 'active', createdAt: '14/01/2025' },
    { id: 3, name: 'João Santos', email: 'joao@email.com', type: 'jovem', status: 'pending', createdAt: '13/01/2025' },
    { id: 4, name: 'UFMG', email: 'parceria@ufmg.br', type: 'universidade', status: 'active', createdAt: '12/01/2025' },
    { id: 5, name: 'Green Solutions', email: 'contato@greensolutions.com', type: 'empresa', status: 'pending', createdAt: '11/01/2025' },
    { id: 6, name: 'Ana Costa', email: 'ana@email.com', type: 'jovem', status: 'active', createdAt: '10/01/2025' },
    { id: 7, name: 'USP', email: 'extensao@usp.br', type: 'universidade', status: 'active', createdAt: '09/01/2025' },
    { id: 8, name: 'Pedro Oliveira', email: 'pedro@email.com', type: 'jovem', status: 'inactive', createdAt: '08/01/2025' },
  ];

  const getTypeBadge = (type: string) => {
    const styles = {
      empresa: 'bg-purple-500/10 text-purple-500',
      jovem: 'bg-primary/10 text-primary',
      universidade: 'bg-blue-500/10 text-blue-500',
    };
    const labels = {
      empresa: 'Empresa',
      jovem: 'Talento',
      universidade: 'Universidade',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-500/10 text-green-500',
      pending: 'bg-orange-500/10 text-orange-500',
      inactive: 'bg-red-500/10 text-red-500',
    };
    const labels = {
      active: 'Ativo',
      pending: 'Pendente',
      inactive: 'Inativo',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'todos' || user.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Usuários</h1>
            <p className="text-muted-foreground">Gerencie todos os usuários da plataforma</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total de Usuários</p>
              <p className="text-2xl font-bold text-foreground">{users.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Empresas</p>
              <p className="text-2xl font-bold text-purple-500">{users.filter(u => u.type === 'empresa').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Talentos</p>
              <p className="text-2xl font-bold text-primary">{users.filter(u => u.type === 'jovem').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Universidades</p>
              <p className="text-2xl font-bold text-blue-500">{users.filter(u => u.type === 'universidade').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === 'todos' ? 'default' : 'outline'}
                  onClick={() => setFilterType('todos')}
                >
                  Todos
                </Button>
                <Button
                  variant={filterType === 'empresa' ? 'default' : 'outline'}
                  onClick={() => setFilterType('empresa')}
                >
                  Empresas
                </Button>
                <Button
                  variant={filterType === 'jovem' ? 'default' : 'outline'}
                  onClick={() => setFilterType('jovem')}
                >
                  Talentos
                </Button>
                <Button
                  variant={filterType === 'universidade' ? 'default' : 'outline'}
                  onClick={() => setFilterType('universidade')}
                >
                  Universidades
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Nome</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Cadastro</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-medium text-foreground">{user.name}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </td>
                      <td className="py-4 px-4">
                        {getTypeBadge(user.type)}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-muted-foreground">{user.createdAt}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {user.status === 'pending' && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-500 hover:text-green-600">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
                            <Ban className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Usuarios;
