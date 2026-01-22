import { create } from "zustand";
import type { Tarefa, Prioridade } from "../domain/tarefa";

type TarefaInput = {
  titulo: string;
  descricao?: string;
  prioridade: Prioridade;
  dataLimite?: string;
};

type TarefaState = {
  tarefas: Tarefa[];
  criar: (data: TarefaInput) => Tarefa;
  atualizar: (id: string, data: Partial<TarefaInput>) => void;
  alternarConcluida: (id: string) => void;
  remover: (id: string) => void;
  buscarPorId: (id: string) => Tarefa | undefined;
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const seed: Tarefa[] = [
  {
    id: "demo",
    titulo: "Primeira tarefa (demo)",
    descricao: "Essa tarefa existe só para testar navegação + store.",
    prioridade: "media",
    dataLimite: "2026-01-30",
    concluida: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export const useTarefaStore = create<TarefaState>((set, get) => ({
  tarefas: seed,

  criar: (data) => {
    const now = Date.now();
    const tarefa: Tarefa = {
      id: makeId(),
      titulo: data.titulo,
      descricao: data.descricao,
      prioridade: data.prioridade,
      dataLimite: data.dataLimite,
      concluida: false,
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({ tarefas: [tarefa, ...state.tarefas] }));
    return tarefa;
  },

  atualizar: (id, data) => {
    set((state) => ({
      tarefas: state.tarefas.map((t) =>
        t.id === id ? { ...t, ...data, updatedAt: Date.now() } : t
      ),
    }));
  },

  alternarConcluida: (id) => {
    set((state) => ({
      tarefas: state.tarefas.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida, updatedAt: Date.now() } : t
      ),
    }));
  },

  remover: (id) => {
    set((state) => ({ tarefas: state.tarefas.filter((t) => t.id !== id) }));
  },

  buscarPorId: (id) => get().tarefas.find((t) => t.id === id),
}));
