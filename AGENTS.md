# AGENTS.md — Brasil Sustenta
**Idioma**: PT-BR obrigatório | **Contexto global**: ver `../../AGENTS.md`

## PROJETO
Plataforma AI-first de squads ESG universitários com matching semântico (Suzely), presença territorial e entregas mensuráveis.

## STACK
- Frontend: Next.js + React 19 + TypeScript + Tailwind v4 + shadcn/ui
- Backend: Express + tRPC v11 + Drizzle ORM
- DB: Supabase (PostgreSQL + pgvector)
- Deploy: Vercel (frontend) + Supabase (backend/db)

## DESIGN SYSTEM — BRUTALISMO TROPICAL
- Background: `#050505` | Verde neon: `#00FF41` | Amarelo: `#FFD700` | Azul: `#0047FF`
- Fontes: Fraunces (display), Inter (body), JetBrains Mono (scores)
- Mobile-first, touch targets 44px mínimo
- Ler `DESIGN_SYSTEM_V2.md` e `COPYWRITING_GUIDE.md` antes de tocar UI/copy
- NUNCA alterar `Brasil_Sustenta_CEO_COO_v2.md`

## SUZELY — MOTOR DE MATCHING
- `server/lib/suzely-pipeline.ts` — pipeline principal
- `server/lib/suzely.ts` — lógica de scoring
- ODS Score: skills 35%, ods 25%, context 15%, availability 15%, territory 10%

## DOCS-CHAVE
- `.agent/PROJECT_CONTEXT.md` — contexto atual do projeto
- `DESIGN_SYSTEM_V2.md` — design system completo
- `COPYWRITING_GUIDE.md` — guia de linguagem
- `SPRINT_PLAN_CODE.md` — plano de sprint atual
- `MASTER_ORCHESTRATION.md` — orquestração geral

## CEO DO PROJETO
Atlas (claude-opus-4-6) — paperclip ID: fa5982ba-db8c-4e3a-b30a-e3893f108a13

> "A evidência é a única verdade. O impacto que não é medido, não existe." — Atlas
