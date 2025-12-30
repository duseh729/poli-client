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
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const module = id.split("node_modules/").pop()?.split("/")[0];

            // 1. React 핵심 라이브러리 분리 (가장 먼저 로드됨)
            if (
              ["react", "react-dom", "react-router-dom", "scheduler"].includes(
                module || ""
              )
            ) {
              return "react-vendor";
            }

            // 2. 덩치 큰 애니메이션 라이브러리 분리
            if (module === "framer-motion") {
              return "framer-motion-vendor";
            }

            // 3. 모니터링/로깅 라이브러리 분리
            if (module === "@sentry" || id.includes("@sentry")) {
              return "sentry-vendor";
            }

            // 4. 스타일 라이브러리 분리 (Emotion 등)
            if (module === "@emotion" || id.includes("@emotion")) {
              return "style-vendor";
            }

            // 5. 나머지는 일반 벤더로 묶음
            return "vendor";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
