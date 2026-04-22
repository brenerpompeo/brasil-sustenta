import { getDb } from "../db";
import { users, talentProfiles, projects, companyProfiles } from "../../drizzle/schema";
import { sql } from "drizzle-orm";

/**
 * Seed Impacto — Brasil Sustenta (V3.0)
 * Cria dados de alta qualidade para ativar o motor da Suzely.
 */

async function main() {
  console.log("🌱 [Seed] Iniciando semeadura de impacto...");
  const db = await getDb();
  if (!db) process.exit(1);

  // 1. Criar Usuário Admin e Empresa
  console.log("👥 Criando usuários e empresas...");
  let adminUserId: number;
  const adminResult = await db.insert(users).values({
    openId: "admin_sovereign_001",
    name: "Brener Pompeo",
    email: "brener@brasilsustenta.com",
    role: "admin",
    userType: "empresa",
    status: "active"
  }).onConflictDoNothing().returning();

  if (adminResult.length > 0) {
    adminUserId = adminResult[0].id;
  } else {
    const existing = await db.select().from(users).where(sql`open_id = 'admin_sovereign_001'`).limit(1);
    adminUserId = existing[0].id;
  }

  let companyId: number;
  const companyResult = await db.insert(companyProfiles).values({
    userId: adminUserId,
    companyName: "Brasil Sustenta Impact Labs",
    industry: "Tecnologia e Sustentabilidade",
  }).onConflictDoNothing().returning();

  if (companyResult.length > 0) {
    companyId = companyResult[0].id;
  } else {
    const existing = await db.select().from(companyProfiles).where(sql`user_id = ${adminUserId}`).limit(1);
    companyId = existing[0].id;
  }

  // 2. Criar Talentos de Elite
  console.log("✨ Criando talentos de elite...");
  
  const talents = [
    {
      name: "Alice Sustentável",
      bio: "Desenvolvedora Fullstack apaixonada por ESG. Especialista em criar dashboards de impacto para ODS 7 e 13. Experiência com React e Blockchain para rastreabilidade de carbono.",
      skills: ["React", "Typescript", "Solidity", "ESG", "ODS 13"]
    },
    {
      name: "Bruno Design-Impact",
      bio: "Designer UI/UX com foco em acessibilidade e economia circular. Acredito que o design brutalista tropical pode conectar comunidades e tecnologia.",
      skills: ["UI/UX", "Design Thinking", "Figma", "Brutalismo", "Economia Circular"]
    },
    {
      name: "Carla Dados-Gaia",
      bio: "Cientista de dados focada em análise de biodiversidade e créditos de impacto social. Mestre em Políticas Públicas pela Unicamp.",
      skills: ["Python", "Machine Learning", "Análise de Dados", "Libras", "Impact Score"]
    }
  ];

  for (const t of talents) {
    const openId = `talent_${t.name.toLowerCase().replace(" ", "_")}`;
    let userId: number;
    const userResult = await db.insert(users).values({
      openId,
      name: t.name,
      userType: "jovem",
      status: "active"
    }).onConflictDoNothing().returning();

    if (userResult.length > 0) {
      userId = userResult[0].id;
    } else {
      const existing = await db.select().from(users).where(sql`open_id = ${openId}`).limit(1);
      userId = existing[0].id;
    }

    await db.insert(talentProfiles).values({
      userId,
      fullName: t.name,
      bio: t.bio,
      skills: t.skills,
      isAvailable: true
    }).onConflictDoNothing();
  }

  // 3. Criar Projetos Estratégicos
  console.log("🚀 Criando projetos de impacto...");
  
  await db.insert(projects).values([
    {
      companyId: companyId,
      title: "Plataforma de Crédito de Carbono Local",
      description: "Desenvolver uma interface para que pequenos agricultores de Campinas possam registrar créditos de preservação. Foco em ODS 15.",
      category: "esg",
      duration: 90,
      teamSize: 3,
      requiredSkills: ["React", "Python", "ESG"],
      status: "open"
    },
    {
      companyId: companyId,
      title: "Redesign SuperMenu Brasil Sustenta",
      description: "Criar uma experiência de navegação brutalista tropical que conecte investidores e talentos de forma imersiva e inovadora.",
      category: "ui_ux",
      duration: 30,
      teamSize: 2,
      requiredSkills: ["Figma", "Brutalismo", "Design Thinking"],
      status: "open"
    }
  ]);

  console.log("✅ [Seed] Banco populado com sucesso! Agora a Suzely tem trabalho. 🦄");
  process.exit(0);
}

main().catch(err => {
  console.error("❌ Erro no Seed:", err);
  process.exit(1);
});
