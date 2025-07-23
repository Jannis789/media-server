import { defineConfig } from "vite";
import path from "path";
export default defineConfig({
  root: "src",
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/view/pages"),
      "@components": path.resolve(__dirname, "src/view/components"),
    },
  },
  build: {
    outDir: "../../dist",
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
        