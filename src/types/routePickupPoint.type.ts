import type { TPickupPoint } from "./pickupPoint.type";
import type { TRoute } from "./routes.type";

export type TRoutePickupPoint = {
  id: string;
  route: TRoute;
  pickupPoint: TPickupPoint;
  stopOrder: number;
  createdAt: string;
  updatedAt: string;
};
