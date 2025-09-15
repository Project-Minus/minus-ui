import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import copy from "rollup-plugin-copy";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MiLibraryCore",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "react-dom/client"],
    },
    emptyOutDir: false,
  },
  plugins: [
    dts({
      outDir: "dist",
      insertTypesEntry: true,
      compilerOptions: {
        baseUrl: "",
      },
    }),
    copy({
      targets: [
        // tailwind의 plugin을 복사해서 생성
        {
          src: "./src/tailwind/*.css",
          dest: "dist",
        },
        {
          src: "./css.d.ts",
          dest: "dist",
        },
      ],
      hook: "writeBundle", // 번들링 후 실행
    }),
  ],
});
