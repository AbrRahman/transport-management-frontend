import type { TRoutePickupPoint } from "./routePickupPoint.type";

export type TRoute = {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  createdAt: string;
  updatedAt: string;
};

// main Route type
export type TRouteWithPickupPoints = {
  id: string;
  name: string;
  endPoint: string;
  routePickupPoint: TRoutePickupPoint[];
};
