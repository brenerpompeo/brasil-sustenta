# PROJECT CONTEXT — Brasil Sustenta 🌱

## 🎯 Identidade
- **Nome**: Brasil Sustenta
- **Tipo**: Plataforma de Inteligência de Negócios Sustentáveis
- **Status**: #projeto/ativo
- **Relacionado a**: [[Deep Memory: Brasil Sustenta Context]] | [[Brasil Sustenta Dashboard]]

## 🔗 Repositório
- **URL**: https://github.com/brasil-sustenta/plataforma
- **Owner**: `brasil-sustenta` ← SEMPRE usar este owner nas chamadas GitHub
- **Committer**: `brenerpompeo` (brenerpompeo@brasil-sustenta.org)
- **Branch principal**: `main`
- **Branch de develop**: `develop`

## 🧭 Path Canônico na Vault
- **Raiz do domínio**: `20 Action/21 Projects/Brasil Sustenta/`
- **App ativo**: `20 Action/21 Projects/Brasil Sustenta/brasil-sustenta/`
- **Deep Memory**: `00 System/Deep Memory: Brasil Sustenta Context.md`

## 📍 Arquivos Novos Relevantes
- `brasil-sustenta/server/index.ts` (servidor principal tRPC)
- `brasil-sustenta/drizzle/schema.ts` (schema do banco de dados)
- `brasil-sustenta/shared/types.ts` (types compartilhados)
- `brasil-sustenta/server/_core/trpc.ts` (configuração tRPC)
- `brasil-sustenta/server/_core/llm.ts` (integração com LLMs para análises ESG)

## 🛠 Stack Técnica
- TypeScript 5.x
- tRPC v11 (backend + frontend)
- Drizzle ORM
- PostgreSQL (Supabase)
- React 19
- Vite 6
- TailwindCSS 4
- shadcn/ui
- Zod (validação)
- JWT (autenticação)

## 📁 Estrutura principal
```
brasil-sustenta/
├── server/           # Servidor tRPC
│   ├── _core/       # Core funcionalidades
│   └── routers/     # Rotas da API
├── shared/           # Código compartilhado
│   ├── types/       # Types TypeScript
│   └── const/       # Constantes
├── drizzle/          # Schema e migrações DB
│   ├── schema.ts
│   └── migrations/
├── components/       # UI components (shadcn/ui)
├── pages/           # Páginas Next.js-like
└── public/          # Assets estáticos
```

## 🌍 Foco de Sustentabilidade
- ESG (Environmental, Social, Governance)
- Economia Criativa
- Tecnologia Social
- Inovação de Impacto

## 🤝 Parcerias Estratégicas
- **Sebrae Nacional**: Programa de sustentabilidade para pequenos negócios
- **Fundação Banco do Brasil**: Financiamento de projetos socioambientais
- **UNDP Brasil**: Alinhamento com ODS da ONU
- **ABEPRO**: Associação Brasileira de Empresas de Tecnologia

## 📊 KPIs 2026
- Redução de carbono rastreada: 10.000 tCO₂e
- Empresas beneficiadas: 500+
- Investimento mobilizado: R$ 50M em projetos verdes
- Usuários ativos mensais: 10K+

## 🧠 MemPalace
- **Wing**: `brasil_sustenta`
- **Referências**: 
  - [[Deep Memory: Brasil Sustenta Context]]
  - [[Brasil Sustenta Dashboard]]
- Busca: `mempalace_search(query, wing="brasil_sustenta")`

## 📌 Regras Críticas
1. **NUNCA** commitar `.env` ou variáveis sensíveis
2. Usar owner `brasil-sustenta` em todas as chamadas GitHub
3. Deploy via Vercel com preview branches (`vercel --prod`)
4. Migrações Drizzle devem ser testadas em staging antes de production
5. Todas as análises ESG devem ter fontes verificáveis e auditoria
6. Ao iniciar sessão, usar o app em `Brasil Sustenta/brasil-sustenta/`
7. Validação de dados via Zod em todas as fronteiras (API/UI/DB)