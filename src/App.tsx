import { useEffect } from "react";
import "./App.css";
import { Router } from "./Router";

function App() {
  useEffect(() => {
    const consoleLog = () => {
      return console.log("123");
    };
    window.addEventListener("popstate", consoleLog);
    return () => window.removeEventListener("popstate", consoleLog);
  }, []);
  return (
    <>
      <Router />
    </>
  );
}

export default App;
