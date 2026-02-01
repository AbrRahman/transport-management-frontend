import type { TPickupPoint } from "./pickupPoint.type";
import type { TVehicle } from "./vehicle.types";

type TRoute = {
  name: string;
  endPoint: string;
  routeVehicle: {
    vehicle: Partial<TVehicle>;
  };
};
export type TStudentAssign = {
  id: string;
  isActive: boolean;
  student: {
    name: string;
  };
  route: TRoute;
  pickupPoint: Partial<TPickupPoint>;
  createdAt: string;
  updatedAt: string;
};

export type TTransportFee = {
  id: string;
  amount: number;
  route: {
    name: string;
  };
  status: string;
  student: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};
