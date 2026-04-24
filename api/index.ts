/**
 * Vercel Serverless Function entrypoint.
 *
 * Exporta o app Express como `default` — sem app.listen().
 * A Vercel invoca este handler para qualquer request que caia
 * no rewrite "/api/(.*)" configurado em vercel.json.
 *
 * O frontend estático (dist/public) é servido diretamente pela
 * CDN da Vercel; este arquivo NÃO deve chamar express.static().
 */

import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// OAuth callbacks: /api/auth/callback, /api/auth/logout, /api/oauth/callback
registerOAuthRoutes(app);

// tRPC: /api/trpc/*
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
