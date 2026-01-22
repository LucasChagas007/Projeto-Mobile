/// path: src/state/tasks.store.ts
import { create } from "zustand";
import type { Task } from "../domain/task.types";
import type { TaskFormValues } from "../domain/task.schema";
import { createId } from "../utils/id";
import { nowISO } from "../utils/time";

type TasksState = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
};

type TasksActions = {
  seedSample: () => void;
  addTask: (values: TaskFormValues) => void;
  updateTask: (id: string, values: TaskFormValues) => void;
  toggleDone: (id: string) => void;
  removeTask: (id: string) => void;
  clearError: () => void;
};

export const useTasksStore = create<TasksState & TasksActions>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  seedSample: () => {
    const t = nowISO();

    const sample: Task[] = [
      {
        id: createId(),
        title: "Estudar Expo Router (P04)",
        notes: "Somente exemplo para testar o store.",
        done: false,
        createdAtISO: t,
      },
      {
        id: createId(),
        title: "Implementar store Zustand",
        notes: "Precisa ter CRUD + error + isLoading.",
        done: false,
        createdAtISO: t,
      },
      {
        id: createId(),
        title: "Testar toggleDone e remove",
        notes: "Verificar se a UI reage sem crash.",
        done: true,
        createdAtISO: t,
      },
      {
        id: createId(),
        title: "Rodar gates do curso",
        notes: "npx expo start e npx tsc --noEmit",
        done: false,
        createdAtISO: t,
      },
    ];

    set(() => ({
      tasks: sample,
      error: null,
      isLoading: false,
    }));
  },

  addTask: (values) => {
    const newTask: Task = {
      id: createId(),
      title: values.title,
      notes: values.notes,
      done: false,
      createdAtISO: nowISO(),
    };

    set((state) => ({
      tasks: [newTask, ...state.tasks],
      error: null,
    }));
  },

  updateTask: (id, values) => {
    const state = get();
    const exists = state.tasks.some((t) => t.id === id);

    if (!exists) {
      set(() => ({ error: `updateTask: task id não encontrado (${id})` }));
      return;
    }

    set((state2) => ({
      tasks: state2.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              title: values.title,
              notes: values.notes,
              updatedAtISO: nowISO(),
            }
          : t
      ),
      error: null,
    }));
  },

  toggleDone: (id) => {
    const state = get();
    const exists = state.tasks.some((t) => t.id === id);

    if (!exists) {
      set(() => ({ error: `toggleDone: task id não encontrado (${id})` }));
      return;
    }

    set((state2) => ({
      tasks: state2.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
              updatedAtISO: nowISO(),
            }
          : t
      ),
      error: null,
    }));
  },

  removeTask: (id) => {
    const state = get();
    const exists = state.tasks.some((t) => t.id === id);

    if (!exists) {
      set(() => ({ error: `removeTask: task id não encontrado (${id})` }));
      return;
    }

    set((state2) => ({
      tasks: state2.tasks.filter((t) => t.id !== id),
      error: null,
    }));
  },

  clearError: () => {
    set(() => ({ error: null }));
  },
}));
