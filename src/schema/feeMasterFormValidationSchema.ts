import { z } from "zod";

export const createFeeMasterSchema = z.object({
  monthlyFee: z.coerce.number().min(1, "Transfer fee is require"),
  routeId: z.string().trim().min(1, "Route is required"),
});

export type TFeeMasterInputs = z.infer<typeof createFeeMasterSchema>;
