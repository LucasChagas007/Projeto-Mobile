export type Prioridade = "baixa" | "media" | "alta";

export type Tarefa = {
  id: string;
  titulo: string;
  descricao?: string;
  prioridade: Prioridade;
  dataLimite?: string; // YYYY-MM-DD (string mesmo por enquanto)
  concluida: boolean;
  createdAt: number;
  updatedAt: number;
};
