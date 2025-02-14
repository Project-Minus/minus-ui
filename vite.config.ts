import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      //초기 방문해야하는 파일  설정
      entry: path.resolve(__dirname, "src/lib/index.tsx"),
      name: "index",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
    commonjsOptions: {
      esmExternals: ["react"],
    },
    //자동으로 build output을 지움 => 이 옵션을 false로 해야지 js 파일이 생겨서
    //컴포넌트 배포가 가능
    emptyOutDir: false,
  },
  define: {
    //path package가 import.meta가 아닌 process로 접근하고 있어서 선언해서 막아줌
    "process.env": {},
  },
  plugins: [dts()],
});
