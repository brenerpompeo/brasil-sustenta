import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  Mail, 
  Linkedin, 
  Github, 
  Eye, 
  Check, 
  X,
  MoreHorizontal,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

interface VisualizacaoCandidatosProps {
  projectId: number;
  projectTitle: string;
}

export default function VisualizacaoCandidatos({ projectId, projectTitle }: VisualizacaoCandidatosProps) {
  const [selectedTalent, setSelectedTalent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: applicationsData, refetch } = trpc.company.getProjectApplications.useQuery({
    projectId,
    limit: 50,
  });

  const approveMutation = trpc.company.approveApplication.useMutation({
    onSuccess: () => {
      toast.success('Candidato aprovado com sucesso!');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao aprovar candidato');
    },
  });

  const rejectMutation = trpc.company.rejectApplication.useMutation({
    onSuccess: () => {
      toast.success('Candidato rejeitado com sucesso!');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao rejeitar candidato');
    },
  });

  const handleApprove = (applicationId: number) => {
    approveMutation.mutate({ applicationId });
  };

  const handleReject = (applicationId: number) => {
    rejectMutation.mutate({ applicationId });
  };

  const applications = applicationsData?.applications || [];
  const total = applicationsData?.total || 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">Pendente</Badge>;
      case 'accepted':
        return <Badge variant="default" className="bg-green-500/20 text-green-400">Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-red-500/20 text-red-400">Rejeitado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card className="border-border bg-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Candidatos ao Projeto</h3>
            <p className="text-sm text-muted-foreground">{projectTitle}</p>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {total} {total === 1 ? 'candidato' : 'candidatos'}
          </Badge>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="p-12 text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-foreground mb-2">Nenhum candidato ainda</h4>
          <p className="text-muted-foreground">
            Aguarde novos talentos se candidatarem ao seu projeto.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Candidato</TableHead>
              <TableHead className="text-muted-foreground">Formação</TableHead>
              <TableHead className="text-muted-foreground">Skills</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Data</TableHead>
              <TableHead className="text-muted-foreground w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id} className="border-border">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={app.talent?.avatar || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary text-sm">
                        {app.talent?.fullName?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{app.talent?.fullName || 'Nome não disponível'}</p>
                      <div className="flex gap-2 mt-1">
                        {app.talent?.linkedin && (
                          <a
                            href={app.talent.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {app.talent?.github && (
                          <a
                            href={app.talent.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm text-foreground">{app.talent?.course || 'Curso não informado'}</p>
                    {app.talent?.semester && (
                      <p className="text-xs text-muted-foreground">{app.talent.semester}º semestre</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(app.talent?.skills || []).slice(0, 3).map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-xs bg-muted/50">
                        {skill}
                      </Badge>
                    ))}
                    {(app.talent?.skills || []).length > 3 && (
                      <Badge variant="outline" className="text-xs bg-muted/50">
                        +{((app.talent?.skills || []).length) - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">{formatDate(app.appliedAt)}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedTalent(app);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {app.status === 'pending' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem
                            onClick={() => handleApprove(app.id)}
                            className="text-green-400 cursor-pointer focus:text-green-400"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Aprovar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleReject(app.id)}
                            className="text-red-400 cursor-pointer focus:text-red-400"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Rejeitar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Candidate Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Detalhes do Candidato</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Informações completas sobre o candidato
            </DialogDescription>
          </DialogHeader>
          
          {selectedTalent && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedTalent.talent?.avatar} />
                  <AvatarFallback className="bg-primary/20 text-primary text-xl">
                    {selectedTalent.talent?.fullName?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedTalent.talent?.fullName || 'Nome não disponível'}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {getStatusBadge(selectedTalent.status)}
                    {selectedTalent.talent?.course && (
                      <Badge variant="outline" className="bg-violet-500/10 text-violet-400 border-violet-500/20">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        {selectedTalent.talent.course}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              {selectedTalent.coverLetter && (
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Carta de Apresentação</span>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedTalent.coverLetter}
                  </p>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {selectedTalent.talent?.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={selectedTalent.talent.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      LinkedIn <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {selectedTalent.talent?.github && (
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={selectedTalent.talent.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Candidatou em {formatDate(selectedTalent.appliedAt)}
                  </span>
                </div>
              </div>

              {/* Skills */}
              {selectedTalent.talent?.skills && selectedTalent.talent.skills.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Habilidades</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTalent.talent.skills.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedTalent.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    onClick={() => {
                      handleApprove(selectedTalent.id);
                      setIsDialogOpen(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Aprovar Candidato
                  </Button>
                  <Button
                    onClick={() => {
                      handleReject(selectedTalent.id);
                      setIsDialogOpen(false);
                    }}
                    variant="outline"
                    className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Rejeitar
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}