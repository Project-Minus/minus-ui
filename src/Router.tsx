import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test1 from "./pages/Test1";
import Test2 from "./pages/Test2";
import RootPage from "./RootPage";

const homeRouter = {
  path: "/",
  element: <RootPage />,
};

const routers = createBrowserRouter([
  homeRouter,
  {
    path: "/test1",
    element: <Test1 />,
  },
  {
    path: "/test2",
    element: <Test2 />,
  },
]);

export const Router = () => {
  return <RouterProvider router={routers} />;
};
