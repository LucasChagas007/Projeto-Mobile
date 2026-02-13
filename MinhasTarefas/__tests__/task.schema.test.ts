/// path: __tests__/task.schema.test.ts
import { taskFormSchema } from "../src/domain/task.schema";

describe("taskFormSchema (contrato Zod)", () => {
  test("aceita payload válido", () => {
    const input = { title: "Comprar leite", notes: "No mercado" };

    const result = taskFormSchema.safeParse(input);

    expect(result.success).toBe(true);
  });

  test("rejeita título curto (min 3)", () => {
    const input = { title: "oi", notes: "abc" };

    const result = taskFormSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  test("rejeita título que fica curto após trim", () => {
    const input = { title: "  ab  ", notes: "abc" };

    const result = taskFormSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  test("aplica trim no título em caso válido", () => {
    const input = { title: "   Comprar pão   ", notes: "Padaria" };

    const result = taskFormSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("Comprar pão");
    }
  });

  test("rejeita notes acima de 200 caracteres", () => {
    const input = { title: "Tarefa válida", notes: "a".repeat(201) };

    const result = taskFormSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  test("aceita sem notes (opcional)", () => {
    const input = { title: "Estudar mobile" };

    const result = taskFormSchema.safeParse(input);

    expect(result.success).toBe(true);
  });
});
