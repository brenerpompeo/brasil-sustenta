import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { authRouter } from "./routers/auth";
import { profileRouter } from "./routers/profile";
import { uploadRouter } from "./routers/upload";
import { contactRouter } from "./routers/contact";
import { studentRouter } from "./routers/student";
import { companyRouter } from "./routers/company";
import { talentRouter } from "./routers/talent";
import { universityRouter } from "./routers/university";
import { blogRouter } from "./routers/blog";
import { projectRouter } from "./routers/project";
import { dashboardRouter } from "./routers/dashboard";
import { aiRouter } from "./routers/ai";
import { articleRouter } from "./routers/article";
import { reportRouter } from "./routers/report";
import { materialRouter } from "./routers/material";
import { eventRouter } from "./routers/event";
import { userRouter } from "./routers/user";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    ...authRouter._def.procedures,
  }),

  profile: profileRouter,
  upload: uploadRouter,
  contact: contactRouter,
  student: studentRouter,
  company: companyRouter,
  talent: talentRouter,
  university: universityRouter,
  blog: blogRouter,
  project: projectRouter,
  dashboard: dashboardRouter,
  ai: aiRouter,
  event: eventRouter,
  article: articleRouter,
  report: reportRouter,
  material: materialRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
