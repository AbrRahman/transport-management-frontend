import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
      },
    ],
  },
]);

export default router;
