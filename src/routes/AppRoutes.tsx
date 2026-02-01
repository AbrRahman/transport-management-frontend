import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Vehicle from "../pages/Vehicle/Vehicle";
import PickupPoint from "../pages/PickupPoint/PickupPoint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/vehicles",
        element: <Vehicle />,
      },
      {
        path: "/pickup-point",
        element: <PickupPoint />,
      },
    ],
  },
]);

export default router;
