import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// npm i -D terser vite-tsconfig-paths

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    minify: "terser",
    target: "ESNext",
    commonjsOptions: {
      ignoreDynamicRequires: true,
    },
    manifest: true,
  },
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
