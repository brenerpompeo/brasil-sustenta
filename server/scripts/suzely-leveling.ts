import "dotenv/config";
import { getDb } from "../db";
import { talentProfiles, projects } from "../../drizzle/schema";
import { suzely } from "../lib/suzely";
import { isNull, sql } from "drizzle-orm";

/**
 * Suzely Leveling Script (V3.0)
 */

async function main() {
  console.log("🚀 [Suzely] Starting Batch Leveling... (V3.0 Unicorn Upgrade)");
  
  const db = await getDb();
  if (!db) {
    console.error("❌ Database unavailable.");
    process.exit(1);
  }

  let totalProcessed = 0;
  let totalErrors = 0;

  // 1. Leveling Talents
  console.log("🔍 Scanning Talents...");
  const talentsToUpdate = await db
    .select()
    .from(talentProfiles)
    .where(sql`${talentProfiles.embedding} IS NULL`);

  console.log(`📊 Found ${talentsToUpdate.length} talents to modernize.`);

  for (const talent of talentsToUpdate) {
    try {
      console.log(`✨ Vectorizing Talent: ${talent.fullName}...`);
      const context = `${talent.fullName}: ${talent.bio}. Skills: ${talent.skills?.join(", ")}`;
      const embedding = await suzely.generateEmbedding(context);
      
      await db.update(talentProfiles)
        .set({ embedding })
        .where(sql`id = ${talent.id}`);
      totalProcessed++;
    } catch (e) {
      console.error(`❌ Failed to vectorize talent ${talent.id}:`, (e as any).message);
      totalErrors++;
    }
  }

  // 2. Leveling Projects
  console.log("\n🔍 Scanning Projects...");
  const projectsToUpdate = await db
    .select()
    .from(projects)
    .where(sql`${projects.embedding} IS NULL`);

  console.log(`📊 Found ${projectsToUpdate.length} projects to modernize.`);

  for (const project of projectsToUpdate) {
    try {
      console.log(`✨ Vectorizing Project: ${project.title}...`);
      const context = `${project.title}: ${project.description}. Required: ${project.requiredSkills?.join(", ")}`;
      const embedding = await suzely.generateEmbedding(context);
      
      await db.update(projects)
        .set({ embedding })
        .where(sql`id = ${project.id}`);
      totalProcessed++;
    } catch (e) {
      console.error(`❌ Failed to vectorize project ${project.id}:`, (e as any).message);
      totalErrors++;
    }
  }

  if (totalErrors > 0) {
    console.log(`\n⚠️ Leveling finished with ${totalErrors} errors. Only ${totalProcessed} nodes synchronized.`);
  } else if (totalProcessed > 0) {
    console.log(`\n✅ [Suzely] Success! ${totalProcessed} nodes synchronized. The Brain is alive. 🦄`);
  } else {
    console.log("\n💤 [Suzely] Nothing to modernize today. The Brain is already up to date.");
  }
  
  process.exit(0);
}

main().catch(err => {
  console.error("❌ Fatal Leveling Error:", err);
  process.exit(1);
});
