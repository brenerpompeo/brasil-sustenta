import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { createClient } from "@supabase/supabase-js";
import type { Express, Request, Response } from "express";
import { getSessionCookieOptions } from "./cookies";
import { ENV } from "./env";

// Cliente público Supabase (anon key) para troca de código OAuth
const supabase = createClient(ENV.supabaseUrl, ENV.supabaseAnonKey);

export function registerOAuthRoutes(app: Express) {
  // Callback principal para OAuth social do Supabase (Google, GitHub, etc.)
  app.get("/api/auth/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const next = (req.query.next as string) ?? "/";

    if (!code) {
      console.warn("[Auth] Callback sem code");
      return res.redirect(`/?error=missing_code`);
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session) {
      console.error("[Auth] Falha no callback OAuth:", error);
      return res.redirect(`/?error=auth_failed`);
    }

    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, data.session.access_token, {
      ...cookieOptions,
      maxAge: ONE_YEAR_MS,
    });

    console.log("[Auth] Sessão estabelecida para usuário:", data.session.user.id);
    return res.redirect(next);
  });

  // Logout — limpa cookie de sessão
  app.post("/api/auth/logout", (_req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME);
    res.json({ success: true });
  });

  // Alias legado mantido para compatibilidade durante transição
  app.get("/api/oauth/callback", (req: Request, res: Response) => {
    const params = new URLSearchParams(req.query as Record<string, string>);
    return res.redirect(`/api/auth/callback?${params.toString()}`);
  });
}
