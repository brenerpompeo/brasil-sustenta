# Suzely VNext Spec

Atualizado: 2026-04-23

## Objetivo
Definir a estrutura oficial do `ODS Score` e do `Matching` dentro da Brasil Sustenta.

Suzely nao e busca de curriculos. Ela e um pipeline de decisao com tres estagios:

1. `Retrieval`
2. `Reranking`
3. `Allocation`

## Retrieval
Responsabilidade:
- formar o candidate set inicial
- maximizar recall sem decidir alocacao final

Regras:
- aplicar `pre-filtering` por disponibilidade e elegibilidade
- usar sinais vetoriais e lexicais distintos
- fundir rankings com `RRF` ou weighted fusion

Output:
```ts
type RetrievalOutput = {
  projectId: number
  candidates: Array<{
    talentId: number
    fusedScore: number
    vectorScore: number
    lexicalScore: number
    reasons: string[]
  }>
}
```

## ODS Score
Responsabilidade:
- medir aderencia entre `um talento` e `um projeto`
- explicar o fit com sub-scores e evidencias

Contrato:
```ts
type ODSSubscores = {
  skills: number
  ods: number
  context: number
  availability: number
  territory: number
}

type ODSEvidence = {
  reasoning: string
  evidenceQuotesFromTalent: string[]
  evidenceQuotesFromProject: string[]
  confidence: "high" | "medium" | "low"
}

type ODSScoreResult = {
  projectId: number
  talentId: number
  totalScore: number
  subscores: ODSSubscores
  evidence: ODSEvidence
  pipelineVersion: string
  modelVersion: string
}
```

Formula:
```ts
totalScore =
  skills * 0.35 +
  ods * 0.25 +
  context * 0.15 +
  availability * 0.15 +
  territory * 0.10
```

Definicao das dimensoes:
- `skills`: overlap entre `requiredSkills` e `skills`
- `ods`: proximidade entre `odsAlignment` e sinais ODS do talento
- `context`: densidade do perfil, portfolio e maturidade
- `availability`: elegibilidade operacional
- `territory`: aderencia territorial ou institucional

Governanca:
- score sem `subscores` e invalido
- `confidence = high` exige evidencia literal dos dois lados
- talento indisponivel nao recebe score operacional alto
- justificativa sem citacao deve reduzir confianca

## Matching
Responsabilidade:
- usar o `ODS Score` para resolver distribuicao final entre projetos e talentos

Contrato:
```ts
type MatchDecision = {
  projectId: number
  talentId: number
  status: "allocated" | "waitlisted" | "excluded"
  rank: number | null
  reason: string
  fairnessAudit: {
    eligible: boolean
    reasons: string[]
    version: string
  }
}
```

Regras:
- `teamSize` e limite duro
- talento inelegivel nao vira `allocated`
- mesmo talento nao ocupa duas alocacoes incompatíveis
- fairness entra como desempate quando scores sao proximos
- toda exclusao precisa de razao persistida

Output:
```ts
type AllocationOutput = {
  projectId: number
  allocated: MatchDecision[]
  waitlisted: MatchDecision[]
  excluded: MatchDecision[]
}
```

## Persistencia
Campos obrigatorios na trilha de auditoria:
- `pipelineVersion`
- `modelVersion`
- `score`
- `subscores`
- `reasoning`
- `evidenceQuotesFromTalent`
- `evidenceQuotesFromProject`
- `confidence`
- `fairnessAudit`
- `allocationStatus`
- `allocationRank`

Artefatos atuais:
- `applications.matchAudit`
- `match_decisions`

## Implementacao Atual
Arquivos principais:
- `server/lib/suzely-pipeline.ts`
- `server/lib/suzely.ts`
- `shared/suzely.ts`
- `server/routers/ai.ts`
- `drizzle/schema.ts`

## Definicao Final
`Retrieval` encontra.
`ODS Score` mede e explica.
`Matching` distribui com justica.
