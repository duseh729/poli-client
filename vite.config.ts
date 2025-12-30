import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // 빌드 후 자동으로 분석 페이지 열림
      filename: "stats.html",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
