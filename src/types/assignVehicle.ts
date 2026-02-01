import type { TRoute } from "./routes.type";
import type { TVehicle } from "./vehicle.types";

export type TAssignVehicle = {
  id: string;
  route: Partial<TRoute>;
  vehicle: Partial<TVehicle>;
  createdAt: string;
  updatedAt: string;
};
