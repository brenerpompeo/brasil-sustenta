import { and, eq, inArray, sql } from "drizzle-orm";
import { getDb } from "../db";
import {
  applications,
  matchDecisions,
  projects,
  talentProfiles,
  type Application,
  type Project,
  type TalentProfile,
} from "../../drizzle/schema";
import { suzely } from "./suzely";
import { fuseRankedLists } from "./vector-utils";
import {
  SUZELY_MODEL_VERSION,
  SUZELY_PIPELINE_VERSION,
  type AllocationInput,
  type AllocationResult,
  type FairnessAudit,
  type MatchSubscores,
  type RerankedCandidate,
  type RetrievedCandidate,
  type RetrievalQuery,
} from "../../shared/suzely";

type SuzelyDb = NonNullable<Awaited<ReturnType<typeof getDb>>>;

type ProjectRecord = Pick<
  Project,
  | "id"
  | "title"
  | "description"
  | "requiredSkills"
  | "odsAlignment"
  | "teamSize"
  | "companyId"
  | "hubLocalId"
  | "embedding"
  | "briefEmbedding"
  | "skillsEmbedding"
  | "odsEmbedding"
  | "category"
>;

type TalentRecord = Pick<
  TalentProfile,
  | "id"
  | "userId"
  | "fullName"
  | "bio"
  | "skills"
  | "portfolio"
  | "linkedin"
  | "github"
  | "avatar"
  | "course"
  | "universityId"
  | "embedding"
  | "bioEmbedding"
  | "skillsEmbedding"
  | "odsEmbedding"
  | "isAvailable"
>;

function normalizeText(value: string | null | undefined): string {
  return (value || "").toLowerCase().trim();
}

function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(/[^a-z0-9]+/i)
    .filter(token => token.length > 2);
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function overlapScore(left: string[], right: string[]): number {
  if (!left.length || !right.length) return 0;
  const rightSet = new Set(right.map(item => item.toLowerCase()));
  const overlap = left.filter(item => rightSet.has(item.toLowerCase()));
  return Math.round((overlap.length / Math.max(left.length, 1)) * 100);
}

function buildProjectTexts(project: ProjectRecord) {
  const requiredSkills = project.requiredSkills || [];
  const odsAlignment = (project.odsAlignment || []).map(String);
  return {
    brief: `${project.title}. ${project.description}`,
    skills: requiredSkills.join(", "),
    ods: odsAlignment.join(", "),
    lexical: `${project.title} ${project.description} ${requiredSkills.join(" ")} ODS ${odsAlignment.join(" ")}`.trim(),
  };
}

function buildTalentTexts(talent: TalentRecord) {
  const skills = talent.skills || [];
  return {
    bio: talent.bio || "",
    skills: skills.join(", "),
    ods: `${skills.join(" ")} ${talent.bio || ""}`.trim(),
    lexical: `${talent.fullName} ${talent.bio || ""} ${skills.join(" ")} ${talent.course || ""}`.trim(),
  };
}

function quoteFromProject(project: ProjectRecord): string[] {
  return [suzely.sentenceSnippet(`${project.title}. ${project.description}`)];
}

function quoteFromTalent(talent: TalentRecord): string[] {
  return [suzely.sentenceSnippet(`${talent.fullName}. ${talent.bio || talent.skills?.join(", ") || ""}`)];
}

function buildFairnessAudit(talent: TalentRecord): FairnessAudit {
  const reasons: string[] = [];
  if (!talent.isAvailable) reasons.push("Talent marked as unavailable.");
  return {
    eligible: reasons.length === 0,
    reasons,
    version: SUZELY_PIPELINE_VERSION,
  };
}

export function computeDeterministicSubscores(
  project: ProjectRecord,
  talent: TalentRecord
): MatchSubscores {
  const requiredSkills = project.requiredSkills || [];
  const talentSkills = talent.skills || [];
  const projectOds = (project.odsAlignment || []).map(String);
  const talentTokens = tokenize(`${talent.bio || ""} ${talentSkills.join(" ")}`);
  const projectTokens = tokenize(`${project.title} ${project.description}`);

  const skills = requiredSkills.length ? overlapScore(requiredSkills, talentSkills) : 50;
  const ods = projectOds.length
    ? Math.min(
        100,
        overlapScore(
          projectOds,
          unique(
            talentTokens.filter(token =>
              ["1", "2", "3", "4", "5", "8", "9", "10", "11", "12", "13", "16", "17"].includes(token)
            )
          )
        ) + overlapScore(["esg", "ods", "impacto", "sustentabilidade"], talentTokens)
      )
    : 50;
  const contextSignals = [
    talent.portfolio ? 25 : 0,
    talent.linkedin ? 20 : 0,
    talent.github ? 20 : 0,
    talent.bio ? 20 : 0,
    talent.course ? 15 : 0,
  ];
  const context = Math.min(100, contextSignals.reduce((sum, value) => sum + value, 0));
  const availability = talent.isAvailable ? 100 : 0;
  const territory =
    project.hubLocalId && talent.universityId
      ? 75
      : overlapScore(projectTokens.slice(0, 8), talentTokens.slice(0, 8)) || 50;

  return { skills, ods, context, availability, territory };
}

