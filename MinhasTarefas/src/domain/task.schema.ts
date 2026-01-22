// src/domain/task.schema.ts
import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Título é obrigatório (mínimo 3 caracteres)")
    .max(60, "Título deve ter no máximo 60 caracteres"),

  notes: z
    .string()
    .max(200, "Notas devem ter no máximo 200 caracteres")
    .optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
