import { z } from "zod";

export const createRoutePickupPointSchema = z.object({
  routeId: z.string().trim().min(1, "Route is required"),
  pickupPointId: z.string().trim().min(1, "Pickup Point  is required"),
  stopOrder: z.coerce.number().min(1, "Stop Order is require"),
});

export type TRoutePickupPointInputs = z.infer<
  typeof createRoutePickupPointSchema
>;
