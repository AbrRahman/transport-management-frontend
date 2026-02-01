import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Vehicle from "../pages/Vehicle/Vehicle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/vehicles",
        element: <Vehicle />,
      },
    ],
  },
]);

export default router;
