/// path: __tests__/tasks.store.test.ts
import { useTasksStore } from "../src/state/tasks.store";

describe("useTasksStore (regras Zustand)", () => {
  beforeEach(() => {
    // reset de estado entre testes (evita vazamento)
    useTasksStore.setState({
      tasks: [],
      isLoading: false,
      error: null,
    });
  });

  test("addTask cria tarefa com id, done=false e createdAtISO", () => {
    const { addTask } = useTasksStore.getState();

    addTask({ title: "Comprar leite", notes: "Mercado" });

    const state = useTasksStore.getState();
    expect(state.tasks).toHaveLength(1);

    const created = state.tasks[0];
    expect(created.id).toBeTruthy();
    expect(created.title).toBe("Comprar leite");
    expect(created.notes).toBe("Mercado");
    expect(created.done).toBe(false);
    expect(typeof created.createdAtISO).toBe("string");
  });

  test("toggleDone alterna status da tarefa", () => {
    const { addTask, toggleDone } = useTasksStore.getState();

    addTask({ title: "Treinar", notes: "Academia" });
    const id = useTasksStore.getState().tasks[0].id;

    toggleDone(id);
    expect(useTasksStore.getState().tasks[0].done).toBe(true);

    toggleDone(id);
    expect(useTasksStore.getState().tasks[0].done).toBe(false);
  });

  test("updateTask altera title/notes e define updatedAtISO", () => {
    const { addTask, updateTask } = useTasksStore.getState();

    addTask({ title: "Ler", notes: "Capítulo 1" });
    const id = useTasksStore.getState().tasks[0].id;

    updateTask(id, { title: "Ler e resumir", notes: "Capítulos 1 e 2" });

    const updated = useTasksStore.getState().tasks.find((t) => t.id === id);
    expect(updated).toBeDefined();
    expect(updated?.title).toBe("Ler e resumir");
    expect(updated?.notes).toBe("Capítulos 1 e 2");
    expect(typeof updated?.updatedAtISO).toBe("string");
  });

  test("removeTask remove item do array", () => {
    const { addTask, removeTask } = useTasksStore.getState();

    addTask({ title: "T1", notes: "N1" });
    addTask({ title: "T2", notes: "N2" });

    const firstId = useTasksStore.getState().tasks[0].id;
    removeTask(firstId);

    const state = useTasksStore.getState();
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks.some((t) => t.id === firstId)).toBe(false);
  });

  test("clearError limpa erro", () => {
    const { clearError } = useTasksStore.getState();

    useTasksStore.setState({ error: "erro de teste" });
    expect(useTasksStore.getState().error).toBe("erro de teste");

    clearError();
    expect(useTasksStore.getState().error).toBeNull();
  });
});
