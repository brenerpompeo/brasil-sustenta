import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  Compass,
  Crown,
  FileCheck2,
  GraduationCap,
  Landmark,
  MapPin,
  Rocket,
  School,
  ShieldCheck,
  Target,
  Users2,
  Zap,
} from "lucide-react";

export type AccentTone = "green" | "blue" | "yellow";
export type AuthPersonaKey =
  | "empresa"
  | "jovem"
  | "ies"
  | "prefeitura"
  | "embaixador";
export type AuthTabKey = "login" | "cadastro";
export type AuthFieldType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "select"
  | "textarea";

export type AuthMetric = {
  value: string;
  label: string;
  context?: string;
};

export type AuthHighlight = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type AuthOption = {
  value: string;
  label: string;
};

export type AuthField = {
  name: string;
  label: string;
  type: AuthFieldType;
  placeholder?: string;
  required?: boolean;
  options?: AuthOption[];
  rows?: number;
  colSpan?: 1 | 2;
};

export type AuthModeConfig = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  fields: AuthField[];
  submitLabel: string;
  assistiveActionLabel?: string;
  callout?: {
    eyebrow: string;
    body: string;
  };
  legal?: string;
  footerPrompt: string;
  footerActionLabel: string;
};

export type AuthPersonaConfig = {
  key: AuthPersonaKey;
  href: string;
  tone: AccentTone;
  secondaryTone?: AccentTone;
  icon: LucideIcon;
  portalLabel: string;
  hubEyebrow: string;
  hubDescription: string;
  hubBullets: string[];
  eyebrow: string;
  title: string;
  description: string;
  metadata: string[];
  metrics: AuthMetric[];
  highlights: AuthHighlight[];
  defaultTab?: AuthTabKey;
  login: AuthModeConfig;
  cadastro: AuthModeConfig;
};

export const AUTH_PERSONA_ORDER: AuthPersonaKey[] = [
  "jovem",
  "empresa",
  "ies",
  "prefeitura",
  "embaixador",
];

