import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MiLibraryComponent",
      formats: ["es", "cjs"], // CommonJS(cjs)와 ES 모듈(es) 모두 생성
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
    //자동으로 build output을 지움 => 이 pnp옵션을 false로 해야지 js 파일이 생겨서
    //컴포넌트 배포가 가능
    emptyOutDir: false,
  },
  define: {
    //path package가 import.meta가 아닌 process로 접근하고 있어서 선언해서 막아줌
    "process.env": {},
  },
  plugins: [dts({ outDir: "dist", insertTypesEntry: true })],
});
