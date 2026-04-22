import { createClient } from "@supabase/supabase-js";
import { COOKIE_NAME } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import type { Request } from "express";
import * as db from "../db";
import { ENV } from "./env";

// Cliente admin Supabase (service role) — nunca expor ao cliente
const supabaseAdmin = createClient(
  ENV.supabaseUrl,
  ENV.supabaseServiceRoleKey,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export type SessionPayload = {
  openId: string;
  appId: string;
  name: string;
};

class SDKServer {
  /**
   * Autentica a requisição usando Supabase Auth.
   * Mantém a interface pública idêntica ao Manus SDK anterior.
   */
  async authenticateRequest(req: Request) {
    let token: string | undefined;

    // 1. Tentar cookie de sessão
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader
          .split(";")
          .map(c => c.trim().split("="))
          .map(([k, ...v]) => [decodeURIComponent(k), decodeURIComponent(v.join("="))])
      );
      token = cookies[COOKIE_NAME];
    }

    // 2. Tentar Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.slice(7);
      }
    }

    if (!token) {
      throw ForbiddenError("Token de autenticação ausente");
    }

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      throw ForbiddenError("Token inválido ou expirado");
    }

    const signedInAt = new Date();

    // Upsert no banco local usando Supabase user.id como openId
    await db.upsertUser({
      openId: user.id,
      name: user.user_metadata?.name || user.email?.split("@")[0] || null,
      email: user.email ?? null,
      loginMethod: user.app_metadata?.provider ?? "email",
      lastSignedIn: signedInAt,
    });

    const dbUser = await db.getUserByOpenId(user.id);

    if (!dbUser) {
      throw ForbiddenError("Usuário não encontrado no banco de dados");
    }

    return dbUser;
  }

  /**
   * Mantido para compatibilidade — Supabase gerencia tokens.
   * Retorna o openId como fallback, não utilizado ativamente.
   */
  async createSessionToken(
    openId: string,
    _options: { expiresInMs?: number; name?: string } = {}
  ): Promise<string> {
    return openId;
  }

  /**
   * Verifica se o valor do cookie corresponde a uma sessão Supabase válida.
   */
  async verifySession(
    cookieValue: string | undefined | null
  ): Promise<{ openId: string; appId: string; name: string } | null> {
    if (!cookieValue) return null;

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(cookieValue);

    if (error || !user) return null;

    return {
      openId: user.id,
      appId: "",
      name: user.user_metadata?.name || user.email?.split("@")[0] || "",
    };
  }
}

export const sdk = new SDKServer();
export { supabaseAdmin };
