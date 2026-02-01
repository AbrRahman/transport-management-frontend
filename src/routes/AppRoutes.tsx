import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Vehicle from "../pages/Vehicle/Vehicle";
import PickupPoint from "../pages/PickupPoint/PickupPoint";
import RoutePage from "../pages/RoutePage/RoutePage";
import FeeMaster from "../pages/FeeMaster/FeeMaster";
import RoutePickupPoint from "../pages/RoutePickupPoint/RoutePickupPoint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/fee-master",
        element: <FeeMaster />,
      },
      {
        path: "/pickup-point",
        element: <PickupPoint />,
      },
      {
        path: "/vehicles",
        element: <Vehicle />,
      },

      {
        path: "/routes",
        element: <RoutePage />,
      },
      {
        path: "/route-pickup-point",
        element: <RoutePickupPoint />,
      },
      {
        path: "/assign-vehicle",
        element: <RoutePage />,
      },
      {
        path: "/student-transport",
        element: <RoutePage />,
      },
    ],
  },
]);

export default router;
