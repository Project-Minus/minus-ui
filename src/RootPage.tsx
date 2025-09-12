import { useNavigate } from "react-router-dom";
import { Snackbar } from "../packages/core/src/components/snackbar/Snackbar";
import { ImageViewer } from "../packages/core/src/components/imageViewer/ImageViewer";
import { BiX } from "react-icons/bi";
import { Tooltip } from "./../packages/core/src/components/tooltip/Tooltip";
export default function RootPage() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <img src={"/vite.svg"} className="logo" alt="Vite logo" />
        <img
          src={"/vite.svg"}
          className="logo react"
          alt="React logo"
          onClick={() => {
            ImageViewer.open({
              url: "/vite.svg",
              icons: {
                flipUp: <BiX size={30} />,
                flipDown: <BiX />,
                rotateLeft: <BiX />,
                rotateRight: <BiX />,
                zoomIn: <BiX />,
                zoomOut: <BiX />,
              },
            });
          }}
        />
      </div>
      <Tooltip
        containerClassName="inline-block"
        contentClassName="text-red-500 font-bold"
        contents={"It's tooltip!"}
        position="right-top"
        backgroundColor="white"
      >
        <div className="w-[120px] truncate text-green-500 border-1">
          hover me
        </div>
      </Tooltip>
      {/* <Tooltip
        containerClassName="inline-block"
        contents={"3245623"}
        position="left-bottom"
        backgroundColor=""
      >
        <h1 className="inline-block text-green-500">
          Vite + Reactite + Reactite + React ite + React ite + Reactite + React
        </h1>
      </Tooltip> */}
      <h1 className="text-green-500">Vite + React</h1>
      <div className="card">
        <button
          onClick={async () => {
            Snackbar.show({
              message:
                "hi! This is Minus-Snackbar! hi! This is Minus-Snackbar!",
              type: "info",
              autoClose: true,
              snackbarPosition: "left-bottom",
              maxCount: 4,
            });
          }}
        >
          count is
        </button>
        <button
          onClick={() => {
            navigate("test1");
          }}
        >
          test1
        </button>
        <button
          onClick={() => {
            navigate("test2");
          }}
        >
          test2
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
