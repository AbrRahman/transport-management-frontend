import { z } from "zod";

export const createAssignVehicleSchema = z.object({
  routeId: z.string().trim().min(1, "Route is required"),
  vehicleId: z.string().trim().min(1, "Vehicle is required"),
});

export type TAssignInputs = z.infer<typeof createAssignVehicleSchema>;