export const AUTH_PERSONAS: Record<AuthPersonaKey, AuthPersonaConfig> = {
  empresa: {
    key: "empresa",
    href: "/auth/empresa",
    tone: "green",
    icon: Building2,
    portalLabel: "Acesso Corporativo",
    hubEyebrow: "Empresas",
    hubDescription:
      "Buyer, operação e relatório no mesmo fluxo: brief claro, curadoria, squad e evidência auditável.",
    hubBullets: [
      "Enviar brief ESG com escopo legível",
      "Acompanhar checkpoints e entregáveis",
      "Concentrar squads, buyers e relatórios",
    ],
    eyebrow: "CORP // BRIEF_TO_REPORT",
    title: "Seu desafio ESG vira sprint auditável.",
    description:
      "Brief estruturado, shortlist com fit explicável, squad em operação e relatório executivo com trilha de evidência. ESG sai do PowerPoint e entra em execução.",
    metadata: [
      "Shortlist em até 72h",
      "Sprint médio de 6 semanas",
      "Relatório executivo final",
    ],
    metrics: [
      { value: "72h", label: "shortlist explicável" },
      { value: "3-5", label: "talentos por squad" },
      { value: "6 sem", label: "sprint médio" },
      { value: "1 dossiê", label: "relatório final" },
    ],
    highlights: [
      {
        icon: Target,
        title: "Brief legível",
        description:
          "Buyer define escopo, ODS e prazo antes do match começar.",
      },
      {
        icon: Users2,
        title: "Squad sob medida",
        description:
          "Curadoria humana valida perfis e forma a equipe final.",
      },
      {
        icon: ShieldCheck,
        title: "Evidência executiva",
        description:
          "Cada checkpoint vira base para decisão, governança e reputação.",
      },
    ],
    defaultTab: "cadastro",
    login: {
      label: "Entrar",
      eyebrow: "Operação ativa",
      title: "Acesse a operação corporativa.",
      description:
        "Entre para revisar briefs, squads ativos, checkpoints e relatórios em andamento.",
      fields: [
        {
          name: "email",
          label: "E-mail corporativo",
          type: "email",
          placeholder: "contato@empresa.com.br",
          required: true,
        },
        {
          name: "password",
          label: "Senha",
          type: "password",
          placeholder: "••••••••",
          required: true,
        },
      ],
      submitLabel: "Entrar no portal",
      assistiveActionLabel: "Recuperar acesso",
      footerPrompt: "Ainda não ativou sua operação?",
      footerActionLabel: "Enviar brief ESG",
    },
    cadastro: {
      label: "Enviar brief",
      eyebrow: "Ativação buyer",
      title: "Comece pelo brief, não pela ferramenta.",
      description:
        "Cadastre a empresa, sinalize o desafio ESG prioritário e abra a primeira frente operacional.",
      fields: [
        {
          name: "companyName",
          label: "Nome da empresa",
          type: "text",
          placeholder: "Empresa S.A.",
          required: true,
          colSpan: 2,
        },
        {
          name: "cnpj",
          label: "CNPJ",
          type: "text",
          placeholder: "00.000.000/0001-00",
          required: true,
        },
        {
          name: "phone",
          label: "Telefone",
          type: "tel",
          placeholder: "(11) 9 0000-0000",
        },
        {
          name: "emailCadastro",
          label: "E-mail corporativo",
          type: "email",
          placeholder: "contato@empresa.com.br",
          required: true,
          colSpan: 2,
        },
        {
          name: "challenge",
          label: "Desafio ESG prioritário",
          type: "select",
          required: true,
          options: [
            { value: "clima", label: "Clima e emissões (ODS 13)" },
            { value: "diversidade", label: "Diversidade e inclusão (ODS 10)" },
            { value: "trabalho", label: "Trabalho decente (ODS 8)" },
            { value: "educacao", label: "Educação e capacitação (ODS 4)" },
            { value: "cidades", label: "Cidades sustentáveis (ODS 11)" },
          ],
        },
        {
          name: "passwordCadastro",
          label: "Senha",
          type: "password",
          placeholder: "Mínimo 8 caracteres",
          required: true,
        },
      ],
      submitLabel: "Enviar brief ESG",
      callout: {
        eyebrow: "Discovery opcional",
        body:
          "Se preferir, nosso time agenda uma conversa curta para lapidar o escopo antes da shortlist.",
      },
      legal:
        "Ao continuar, você concorda com os termos de uso e com a política de privacidade da operação.",
      footerPrompt: "Já possui acesso corporativo?",
      footerActionLabel: "Entrar no portal",
    },
  },
  jovem: {
    key: "jovem",
    href: "/auth/jovem",
    tone: "green",
    secondaryTone: "yellow",
    icon: GraduationCap,
    portalLabel: "Portal do Talento",
    hubEyebrow: "Jovens",
    hubDescription:
      "Curadoria por ODS, empresa real e portfolio com prova pública para acelerar sua entrada no mercado.",
    hubBullets: [
      "Receber matches com fit explicado",
      "Entrar em squads com empresa real da cidade",
      "Transformar entregas em portfolio legível",
    ],
    eyebrow: "MATCH_LAYER // TALENTO_EM_OPERACAO",
    title: "Projetos reais. Portfolio que empresas veem.",
    description:
      "Você entende por que foi selecionado, entra em projetos com empresa real e sai com repertório observável no perfil. Curadoria, não job board.",
    metadata: [
      "Fit explicado por contexto",
      "Portfolio público crescente",
      "Operação em território",
    ],
    metrics: [
      { value: "12K+", label: "talentos na base" },
      { value: "18", label: "ODS monitorados" },
      { value: "72h", label: "primeira curadoria" },
      { value: "R$4M", label: "valor projetado" },
    ],
    highlights: [
      {
        icon: Compass,
        title: "Match explicado",
        description:
          "Você sabe o porquê do fit antes de aceitar o desafio.",
      },
      {
        icon: Rocket,
        title: "Projeto real",
        description:
          "Nada de simulação genérica. A empresa e o contexto existem.",
      },
      {
        icon: FileCheck2,
        title: "Portfolio com prova",
        description:
          "Cada entrega vira evidência do que você já sabe fazer.",
      },
    ],
    defaultTab: "cadastro",
    login: {
      label: "Entrar",
      eyebrow: "Sua trilha",
      title: "Retome sua curadoria.",
      description:
        "Acesse matches, squads em andamento e o histórico do seu portfolio de impacto.",
      fields: [
        {
          name: "email",
          label: "E-mail",
          type: "email",
          placeholder: "voce@email.com",
          required: true,
        },
        {
          name: "password",
          label: "Senha",
          type: "password",
          placeholder: "••••••••",
          required: true,
        },
      ],
      submitLabel: "Entrar na plataforma",
      assistiveActionLabel: "Recuperar acesso",
      footerPrompt: "Ainda não criou seu perfil?",
      footerActionLabel: "Criar perfil",
    },
    cadastro: {
      label: "Criar perfil",
      eyebrow: "Entrada jovem",
      title: "Monte um perfil que lê contexto.",
      description:
        "Cadastre skills, frente de interesse e disponibilidade para começar a receber matches com explicação.",
      fields: [
        {
          name: "fullName",
          label: "Nome completo",
          type: "text",
          placeholder: "Como quer ser chamado?",
          required: true,
          colSpan: 2,
        },
        {
          name: "emailCadastro",
          label: "E-mail",
          type: "email",
          placeholder: "voce@email.com",
          required: true,
        },
        {
          name: "cpf",
          label: "CPF",
          type: "text",
          placeholder: "000.000.000-00",
          required: true,
        },
        {
          name: "interest",
          label: "Frente de interesse",
          type: "select",
          required: true,
          options: [
            { value: "primeiro-projeto", label: "Meu primeiro projeto ESG" },
            { value: "bolsas", label: "Bolsas e auxílio permanência" },
            { value: "networking", label: "Rede com empresas e lideranças" },
            { value: "skills", label: "Skills do futuro e repertório" },
          ],
        },
        {
          name: "passwordCadastro",
          label: "Senha",
          type: "password",
          placeholder: "Mínimo 8 caracteres",
          required: true,
        },
      ],
      submitLabel: "Criar perfil",
      callout: {
        eyebrow: "Curadoria, não fila",
        body:
          "Depois do cadastro, o sistema prioriza desafios em que seu contexto realmente faz sentido.",
      },
      legal:
        "Ao criar o perfil, você concorda com os termos de uso e com a política de privacidade da operação.",
      footerPrompt: "Já possui um perfil ativo?",
      footerActionLabel: "Entrar na plataforma",
    },
  },
  ies: {
    key: "ies",
    href: "/auth/ies",
    tone: "yellow",
    icon: School,
    portalLabel: "Portal Acadêmico",
    hubEyebrow: "IES",
    hubDescription:
      "Extensão aplicada, leitura institucional e evidência pronta para coordenação, reitoria e MEC.",
    hubBullets: [
      "Ativar campus na rede territorial",
      "Registrar horas, squads e impacto",
      "Ler dados institucionais por semestre",
    ],
    eyebrow: "CAMPUS // EXTENSAO_COM_EVIDENCIA",
    title: "Extensão com projeto real e leitura MEC.",
    description:
      "Conecte coordenação, empregabilidade e ODS em um fluxo institucional claro, com empresa da cidade, horas registradas e relatório por semestre.",
    metadata: [
      "Horas registradas",
      "Parceria acadêmica estruturada",
      "Relatório institucional por semestre",
    ],
    metrics: [
      { value: "40+", label: "IES parceiras" },
      { value: "10K+", label: "alunos onboarded" },
      { value: "600+", label: "horas por squad" },
      { value: "100%", label: "leitura MEC" },
    ],
    highlights: [
      {
        icon: School,
        title: "Campus conectado",
        description:
          "Coordenação, alunos e empresas leem a mesma operação.",
      },
      {
        icon: Users2,
        title: "Extensão aplicada",
        description:
          "Projetos reais substituem simulações genéricas de mercado.",
      },
      {
        icon: FileCheck2,
        title: "Base institucional",
        description:
          "Dados exportáveis para relatório, coordenação e governança acadêmica.",
      },
    ],
    defaultTab: "cadastro",
    login: {
      label: "Entrar",
      eyebrow: "Ambiente institucional",
      title: "Acesse a leitura do campus.",
      description:
        "Revise alunos engajados, relatórios, horas de extensão e frentes ativas na operação.",
      fields: [
        {
          name: "email",
          label: "E-mail institucional",
          type: "email",
          placeholder: "coordenacao@universidade.edu.br",
          required: true,
        },
        {
          name: "password",
          label: "Senha",
          type: "password",
          placeholder: "••••••••",
          required: true,
        },
      ],
      submitLabel: "Entrar no portal",
      assistiveActionLabel: "Recuperar acesso",
      footerPrompt: "Sua instituição ainda não faz parte da rede?",
      footerActionLabel: "Ativar campus",
    },
    cadastro: {
      label: "Ativar campus",
      eyebrow: "Parceria acadêmica",
      title: "Abra uma frente institucional no HUB.",
      description:
        "Cadastre a IES, o responsável e a localização do campus para iniciar a parceria acadêmica.",
      fields: [
        {
          name: "institutionName",
          label: "Nome da IES",
          type: "text",
          placeholder: "Nome da instituição",
          required: true,
          colSpan: 2,
        },
        {
          name: "cnpj",
          label: "CNPJ",
          type: "text",
          placeholder: "00.000.000/0001-00",
          required: true,
        },
        {
          name: "responsavel",
          label: "Responsável",
          type: "text",
          placeholder: "Nome da coordenação",
          required: true,
        },
        {
          name: "campus",
          label: "Localização do campus",
          type: "text",
          placeholder: "Ex: Curitiba - PR",
          required: true,
          colSpan: 2,
        },
        {
          name: "emailCadastro",
          label: "E-mail institucional",
          type: "email",
          placeholder: "coordenacao@universidade.edu.br",
          required: true,
        },
        {
          name: "passwordCadastro",
          label: "Senha",
          type: "password",
          placeholder: "Mínimo 8 caracteres",
          required: true,
        },
      ],
      submitLabel: "Ativar campus",
      callout: {
        eyebrow: "Leitura institucional",
        body:
          "A operação gera base para coordenação, extensão, empregabilidade e relatórios institucionais em uma única trilha.",
      },
      legal:
        "Ao solicitar a ativação, a instituição concorda com os termos operacionais e com a política de dados da rede.",
      footerPrompt: "Já possui acesso acadêmico?",
      footerActionLabel: "Entrar no portal",
    },
  },
  prefeitura: {
    key: "prefeitura",
    href: "/auth/prefeitura",
    tone: "blue",
    icon: Landmark,
    portalLabel: "Programa Municipal",
    hubEyebrow: "Prefeituras",
    hubDescription:
      "Juventude, universidades e Agenda 2030 articuladas em um programa municipal com relatório público de impacto.",
    hubBullets: [
      "Abrir frente institucional por município",
      "Ler dados para gabinete e sociedade civil",
      "Conectar campus, jovens e empresas locais",
    ],
    eyebrow: "B2G // PROGRAMA_MUNICIPAL_ODS",
    title: "Agenda 2030 com juventude e prestação de contas.",
    description:
      "Ative um programa municipal com universidades parceiras, calendário de mobilização e relatório público para câmara, gabinete e sociedade civil.",
    metadata: [
      "Programa municipal estruturado",
      "Relatório público de impacto",
      "Agenda 2030 como linguagem comum",
    ],
    metrics: [
      { value: "12", label: "cidades ativas" },
      { value: "85K", label: "cidadãos impactados" },
      { value: "4", label: "eventos anuais por ciclo" },
      { value: "300+", label: "talentos mapeados" },
    ],
    highlights: [
      {
        icon: Landmark,
        title: "Linguagem institucional",
        description:
          "Programa, parceria, relatório e prestação de contas no centro da experiência.",
      },
      {
        icon: MapPin,
        title: "Base territorial",
        description:
          "Cidade, campus e empresas operando com leitura comum de prioridades.",
      },
      {
        icon: FileCheck2,
        title: "Relatório público",
        description:
          "Exportável para gabinete, câmara e articulação com sociedade civil.",
      },
    ],
    defaultTab: "cadastro",
    login: {
      label: "Entrar",
      eyebrow: "Ambiente institucional",
      title: "Acesse o programa municipal.",
      description:
        "Entre para revisar indicadores, frentes locais, cronograma e relatórios públicos do município.",
      fields: [
        {
          name: "email",
          label: "E-mail governamental",
          type: "email",
          placeholder: "gestao@cidade.gov.br",
          required: true,
        },
        {
          name: "password",
          label: "Senha",
          type: "password",
          placeholder: "••••••••",
          required: true,
        },
      ],
      submitLabel: "Entrar no programa",
      assistiveActionLabel: "Recuperar acesso",
      footerPrompt: "Seu município ainda não está ativo?",
      footerActionLabel: "Ativar município",
    },
    cadastro: {
      label: "Ativar município",
      eyebrow: "Ativação B2G",
      title: "Abra uma frente institucional por cidade.",
      description:
        "Cadastre o município, a prioridade pública e o responsável pela articulação local para iniciar a operação.",
      fields: [
        {
          name: "municipio",
          label: "Município",
          type: "text",
          placeholder: "Nome da cidade",
          required: true,
        },
        {
          name: "uf",
          label: "UF",
          type: "text",
          placeholder: "Estado",
          required: true,
        },
        {
          name: "responsavel",
          label: "Responsável",
          type: "text",
          placeholder: "Nome do gestor",
          required: true,
          colSpan: 2,
        },
        {
          name: "emailCadastro",
          label: "E-mail principal",
          type: "email",
          placeholder: "gestao@cidade.gov.br",
          required: true,
          colSpan: 2,
        },
        {
          name: "prioridade",
          label: "Prioridade municipal",
          type: "select",
          required: true,
          options: [
            { value: "residuos", label: "Gestão de resíduos (ODS 12)" },
            {
              value: "educacao",
              label: "Inclusão digital e educação (ODS 4)",
            },
            {
              value: "turismo",
              label: "Turismo sustentável e renda (ODS 8)",
            },
            { value: "energia", label: "Energia limpa (ODS 7)" },
          ],
        },
        {
          name: "passwordCadastro",
          label: "Senha",
          type: "password",
          placeholder: "Mínimo 8 caracteres",
          required: true,
        },
      ],
      submitLabel: "Agendar reunião institucional",
      callout: {
        eyebrow: "Agenda 2030 em linguagem pública",
        body:
          "A ativação prioriza calendário, governança local e relatório de impacto exportável para câmara e sociedade civil.",
      },
      legal:
        "Ao solicitar a ativação, o município concorda com os termos operacionais e com a política de dados da rede.",
      footerPrompt: "Já possui acesso institucional?",
      footerActionLabel: "Entrar no programa",
    },
  },
  embaixador: {
    key: "embaixador",
    href: "/auth/embaixador",
    tone: "blue",
    icon: Crown,
    portalLabel: "Embaixador de Impacto",
    hubEyebrow: "HUBs",
    hubDescription:
      "Liderança territorial para coordenar campus, empresas e poder público em uma operação local legível.",
    hubBullets: [
      "Coordenar o playbook do HUB local",
      "Articular campus, empresas e prefeitura",
      "Ler frentes ativas e expansão regional",
    ],
    eyebrow: "HUB_LOCAL // LEADERSHIP_LAYER",
    title: "Coordene um território com método e playbook.",
    description:
      "Embaixadores articulam campus, empresas e prefeitura em uma mesma mesa operacional. Liderança territorial com calendário, método e leitura central.",
    metadata: [
      "Playbook de ativação local",
      "Articulação regional em rede",
      "Operação visível para a central",
    ],
    metrics: [
      { value: "05", label: "frentes ativas" },
      { value: "24h", label: "setup inicial" },
      { value: "100%", label: "autonomia local" },
      { value: "1 playbook", label: "ritual operacional" },
    ],
    highlights: [
      {
        icon: Crown,
        title: "Liderança territorial",
        description:
          "Você se torna o nó local que organiza agenda e rituais.",
      },
      {
        icon: Users2,
        title: "Mesa multissetorial",
        description:
          "Campus, empresa e poder público operando com o mesmo mapa.",
      },
      {
        icon: Zap,
        title: "Expansão orientada",
        description:
          "Cada nova frente nasce com método, cadência e leitura central.",
      },
    ],
    defaultTab: "cadastro",
    login: {
      label: "Entrar",
      eyebrow: "Painel territorial",
      title: "Acesse seu HUB local.",
      description:
        "Entre para revisar frentes ativas, contatos institucionais, rituais e próximos desdobramentos regionais.",
      fields: [
        {
          name: "email",
          label: "E-mail principal",
          type: "email",
          placeholder: "lider@exemplo.com",
          required: true,
        },
        {
          name: "password",
          label: "Senha",
          type: "password",
          placeholder: "••••••••",
          required: true,
        },
      ],
      submitLabel: "Entrar no HUB",
      assistiveActionLabel: "Recuperar acesso",
      footerPrompt: "Quer liderar uma cidade da rede?",
      footerActionLabel: "Candidatar-se",
    },
    cadastro: {
      label: "Candidatar-se",
      eyebrow: "Liderança regional",
      title: "Apresente seu território e sua tese de ativação.",
      description:
        "Conte qual cidade você quer coordenar, por que ela importa e como pretende mobilizar os atores locais.",
      fields: [
        {
          name: "fullName",
          label: "Nome completo",
          type: "text",
          placeholder: "Seu nome completo",
          required: true,
          colSpan: 2,
        },
        {
          name: "emailCadastro",
          label: "E-mail principal",
          type: "email",
          placeholder: "seu@email.com",
          required: true,
        },
        {
          name: "cidade",
          label: "Cidade foco",
          type: "text",
          placeholder: "Ex: Campinas - SP",
          required: true,
        },
        {
          name: "motivacao",
          label: "Motivação",
          type: "textarea",
          placeholder:
            "Por que você quer coordenar o impacto no seu território?",
          rows: 4,
          required: true,
          colSpan: 2,
        },
        {
          name: "passwordCadastro",
          label: "Senha",
          type: "password",
          placeholder: "Mínimo 8 caracteres",
          required: true,
          colSpan: 2,
        },
      ],
      submitLabel: "Enviar candidatura",
      callout: {
        eyebrow: "Playbook local",
        body:
          "Após a triagem inicial, a rede central compartilha o plano de ativação territorial e o ritual de acompanhamento.",
      },
      legal:
        "Ao enviar a candidatura, você concorda com os termos operacionais e com a política de dados da rede.",
      footerPrompt: "Já possui acesso como liderança local?",
      footerActionLabel: "Entrar no HUB",
    },
  },
};