export function scoreSubscores(subscores: MatchSubscores): number {
  return Math.round(
    subscores.skills * 0.35 +
      subscores.ods * 0.25 +
      subscores.context * 0.15 +
      subscores.availability * 0.15 +
      subscores.territory * 0.1
  );
}

export function computeLexicalRanking(
  project: ProjectRecord,
  talents: TalentRecord[]
): Array<{ id: number; lexicalScore: number; reasons: string[] }> {
  const projectText = buildProjectTexts(project);
  const requiredSkills = project.requiredSkills || [];
  const projectTokens = tokenize(projectText.lexical);

  return talents
    .map(talent => {
      const talentText = buildTalentTexts(talent);
      const talentTokens = tokenize(talentText.lexical);
      const skillOverlap = overlapScore(requiredSkills, talent.skills || []);
      const tokenOverlap = overlapScore(projectTokens, talentTokens);
      const lexicalScore = Math.round(skillOverlap * 0.65 + tokenOverlap * 0.35);
      const reasons = [];
      if (skillOverlap > 0) reasons.push("skill_overlap");
      if (tokenOverlap > 0) reasons.push("lexical_overlap");
      return { id: talent.id, lexicalScore, reasons };
    })
    .sort((a, b) => b.lexicalScore - a.lexicalScore);
}

async function ensureProjectEmbeddings(db: SuzelyDb, project: ProjectRecord): Promise<ProjectRecord> {
  const payload = buildProjectTexts(project);
  const updates: Partial<ProjectRecord> = {};

  if (!project.embedding) updates.embedding = await suzely.generateEmbedding(payload.lexical);
  if (!project.briefEmbedding) updates.briefEmbedding = await suzely.generateEmbedding(payload.brief);
  if (!project.skillsEmbedding) updates.skillsEmbedding = await suzely.generateEmbedding(payload.skills || payload.lexical);
  if (!project.odsEmbedding) updates.odsEmbedding = await suzely.generateEmbedding(payload.ods || payload.lexical);

  if (Object.keys(updates).length) {
    await db.update(projects).set(updates).where(eq(projects.id, project.id));
  }

  return { ...project, ...updates };
}

async function queryVectorIds(
  db: SuzelyDb,
  vectorColumn: any,
  queryEmbedding: number[] | null | undefined,
  limit: number
): Promise<number[]> {
  if (!queryEmbedding) return [];

  const rows = await db
    .select({ id: talentProfiles.id })
    .from(talentProfiles)
    .where(eq(talentProfiles.isAvailable, true))
    .orderBy(sql`${vectorColumn} <=> ${JSON.stringify(queryEmbedding)}`)
    .limit(limit);

  return rows.map(row => row.id);
}

async function getProjectRecord(db: SuzelyDb, projectId: number): Promise<ProjectRecord> {
  const [project] = await db
    .select({
      id: projects.id,
      title: projects.title,
      description: projects.description,
      requiredSkills: projects.requiredSkills,
      odsAlignment: projects.odsAlignment,
      teamSize: projects.teamSize,
      companyId: projects.companyId,
      hubLocalId: projects.hubLocalId,
      embedding: projects.embedding,
      briefEmbedding: projects.briefEmbedding,
      skillsEmbedding: projects.skillsEmbedding,
      odsEmbedding: projects.odsEmbedding,
      category: projects.category,
    })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
}

async function getTalentsByIds(db: SuzelyDb, ids: number[]): Promise<TalentRecord[]> {
  if (!ids.length) return [];

  return db
    .select({
      id: talentProfiles.id,
      userId: talentProfiles.userId,
      fullName: talentProfiles.fullName,
      bio: talentProfiles.bio,
      skills: talentProfiles.skills,
      portfolio: talentProfiles.portfolio,
      linkedin: talentProfiles.linkedin,
      github: talentProfiles.github,
      avatar: talentProfiles.avatar,
      course: talentProfiles.course,
      universityId: talentProfiles.universityId,
      embedding: talentProfiles.embedding,
      bioEmbedding: talentProfiles.bioEmbedding,
      skillsEmbedding: talentProfiles.skillsEmbedding,
      odsEmbedding: talentProfiles.odsEmbedding,
      isAvailable: talentProfiles.isAvailable,
    })
    .from(talentProfiles)
    .where(and(eq(talentProfiles.isAvailable, true), inArray(talentProfiles.id, ids)));
}

