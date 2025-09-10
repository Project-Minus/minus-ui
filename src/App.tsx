import { Snackbar } from "../packages/core/src/components/snackbar/Snackbar";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={"/vite.svg"} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={"/vite.svg"} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-green-500">Vite + React</h1>
      <div className="card">
        <button
          onClick={async () => {
            Snackbar.show({
              message: "hi",
              autoClose: true,
              className: "bg-white",
            });
          }}
        >
          count is
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
