import { createRoot } from "react-dom/client";
import { Test, Test2 } from "./lib/index.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Test />
    <Test2 />
  </>,
);
