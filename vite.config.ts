import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const outDir = process.env.BUILD_OUT_DIR || "dist";

export default defineConfig({
  plugins: [vue({ customElement: true })],
  define: {
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir,
    emptyOutDir: true,
    lib: {
      entry: "src/lovelace-3d.ts",
      formats: ["es"],
      fileName: () => "lovelace-3d.js",
    },
    rollupOptions: {
      // ensures a single-file-ish output name, and avoids extra chunks in many cases
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
