/// path: docs/projeto-mobile/checkpoints/semana-03.md
# Checkpoint — Semana 03 (S3)

## Objetivo da semana
Blindar a qualidade com testes automatizados mínimos do contrato (Zod) e da regra de negócio (Zustand).

## O que foi feito

### P08 — Setup de testes (Jest + Expo)
- Dependências configuradas:
  - `jest-expo`
  - `jest`
  - `@types/jest`
- `package.json` atualizado com:
  - script: `"test": "jest"`
  - preset Jest: `"jest-expo"`
- Criado teste de fumaça:
  - `__tests__/smoke.test.ts`

### P09 — Testes mínimos do MVP
- Criado `__tests__/task.schema.test.ts` com cobertura de:
  - payload válido
  - título curto inválido
  - `trim()` no título
  - notes acima de 200 inválido
  - notes opcional
- Criado `__tests__/tasks.store.test.ts` com cobertura de:
  - `addTask`
  - `toggleDone`
  - `updateTask`
  - `removeTask`
  - `clearError`
- Reset de estado no `beforeEach` para evitar vazamento entre testes.

## Validações executadas (gates)
- [x] `npm test`
- [x] `npx tsc --noEmit`
- [x] `npx expo start` (smoke após ajustes)

## Evidências da semana (salvas em `docs/projeto-mobile/evidencias/semana-03/`)
- [x] Print/log do terminal com testes passando
- [x] Print/log de typecheck passando
- [x] Registro de ajuste/correção relevante (se aplicável)

## Arquivos principais alterados na semana
- `package.json`
- `__tests__/smoke.test.ts`
- `__tests__/task.schema.test.ts`
- `__tests__/tasks.store.test.ts`

## Tag/Release da semana
- **Tag sugerida:** `v0.3-s3`
