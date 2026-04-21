# Brasil Sustenta — Implementation Status v2

Atualizado: 2026-04-17

---

## Estado consolidado

### Visual
- **Filosofia**: Brutalism Tropical / Neon Patria
- **Tema**: dark (unico)
- **Paleta**: #050505 (bg), #00FF41 (verde neon), #FFD700 (amarelo neon), #0047FF (azul neon)
- **Fontes**: Fraunces (display), Inter (body), JetBrains Mono (scores)
- **Referencia**: `DESIGN_SYSTEM_V2.md`

### Stack
- React 19 + Vite + Tailwind 4 + shadcn/ui + Framer Motion
- Express + tRPC v11 + Drizzle ORM + PostgreSQL (Supabase)
- Auth: em migracao para Supabase Auth (Sprint -1)
- Deploy: Vercel (Sprint -1)

---

## O que esta pronto (v1)

### Frontend
- Home com blocos narrativos
- Header com dropdowns por buyer
- Footer com CTAs
- Paginas publicas: ParaEmpresas, ParaJovens, ParaUniversidades
- Paginas institucionais: QuemSomos, Manifesto, Impacto, Stakeholders, Hubs
- Login/Cadastro: empresa, jovem, universidade
- Dashboard Empresa (parcial): criar projeto, listar, visualizar candidatos
- Admin: layout sidebar, gestao de usuarios, dashboard estatisticas
- Perfis: empresa, talento, universidade
- Upload de imagens
- Formularios: contato, duvidas, parceria universitaria
- Mapa vetorial de HUBs

### Backend
- 17 routers: auth, profile, upload, contact, student, company, talent, university, blog, project, dashboard, ai, event, article, report, material, user
- 18 tabelas no schema Drizzle
- AI matching basico (skills + ESG keywords)

---

## O que precisa ser feito (v2)

### Sprint -1: Migracao
- Auth OAuth legado → Supabase Auth
- Storage S3 → Supabase Storage
- Deploy → Vercel
- Limpar dependencias legadas do package.json

### Sprint 0-7: Funcionalidades v2
Ver `SPRINT_PLAN_CODE.md` e `todo.md` para breakdown completo.

Resumo: 4 tabelas novas, ODS Fit Score, 5 dashboards (2 novos), pagina B2G, Design System v2 aplicado, CMS, relatorios PDF, QA.

---

## Arquivos-chave

| Area | Arquivo |
|---|---|
| Router | client/src/App.tsx |
| Styles | client/src/index.css |
| Theme | client/src/contexts/ThemeContext.tsx |
| Header | client/src/components/Header.tsx |
| Footer | client/src/components/Footer.tsx |
| Schema | drizzle/schema.ts |
| AI Router | server/routers/ai.ts |
| Auth (migrar) | server/_core/sdk.ts, server/_core/oauth.ts |
| Hub Data | client/src/lib/hubs.ts |

---

## Regras de continuidade

1. Ler `DESIGN_SYSTEM_V2.md` antes de qualquer mudanca visual
2. Ler `COPYWRITING_GUIDE.md` antes de escrever copy
3. Ler `.agent/PROJECT_CONTEXT.md` para contexto rapido
4. Mobile-first: breakpoint menor primeiro
5. Anti-AI estetico: zero templates, zero icones generativos
6. Nunca alterar `Brasil_Sustenta_CEO_COO_v2.md`
