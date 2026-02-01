import { z } from "zod";

export const createAssignStudentSchema = z.object({
  routeId: z.string().trim().min(1, "Route is required"),
  studentId: z.string().trim().min(1, "Student is required"),
  pickupPointId: z.string().trim().min(1, "Pickup is required"),
});

export type TAssignStudentInputs = z.infer<typeof createAssignStudentSchema>;
