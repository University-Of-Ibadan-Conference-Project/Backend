import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Served at "/" in local dev; the Docker build sets ADMIN_BASE (e.g.
  // "/admin-manager/") so the app can live under a sub-path behind nginx.
  base: process.env.ADMIN_BASE || "/",
  plugins: [react(), tailwindcss()],
});
