import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { studentQuestions, universityInvitations } from "../../drizzle/schema";

/**
 * Student Router
 * Handles questions and university invitations from students
 */
export const studentRouter = router({
  /**
   * Submit question
   * Public endpoint - no authentication required
   */
  submitQuestion: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        university: z.string().optional(),
        course: z.string().optional(),
        question: z.string().min(10, "Pergunta deve ter pelo menos 10 caracteres"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      const [result] = await db.insert(studentQuestions).values({
        name: input.name,
        email: input.email,
        university: input.university,
        course: input.course,
        question: input.question,
        status: "pending",
      });

      return {
        success: true,
        message: "Dúvida enviada com sucesso! Responderemos em breve.",
        id: result.insertId,
      };
    }),

  /**
   * Invite university
   * Public endpoint - students can invite their universities to partner
   */
  inviteUniversity: publicProcedure
    .input(
      z.object({
        studentName: z.string().min(2, "Seu nome é obrigatório"),
        studentEmail: z.string().email("Email inválido"),
        universityName: z.string().min(2, "Nome da universidade é obrigatório"),
        state: z.string().length(2, "UF deve ter 2 caracteres").optional(),
        city: z.string().optional(),
        course: z.string().optional(),
        contactName: z.string().optional(),
        contactEmail: z.string().email("Email de contato inválido").optional().or(z.literal("")),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      const [result] = await db.insert(universityInvitations).values({
        studentName: input.studentName,
        studentEmail: input.studentEmail,
        universityName: input.universityName,
        state: input.state,
        city: input.city,
        course: input.course,
        contactName: input.contactName,
        contactEmail: input.contactEmail || undefined,
        message: input.message,
        status: "pending",
      });

      return {
        success: true,
        message: "Convite enviado! Entraremos em contato com a universidade.",
        id: result.insertId,
      };
    }),
});
