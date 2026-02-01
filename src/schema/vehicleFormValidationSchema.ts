import { z } from "zod";

export const createVehicleSchema = z.object({
  vehicleNo: z.string().trim().min(1, "Vehicle number is required"),
  driverName: z.string().trim().min(1, "Driver name is required"),
  helperName: z.string().trim().min(1, "Helper name is required"),
  contactNo: z.string().trim().min(1, "Contact number is required"),
});

export type TVehicleInputs = z.infer<typeof createVehicleSchema>;
