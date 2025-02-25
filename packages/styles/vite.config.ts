import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import copy from "rollup-plugin-copy";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MiLibraryStyles",
      fileName: "index",
    },
    emptyOutDir: false,
  },
  plugins: [
    dts({ outDir: "dist", insertTypesEntry: true }),
    copy({
      targets: [
        // src 디렉토리의 모든 CSS 파일을 dist/css 디렉토리로 복사
        {
          src: "src/**/*.css",
          dest: "dist",
        },
      ],
      // 옵션: 기존 파일 덮어쓰기
      overwrite: true,
      // 옵션: 복사 진행 상황 출력
      verbose: true,
    }),
  ],
});
