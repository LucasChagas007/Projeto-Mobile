// src/domain/task.types.ts
export type TaskId = string;

export type Task = {
  id: TaskId;

  title: string;        // obrigatório
  notes?: string;       // opcional

  done: boolean;        // marcação de concluída
  createdAtISO: string; // timestamp ISO
  updatedAtISO?: string; // timestamp ISO quando editar
};
