import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1).max(100),
  completed: z.boolean().optional(),
});
