import { useParams } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
// import { trpc } from '@/lib/trpc'; // Descomente quando o endpoint TRPC estiver pronto
import {
    Loader2,
    Share2,
    Linkedin,
    Github,
    Globe,
    MapPin,
    Award,
    BarChart,
    Star,
    ShieldCheck,
    ArrowRight
} from 'lucide-react';

// Mock de dados do usuário. Substitua pelo fetch do tRPC.
const mockUser = {
    name: 'Brener Pompeo',
    username: 'brener-pompeo',
    avatarUrl: 'https://github.com/brenerpompeo.png',
    headline: 'Estrategista de Produto & Inovação com foco em ESG',
    location: 'Campinas, SP',
    socials: {
        linkedin: 'https://linkedin.com/in/brenerpompeo',
        github: 'https://github.com/brenerpompeo',
        website: 'https://brener.dev',
    },
    bio: 'Acredito que a criatividade é o método definitivo de inovação, não um monopólio do marketing. Atuo na intersecção entre tecnologia, dados e design estratégico para resolver problemas sistêmicos de grandes corporações, impulsionando a Agenda 2030 e os 18 ODS.',
    sdgScores: [
        { id: 9, name: 'Indústria, Inovação e Infraestrutura', score: 95 },
        { id: 8, name: 'Trabalho Decente e Crescimento Econômico', score: 90 },
        { id: 11, name: 'Cidades e Comunidades Sustentáveis', score: 85 },
        { id: 18, name: 'Igualdade Étnico-Racial', score: 82 },
        { id: 17, name: 'Parcerias e Meios de Implementação', score: 80 },
        { id: 4, name: 'Educação de Qualidade', score: 75 },
    ],
    verifiedSquads: [
        {
            id: 'proj-001',
            company: 'Ambev',
            companyLogo: 'https://logo.clearbit.com/ambev.com.br',
            title: 'Estratégia de Comunicação para Embalagem Circular',
            role: 'Estrategista de Impacto',
            year: 2025,
            ods: [12, 14],
        },
        {
            id: 'proj-002',
            company: 'Natura',
            companyLogo: 'https://logo.clearbit.com/natura.com.br',
            title: 'Plataforma de Engajamento para Consultoras da Amazônia',
            role: 'Product Designer',
            year: 2026,
            ods: [1, 8, 15],
        },
    ],
    portfolio: [
        { id: 'port-1', title: 'Dashboard de Análise de Emissões', imageUrl: 'https://images.unsplash.com/photo-1633435469036-a1d51dc3d17a?q=80&w=800', link: '#' },
        { id: 'port-2', title: 'App de Consumo Consciente', imageUrl: 'https://images.unsplash.com/photo-1611117775522-301a50983f29?q=80&w=800', link: '#' },
        { id: 'port-3', title: 'Relatório de Impacto Interativo', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', link: '#' },
    ]
};

// Componente placeholder para o Radar Chart
const SdgRadarChart = ({ scores }: { scores: { name: string, score: number }[] }) => (
    <div className="w-full h-96 bg-paper-3 border border-paper-4 rounded-3xl flex flex-col items-center justify-center text-center p-8">
        <BarChart className="w-12 h-12 text-sky mb-4" />
        <h4 className="font-bold text-ink-2 mb-2">Radar de Afinidade ODS</h4>
        <p className="text-sm text-ink-3">
            Mapeamento vetorial de proficiência e afinidade técnica com os 18 ODS, certificado pela Inteligência Artificial da plataforma.
            <br />
            <span className="font-bold text-sky">(Em breve: Gráfico interativo com Recharts)</span>
        </p>
    </div>
);

export default function PublicProfilePage() {
    const { username } = useParams();
    // const { data: user, isLoading, error } = trpc.user.getPublicProfile.useQuery({ username });

    // Usando mock por enquanto
    const user = mockUser;
    const isLoading = false;
    const error = null;

    if (isLoading) {
        return <div className="w-full h-screen flex items-center justify-center bg-paper"><Loader2 className="w-8 h-8 animate-spin text-sky" /></div>;
    }

    if (error || !user) {
        return <div>Erro ao carregar perfil.</div>; // TODO: Criar página 404
    }

    return (
        <div className="min-h-screen bg-paper-2 font-sans overflow-x-hidden">
            <SEO
                title={`${user.name} | Perfil de Impacto Brasil Sustenta`}
                description={user.headline}
            />
            <Header />

            <main className="container py-24 md:py-32">
                {/* Profile Header */}
                <section className="relative flex flex-col md:flex-row items-center gap-12 mb-24">
                    <div className="relative">
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                        />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-sky rounded-full flex items-center justify-center border-4 border-paper-2">
                            <Star className="w-6 h-6 text-white fill-current" />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-black text-ink font-display tracking-tight">{user.name}</h1>
                        <p className="text-xl text-ink-3 font-medium mt-2">{user.headline}</p>
                        <div className="flex items-center gap-4 mt-4 text-ink-4 justify-center md:justify-start">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-8 justify-center md:justify-start">
                            <Button className="h-12 px-6 rounded-xl bg-sky hover:bg-sky-1 text-white font-bold shadow-lg shadow-sky/20">Contratar para Squad</Button>
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-paper-3 bg-white/50 backdrop-blur-sm"><Share2 className="w-5 h-5" /></Button>
                            <a href={user.socials.linkedin} target="_blank" rel="noreferrer"><Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-paper-3 bg-white/50 backdrop-blur-sm"><Linkedin className="w-5 h-5" /></Button></a>
                            <a href={user.socials.github} target="_blank" rel="noreferrer"><Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-paper-3 bg-white/50 backdrop-blur-sm"><Github className="w-5 h-5" /></Button></a>
                            <a href={user.socials.website} target="_blank" rel="noreferrer"><Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-paper-3 bg-white/50 backdrop-blur-sm"><Globe className="w-5 h-5" /></Button></a>
                        </div>
                    </div>
                </section>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Coluna Esquerda: Sobre e Afinidade ODS */}
                    <div className="lg:col-span-1 space-y-12">
                        <div className="bg-white border border-paper-3 rounded-3xl p-8">
                            <h3 className="text-sm font-black uppercase tracking-widest text-ink-4 mb-4">Sobre</h3>
                            <p className="text-ink-3 leading-relaxed">{user.bio}</p>
                        </div>
                        <div className="bg-white border border-paper-3 rounded-3xl p-8">
                            <h3 className="text-sm font-black uppercase tracking-widest text-ink-4 mb-6">Principais Afinidades ODS</h3>
                            <div className="space-y-4">
                                {user.sdgScores.slice(0, 3).map(sdg => (
                                    <div key={sdg.id} className="flex items-center gap-4">
                                        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-sky/10 flex items-center justify-center font-bold text-sky">{sdg.id}</div>
                                        <div>
                                            <p className="font-bold text-ink">{sdg.name}</p>
                                            <div className="w-full bg-paper-3 rounded-full h-2 mt-1">
                                                <div className="bg-sky h-2 rounded-full" style={{ width: `${sdg.score}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Coluna Direita: Radar, Squads e Portfólio */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Radar ODS */}
                        <div className="bg-white border border-paper-3 rounded-3xl p-8">
                            <SdgRadarChart scores={user.sdgScores} />
                        </div>

                        {/* Histórico de Squads */}
                        <div className="bg-white border border-paper-3 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-ink-4">Histórico de Squads Verificados</h3>
                            </div>
                            <div className="space-y-6">
                                {user.verifiedSquads.map(squad => (
                                    <div key={squad.id} className="flex items-start gap-6 p-6 bg-paper-2 rounded-2xl border border-paper-3">
                                        <img src={squad.companyLogo} alt={squad.company} className="w-12 h-12 rounded-lg bg-white" />
                                        <div className="flex-1">
                                            <p className="font-bold text-ink mb-1">{squad.title}</p>
                                            <p className="text-sm text-ink-3 mb-3">
                                                <span className="font-semibold">{squad.role}</span> na <span className="font-semibold">{squad.company}</span> • {squad.year}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-ink-4">ODS Impactados:</span>
                                                {squad.ods.map(odsId => (
                                                    <span key={odsId} className="bg-sky/10 text-sky text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{odsId}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mostruário Multidisciplinar */}
                        <div className="bg-white border border-paper-3 rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-ink-4 mb-1">Mostruário Multidisciplinar</h3>
                                    <p className="text-ink-3">Cases práticos de criatividade aplicada em tech, negócios, dados e design.</p>
                                </div>
                                <Button variant="ghost">Ver todos <ArrowRight className="w-4 h-4 ml-2" /></Button>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {user.portfolio.map(item => (
                                    <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="group block">
                                        <div className="aspect-video rounded-2xl overflow-hidden mb-3">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <p className="font-bold text-ink group-hover:text-sky transition-colors">{item.title}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}


/*
  PONTOS DE ATENÇÃO E PRÓXIMOS PASSOS (CTO):
  
  1.  [BACKEND] Endpoint TRPC:
      - Criar o procedimento `user.getPublicProfile` que busca um usuário pelo `username`.
      - O procedimento deve fazer um JOIN com as tabelas de projetos (squads), portfólio e scores ODS.
      - Implementar RLS (Row Level Security) para garantir que apenas dados públicos sejam expostos.

  2.  [FRONTEND] Gráfico Radar:
      - Instalar uma biblioteca de gráficos, como `recharts` ou `visx`.
      - Substituir o componente `SdgRadarChart` placeholder pela implementação real do gráfico.
      - O gráfico deve ser visualmente atraente, seguindo a identidade visual (cores `sky`, `ink`, etc.).

  3.  [DATABASE] Schema:
      - Revisar o schema do Drizzle para garantir que as tabelas `users`, `projects`, `portfolio_items` e `user_sdg_scores` 
        estejam corretamente relacionadas para suportar a query do perfil público.

  4.  [UX] Estado de Carregamento e Erro:
      - Melhorar as telas de `isLoading` e `error` para serem mais informativas e visualmente integradas ao design system.
      - Criar uma página 404 dedicada para ser exibida quando um perfil de usuário não for encontrado.
*/