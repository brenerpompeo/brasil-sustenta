import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/scheduler") ||
            id.includes("node_modules/wouter")
          ) {
            return "react-core";
          }
          if (
            id.includes("node_modules/@tanstack") ||
            id.includes("node_modules/@trpc") ||
            id.includes("node_modules/superjson")
          ) {
            return "data-core";
          }
          if (
            id.includes("node_modules/@radix-ui") ||
            id.includes("node_modules/lucide-react") ||
            id.includes("node_modules/framer-motion") ||
            id.includes("node_modules/cmdk") ||
            id.includes("node_modules/vaul") ||
            id.includes("node_modules/sonner") ||
            id.includes("node_modules/react-day-picker") ||
            id.includes("node_modules/recharts") ||
            id.includes("node_modules/embla-carousel-react") ||
            id.includes("node_modules/react-resizable-panels") ||
            id.includes("node_modules/input-otp") ||
            id.includes("node_modules/date-fns")
          ) {
            return "ui-suite";
          }
          if (
            id.includes("node_modules/react-simple-maps") ||
            id.includes("node_modules/topojson-client") ||
            id.includes("node_modules/mapbox-gl")
          ) {
            return "geo-suite";
          }
        },
      },
    },
  },
  server: {
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
