import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  test: {
    globals: true,
    css: true,
    include: ["server/**/*.test.ts", "client/src/**/*.test.tsx"],
    exclude: [".claude/**", "dist/**", "node_modules/**"],
    environment: "node",
    environmentMatchGlobs: [["client/src/**/*.{test,spec}.tsx", "jsdom"]],
    setupFiles: ["./client/src/test/setup.ts"],
  },
});