async function getEligibleTalentPool(db: SuzelyDb, limit: number): Promise<TalentRecord[]> {
  return db
    .select({
      id: talentProfiles.id,
      userId: talentProfiles.userId,
      fullName: talentProfiles.fullName,
      bio: talentProfiles.bio,
      skills: talentProfiles.skills,
      portfolio: talentProfiles.portfolio,
      linkedin: talentProfiles.linkedin,
      github: talentProfiles.github,
      avatar: talentProfiles.avatar,
      course: talentProfiles.course,
      universityId: talentProfiles.universityId,
      embedding: talentProfiles.embedding,
      bioEmbedding: talentProfiles.bioEmbedding,
      skillsEmbedding: talentProfiles.skillsEmbedding,
      odsEmbedding: talentProfiles.odsEmbedding,
      isAvailable: talentProfiles.isAvailable,
    })
    .from(talentProfiles)
    .where(eq(talentProfiles.isAvailable, true))
    .limit(limit);
}

export async function runRetrieval(
  db: SuzelyDb,
  query: RetrievalQuery
): Promise<{
  project: ProjectRecord;
  talents: TalentRecord[];
  candidates: RetrievedCandidate[];
}> {
  const candidatePoolLimit = query.candidatePoolLimit ?? 60;
  const retrievalLimit = query.limit ?? 10;
  const rawProject = await getProjectRecord(db, query.projectId);
  const project = await ensureProjectEmbeddings(db, rawProject);

  const eligibleTalents = await getEligibleTalentPool(db, Math.max(candidatePoolLimit * 2, 100));
  const lexicalRanking = computeLexicalRanking(project, eligibleTalents);

  const [briefVectorIds, skillsVectorIds, odsVectorIds, fallbackVectorIds] = await Promise.all([
    queryVectorIds(
      db,
      talentProfiles.bioEmbedding,
      project.briefEmbedding || project.embedding,
      candidatePoolLimit
    ),
    queryVectorIds(
      db,
      talentProfiles.skillsEmbedding,
      project.skillsEmbedding || project.embedding,
      candidatePoolLimit
    ),
    queryVectorIds(
      db,
      talentProfiles.odsEmbedding,
      project.odsEmbedding || project.embedding,
      candidatePoolLimit
    ),
    queryVectorIds(db, talentProfiles.embedding, project.embedding, candidatePoolLimit),
  ]);

  const fused = fuseRankedLists([
    { ids: lexicalRanking.map(item => item.id), weight: 1 },
    { ids: briefVectorIds, weight: 1.1 },
    { ids: skillsVectorIds, weight: 1.15 },
    { ids: odsVectorIds, weight: 1 },
    { ids: fallbackVectorIds, weight: 0.8 },
  ]);

  const topIds = fused.slice(0, candidatePoolLimit).map(item => item.id);
  const talents = await getTalentsByIds(db, topIds);
  const lexicalById = new Map(lexicalRanking.map(item => [item.id, item]));
  const vectorIds = new Set([...briefVectorIds, ...skillsVectorIds, ...odsVectorIds, ...fallbackVectorIds]);

  const candidates = fused.slice(0, retrievalLimit).map(item => {
    const lexical = lexicalById.get(item.id);
    const reasons = [...(lexical?.reasons || [])];
    if (vectorIds.has(item.id)) reasons.push("vector_recall");

    return {
      talentId: item.id,
      fusedScore: Number(item.rrfScore.toFixed(6)),
      vectorScore: vectorIds.has(item.id) ? 1 : 0,
      lexicalScore: lexical?.lexicalScore || 0,
      reasons: unique(reasons),
    };
  });

  return { project, talents, candidates };
}

