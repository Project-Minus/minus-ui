import { Snackbar } from "../../packages/core/src/components/snackbar/Snackbar";

export default function Test1() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] text-red-500">
      Test1 페이지 입니다
      <button
        onClick={async () => {
          Snackbar.show({
            message: "hi! This is Minus-Snackbar! hi! This is Minus-Snackbar!",
            autoClose: false,
            type: "error",
            snackbarPosition: "right-bottom",
          });
        }}
      >
        count is
      </button>
    </div>
  );
}
