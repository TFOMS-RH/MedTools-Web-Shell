import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],

  server: {
    proxy: {
      "/api/med-tools": {
        target: "http://localhost:5256",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/med-tools/, "/api"),
      },
      "/api/health-track": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/health-track/, "/api"),
      },
    },
  },
});