export async function runReranking(
  db: SuzelyDb,
  query: RetrievalQuery
): Promise<{
  project: ProjectRecord;
  reranked: RerankedCandidate[];
}> {
  const { project, talents, candidates } = await runRetrieval(db, {
    ...query,
    limit: query.candidatePoolLimit ?? 20,
  });

  const candidatesById = new Map(candidates.map(candidate => [candidate.talentId, candidate]));
  const rerankBase = talents
    .map(talent => {
      const retrieval = candidatesById.get(talent.id);
      if (!retrieval) return null;

      const subscores = computeDeterministicSubscores(project, talent);
      const deterministicScore = scoreSubscores(subscores);
      const fairnessAudit = buildFairnessAudit(talent);

      return {
        projectId: project.id,
        talentId: talent.id,
        deterministicScore,
        subscores,
        fairnessAudit,
        retrieval,
        talent,
      };
    })
    .filter(Boolean)
    .sort((a, b) => (b?.deterministicScore || 0) - (a?.deterministicScore || 0));

  const evidenceBatch = await suzely.generateEvidenceBatch(
    `${project.title}. ${project.description}`,
    rerankBase.slice(0, query.limit ?? 5).map(item => ({
      id: item!.talentId,
      content: `${item!.talent.fullName}. ${item!.talent.bio || ""} Skills: ${(item!.talent.skills || []).join(", ")}`,
      skills: item!.talent.skills || [],
      deterministicScore: item!.deterministicScore,
      fallbackReasoning: suzely.buildFallbackReasoning(item!.subscores),
      fallbackQuotesFromTalent: quoteFromTalent(item!.talent),
      fallbackQuotesFromProject: quoteFromProject(project),
    }))
  );

  const reranked = rerankBase
    .map(item => {
      const evidence = evidenceBatch[item!.talentId];
      const hasEvidence =
        Boolean(evidence?.evidenceQuotesFromTalent?.length) &&
        Boolean(evidence?.evidenceQuotesFromProject?.length);
      const penalty = hasEvidence ? 0 : 15;
      const llmScore = typeof evidence?.score === "number" ? evidence.score : item!.deterministicScore;
      const finalScore = Math.max(0, Math.round(llmScore * 0.65 + item!.deterministicScore * 0.35 - penalty));

      return {
        projectId: project.id,
        talentId: item!.talentId,
        finalScore,
        subscores: item!.subscores,
        reasoning: evidence?.reasoning || suzely.buildFallbackReasoning(item!.subscores),
        evidenceQuotesFromTalent: evidence?.evidenceQuotesFromTalent?.length
          ? evidence.evidenceQuotesFromTalent
          : quoteFromTalent(item!.talent),
        evidenceQuotesFromProject: evidence?.evidenceQuotesFromProject?.length
          ? evidence.evidenceQuotesFromProject
          : quoteFromProject(project),
        confidence: evidence?.confidence || "low",
        retrieval: item!.retrieval,
        pipelineVersion: SUZELY_PIPELINE_VERSION,
        modelVersion: SUZELY_MODEL_VERSION,
        fairnessAudit: item!.fairnessAudit,
      } satisfies RerankedCandidate;
    })
    .sort((a, b) => b.finalScore - a.finalScore);

  return {
    project,
    reranked: reranked.slice(0, query.limit ?? 10),
  };
}

export function stableAllocateManyToOne(inputs: AllocationInput[]): AllocationResult[] {
  const offers = new Map<number, { projectId: number; candidate: RerankedCandidate }>();
  const projectStates = new Map(
    inputs.map(input => [
      input.projectId,
      {
        capacity: input.projectCapacity,
        pointer: 0,
        preferences: input.candidates.slice(),
      },
    ])
  );
  const pendingProjects = inputs
    .filter(input => input.projectCapacity > 0)
    .map(input => input.projectId);

  while (pendingProjects.length) {
    const projectId = pendingProjects.shift()!;
    const state = projectStates.get(projectId);
    if (!state) continue;

    const acceptedByProject = Array.from(offers.values()).filter(offer => offer.projectId === projectId);
    if (acceptedByProject.length >= state.capacity) continue;

    while (state.pointer < state.preferences.length && acceptedByProject.length < state.capacity) {
      const candidate = state.preferences[state.pointer++];
      if (!candidate.fairnessAudit.eligible) continue;

      const existing = offers.get(candidate.talentId);
      if (!existing) {
        offers.set(candidate.talentId, { projectId, candidate });
        acceptedByProject.push({ projectId, candidate });
        continue;
      }

      if (candidate.finalScore > existing.candidate.finalScore) {
        offers.set(candidate.talentId, { projectId, candidate });
        pendingProjects.push(existing.projectId);
        acceptedByProject.push({ projectId, candidate });
      }
    }

    const stillNeedsSeats =
      Array.from(offers.values()).filter(offer => offer.projectId === projectId).length < state.capacity &&
      state.pointer < state.preferences.length;

    if (stillNeedsSeats) pendingProjects.push(projectId);
  }

  return inputs.map(input => {
    const accepted = Array.from(offers.values())
      .filter(offer => offer.projectId === input.projectId)
      .map(offer => offer.candidate)
      .sort((a, b) => b.finalScore - a.finalScore);

    const acceptedIds = new Set(accepted.map(candidate => candidate.talentId));
    const waitlisted = input.candidates.filter(
      candidate => candidate.fairnessAudit.eligible && !acceptedIds.has(candidate.talentId)
    );
    const excluded = input.candidates
      .filter(candidate => !candidate.fairnessAudit.eligible)
      .map(candidate => ({
        ...candidate,
        exclusionReason: candidate.fairnessAudit.reasons.join("; ") || "Ineligible for allocation.",
      }));

    return {
      projectId: input.projectId,
      allocated: accepted,
      waitlisted,
      excluded,
      pipelineVersion: SUZELY_PIPELINE_VERSION,
    };
  });
}

