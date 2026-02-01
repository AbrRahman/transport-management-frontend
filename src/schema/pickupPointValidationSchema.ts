import { z } from "zod";

export const createPickupPointSchema = z.object({
  name: z.string().trim().min(1, "Pickup point is required"),
  location: z.string().trim().min(1, "Pickup Point location is required"),
});

export type TPickupPointInputs = z.infer<typeof createPickupPointSchema>;
