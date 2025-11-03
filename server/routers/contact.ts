import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { contactRequests } from "../../drizzle/schema";

/**
 * Contact Router
 * Handles contact/quote requests from companies
 */
export const contactRouter = router({
  /**
   * Submit contact request
   * Public endpoint - no authentication required
   */
  submitRequest: publicProcedure
    .input(
      z.object({
        companyName: z.string().min(2, "Nome da empresa é obrigatório"),
        contactName: z.string().min(2, "Nome do contato é obrigatório"),
        email: z.string().email("Email inválido"),
        phone: z.string().optional(),
        cnpj: z.string().optional(),
        industry: z.string().optional(),
        companySize: z.enum(["pequena", "media", "grande"]).optional(),
        projectType: z.string().optional(),
        budget: z.string().optional(),
        timeline: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Insert contact request into database
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      const [result] = await db.insert(contactRequests).values({
        companyName: input.companyName,
        contactName: input.contactName,
        email: input.email,
        phone: input.phone,
        cnpj: input.cnpj,
        industry: input.industry,
        companySize: input.companySize,
        projectType: input.projectType,
        budget: input.budget,
        timeline: input.timeline,
        message: input.message,
        status: "pending",
      });

      return {
        success: true,
        message: "Solicitação enviada com sucesso! Entraremos em contato em breve.",
        id: result.insertId,
      };
    }),
});
