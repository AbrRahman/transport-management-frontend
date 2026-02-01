import { z } from "zod";

export const createRouteSchema = z.object({
  name: z.string().trim().min(1, "Route name  is required"),
  startPoint: z.string().trim().min(1, "Route start point is required"),
  endPoint: z.string().trim().min(1, "Route end point is required"),
});

export type TRouteInputs = z.infer<typeof createRouteSchema>;
