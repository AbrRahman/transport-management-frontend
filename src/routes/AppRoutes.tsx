import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Vehicle from "../pages/Vehicle/Vehicle";
import PickupPoint from "../pages/PickupPoint/PickupPoint";
import RoutePage from "../pages/RoutePage/RoutePage";

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
      {
        path: "/routes",
        element: <RoutePage />,
      },
    ],
  },
]);

export default router;
