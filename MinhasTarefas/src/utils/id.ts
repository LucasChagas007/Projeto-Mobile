// src/utils/id.ts
export function createId(prefix = "task"): string {
  const time = Date.now().toString(16);
  const rand = Math.random().toString(16).slice(2);
  return `${prefix}_${time}_${rand}`;
}