async function persistProjectAllocation(
  db: SuzelyDb,
  result: AllocationResult,
  applicationsByKey: Map<string, Application>
): Promise<void> {
  const records = [
    ...result.allocated.map((candidate, index) => ({
      candidate,
      allocationStatus: "allocated",
      allocationRank: index + 1,
    })),
    ...result.waitlisted.map((candidate, index) => ({
      candidate,
      allocationStatus: "waitlisted",
      allocationRank: index + 1,
    })),
    ...result.excluded.map((candidate, index) => ({
      candidate,
      allocationStatus: "excluded",
      allocationRank: index + 1,
    })),
  ];

  for (const record of records) {
    const application = applicationsByKey.get(`${result.projectId}:${record.candidate.talentId}`);

    await db.insert(matchDecisions).values({
      projectId: result.projectId,
      talentId: record.candidate.talentId,
      applicationId: application?.id || null,
      stage: "allocation",
      pipelineVersion: record.candidate.pipelineVersion,
      modelVersion: record.candidate.modelVersion,
      score: record.candidate.finalScore,
      confidence: record.candidate.confidence,
      reasoning: record.candidate.reasoning,
      subscores: record.candidate.subscores,
      evidenceQuotesFromTalent: record.candidate.evidenceQuotesFromTalent,
      evidenceQuotesFromProject: record.candidate.evidenceQuotesFromProject,
      fairnessAudit: record.candidate.fairnessAudit,
      allocationStatus: record.allocationStatus,
      allocationRank: record.allocationRank,
    });

    if (application) {
      await db
        .update(applications)
        .set({
          odsFitScore: record.candidate.finalScore,
          odsFitExplanation: record.candidate.reasoning,
          matchAudit: {
            pipelineVersion: record.candidate.pipelineVersion,
            modelVersion: record.candidate.modelVersion,
            stage: "allocation",
            score: record.candidate.finalScore,
            confidence: record.candidate.confidence,
            reasoning: record.candidate.reasoning,
            subscores: record.candidate.subscores,
            evidenceQuotesFromTalent: record.candidate.evidenceQuotesFromTalent,
            evidenceQuotesFromProject: record.candidate.evidenceQuotesFromProject,
            fairnessAudit: record.candidate.fairnessAudit,
          },
        })
        .where(eq(applications.id, application.id));
    }
  }
}

export async function runAllocationBatch(
  db: SuzelyDb,
  projectIds?: number[]
): Promise<{ results: AllocationResult[]; processedProjects: number }> {
  const openProjects = await db
    .select({ id: projects.id, teamSize: projects.teamSize, status: projects.status })
    .from(projects)
    .where(projectIds?.length ? inArray(projects.id, projectIds) : eq(projects.status, "open"));

  const activeProjects = openProjects.filter(project => project.status === "open");
  const rerankedPerProject = await Promise.all(
    activeProjects.map(project =>
      runReranking(db, {
        projectId: project.id,
        limit: Math.max(project.teamSize * 3, 6),
        candidatePoolLimit: Math.max(project.teamSize * 10, 40),
      })
    )
  );

  const inputs: AllocationInput[] = rerankedPerProject.map(({ project, reranked }) => ({
    projectId: project.id,
    projectCapacity: project.teamSize,
    candidates: reranked,
  }));

  const results = stableAllocateManyToOne(inputs);
  const applicationsList = await db
    .select()
    .from(applications)
    .where(inArray(applications.projectId, activeProjects.map(project => project.id)));
  const applicationsByKey = new Map(
    applicationsList.map(application => [`${application.projectId}:${application.talentId}`, application])
  );

  for (const result of results) {
    await persistProjectAllocation(db, result, applicationsByKey);
  }

  return {
    results,
    processedProjects: results.length,
  };
}
