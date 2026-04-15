import { useState } from 'react';
import { ArrowRight, BarChart3, Building2, GraduationCap, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const protocols = [
  {
    icon: GraduationCap,
    title: 'Extensao com operacao real',
    desc: 'Leve desafios de empresas para os alunos sem depender de uma costura manual entre coordenacao, professores e mercado.',
  },
  {
    icon: BarChart3,
    title: 'Relatorios e horas',
    desc: 'Organize participacao, evidencias, horas e visibilidade institucional em um fluxo mais rastreavel.',
  },
  {
    icon: Building2,
    title: 'Canal com empresas',
    desc: 'Conecte a IES a buyers de RH, ESG e inovacao sem precisar vender a mesma narrativa para todos.',
  },
  {
    icon: ShieldCheck,
    title: 'Curadoria e compliance',
    desc: 'A plataforma ajuda a manter clareza de escopo, aderencia ao desafio e trilha de entrega para a experiencia ser defendavel.',
  },
];

const institutionalFlow = [
  {
    title: 'Homologar a parceria',
    description: 'Definir contato, campus, cursos, objetivos de extensao e formato inicial de ativacao na rede.',
  },
  {
    title: 'Ativar talentos e HUB local',
    description: 'Mapear oferta de alunos, liderancas estudantis, coordenacao e possiveis embaixadores ou professors aliados.',
  },
  {
    title: 'Conectar com desafios e evidencias',
    description: 'Distribuir desafios, acompanhar alocacoes, consolidar horas e relatorios para a instituicao.',
  },
];

const hubAssets = [
  {
    title: 'HUB universitario',
    description: 'Microcelula local para captar talentos, articular campus e dar capilaridade a eventos e desafios.',
  },
  {
    title: 'Eventos semestrais',
    description: 'Challenge sessions, demo days e encontros de discovery para gerar reputacao, talentos e leads.',
  },
  {
    title: 'Relatorio institucional',
    description: 'Consolidacao de horas, participacao, desafios ativos e sinais de empregabilidade em uma mesma camada.',
  },
];

export default function ParaUniversidades() {
  const [partnershipSubmitted, setPartnershipSubmitted] = useState(false);
  const [partnershipForm, setPartnershipForm] = useState({
    universityName: '',
    state: '',
    city: '',
    contactName: '',
    contactEmail: '',
    message: '',
  });

  const partnershipMutation = trpc.student.requestPartnership.useMutation({
    onSuccess: () => {
      setPartnershipSubmitted(true);
      toast.success('Solicitacao enviada com sucesso.');
    },
    onError: (error) => {
      toast.error(error.message || 'Falha ao enviar a solicitacao.');
    },
  });

  const handlePartnershipSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !partnershipForm.universityName ||
      !partnershipForm.contactName ||
      !partnershipForm.contactEmail ||
      !partnershipForm.state ||
      !partnershipForm.city
    ) {
      toast.error('Preencha os campos obrigatorios para seguir.');
      return;
    }

    partnershipMutation.mutate(partnershipForm);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Para Universidades | Brasil Sustenta"
        description="Ative extensao universitaria com desafios ESG de empresas, dados de participacao e uma camada operacional mais clara."
      />
      <Header />

      <main className="pt-[72px]">
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-16 lg:py-20">
            <div className="flex flex-col justify-center">
              <Badge variant="outline" className="mb-8 w-fit rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Para universidades // extensao, empregabilidade e dados
              </Badge>

              <h1 className="max-w-4xl font-display text-[3rem] font-bold leading-[0.92] tracking-tight sm:text-[4.2rem] lg:text-[5.4rem]">
                Transforme extensao em
                <span className="block italic font-light text-primary">projetos reais com empresas</span>
              </h1>

              <p className="mt-8 max-w-2xl border-l-[3px] border-primary pl-5 text-base font-medium leading-8 text-foreground/78 sm:text-[1.05rem]">
                O Brasil Sustenta ajuda a universidade a conectar talentos e cursos a desafios ESG de mercado.
                A tese aqui nao e apenas empregabilidade, nem apenas relacionamento institucional: e extensao com operacao, evidencia e contexto de negocio.
              </p>

              <div className="mt-10">
                <Button asChild size="lg" className="h-12 rounded-full px-6 text-sm font-bold uppercase tracking-[0.14em]">
                  <a href="#form">
                    Solicitar parceria
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {protocols.map((protocol) => {
                const Icon = protocol.icon;

                return (
                  <Card key={protocol.title} className="border-border bg-card shadow-sm">
                    <CardHeader className="pb-4">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-secondary/30">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="font-display text-[1.55rem] tracking-tight">{protocol.title}</CardTitle>
                      <CardDescription className="text-sm font-medium leading-7 text-muted-foreground">{protocol.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="form" className="border-b border-border py-20 lg:py-24">
          <div className="container mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <Card className="rounded-[1.75rem] border-border bg-foreground text-background shadow-sm">
              <CardHeader>
                <div className="mb-4 flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Leitura estrategica</span>
                </div>
                <CardTitle className="font-display text-[2rem] leading-[1.05] tracking-tight text-white">
                  A universidade vira mais forte quando entra como parte da operacao, nao so como origem de talentos.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium leading-7 text-background/75">
                  A parceria funciona melhor quando a IES deixa claro quais cursos, polos, trilhas e formatos de extensao quer ativar.
                  Isso ajuda a plataforma a distribuir desafios com mais aderencia e a gerar relatorios realmente uteis.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-[2rem] tracking-tight">Solicitar parceria institucional</CardTitle>
                <CardDescription className="text-sm font-medium leading-7 text-muted-foreground">
                  Preencha os dados abaixo para iniciarmos uma conversa sobre extensao, empregabilidade e projetos reais.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {partnershipSubmitted ? (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                    <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Solicitacao recebida</div>
                    <p className="mb-4 text-sm font-medium leading-7 text-foreground/80">
                      Recebemos os dados da sua instituicao. Agora o proximo passo e validar aderencia, formato de parceria e melhor rota de ativacao.
                    </p>
                    <Button variant="outline" onClick={() => setPartnershipSubmitted(false)} className="rounded-full">
                      Enviar nova solicitacao
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handlePartnershipSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="universityName" className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        Nome da instituicao
                      </Label>
                      <Input
                        id="universityName"
                        required
                        placeholder="Universidade ou centro universitario"
                        value={partnershipForm.universityName}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, universityName: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          UF
                        </Label>
                        <Input
                          id="state"
                          required
                          maxLength={2}
                          placeholder="SP"
                          value={partnershipForm.state}
                          onChange={(e) => setPartnershipForm({ ...partnershipForm, state: e.target.value.toUpperCase() })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          Cidade
                        </Label>
                        <Input
                          id="city"
                          required
                          placeholder="Cidade principal da operacao"
                          value={partnershipForm.city}
                          onChange={(e) => setPartnershipForm({ ...partnershipForm, city: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contactName" className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          Nome do contato
                        </Label>
                        <Input
                          id="contactName"
                          required
                          placeholder="Responsavel pela conversa"
                          value={partnershipForm.contactName}
                          onChange={(e) => setPartnershipForm({ ...partnershipForm, contactName: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactEmail" className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          E-mail institucional
                        </Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          required
                          placeholder="contato@universidade.edu.br"
                          value={partnershipForm.contactEmail}
                          onChange={(e) => setPartnershipForm({ ...partnershipForm, contactEmail: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        Contexto adicional
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Conte sobre cursos, polos, quantidade de alunos, objetivos de extensao ou necessidades especificas."
                        value={partnershipForm.message}
                        onChange={(e) => setPartnershipForm({ ...partnershipForm, message: e.target.value })}
                        className="min-h-28"
                      />
                    </div>

                    <Button type="submit" disabled={partnershipMutation.isPending} className="h-12 rounded-full px-6 text-sm font-bold uppercase tracking-[0.14em]">
                      {partnershipMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Enviando
                        </>
                      ) : (
                        <>
                          Solicitar parceria
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-b border-border py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Fluxo institucional</div>
              <h2 className="font-display text-[2.2rem] font-bold tracking-tight text-foreground lg:text-[3.2rem]">
                A parceria fica melhor quando a IES entende o processo inteiro, nao so o formulario.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {institutionalFlow.map((step, index) => (
                <Card key={step.title} className={index === 1 ? 'rounded-[1.5rem] border-primary/30 bg-primary/5 shadow-sm' : 'rounded-[1.5rem] border-border bg-card shadow-sm'}>
                  <CardHeader>
                    <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">0{index + 1}</div>
                    <CardTitle className="font-display text-[1.55rem] tracking-tight">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[15px] font-medium leading-7 text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">HUBs e eventos</div>
                <h2 className="font-display text-[2.2rem] font-bold tracking-tight text-foreground lg:text-[3.2rem]">
                  A universidade tambem cresce como ponto de distribuicao da rede.
                </h2>
              </div>
              <p className="text-[15px] font-medium leading-7 text-muted-foreground">
                O papel institucional nao termina na validacao de horas. A IES pode operar como supply engine, palco de eventos e base local de ativacao para o Brasil Sustenta.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {hubAssets.map((asset) => (
                <Card key={asset.title} className="rounded-[1.5rem] border-border bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-display text-[1.55rem] tracking-tight">{asset.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[15px] font-medium leading-7 text-muted-foreground">{asset.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
