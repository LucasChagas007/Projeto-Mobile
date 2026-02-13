/// path: docs/projeto-mobile/checkpoints/semana-01.md
# Checkpoint — Semana 01 (S1)

## Objetivo da semana
Estruturar a base do projeto, garantir execução no Expo, configurar navegação mínima e preparar domínio/store para evolução do MVP.

## O que foi feito

### P00 — Setup inicial
- Projeto criado com Expo + TypeScript.
- App executando em emulador/dispositivo (`npx expo start`).
- Estrutura inicial validada com pasta `app/`.

### P01 — Navegação mínima
- Rotas criadas:
  - `app/index.tsx` (Lista placeholder)
  - `app/tarefa/[id].tsx` (Detalhe placeholder com rota dinâmica)
  - `app/tarefa/form.tsx` (Form placeholder)
- Stack configurado em `app/_layout.tsx` com títulos das telas.
- Navegação validada:
  - Lista → Form → Voltar
  - Lista → Detalhe (com id) → Editar (abre Form com `?id=`)

### P02 — Organização de dependências e arquitetura
- Dependências instaladas:
  - `zustand`
  - `zod`
  - `react-hook-form`
  - `@hookform/resolvers`
- Estrutura `src/` criada:
  - `src/domain`
  - `src/state`
  - `src/utils`
  - `src/components`

### P03 — Domínio + validação
- Criados:
  - `src/utils/id.ts` (`createId()`)
  - `src/utils/time.ts` (`nowISO()`)
  - `src/domain/task.types.ts` (tipo `Task`)
  - `src/domain/task.schema.ts` (`taskFormSchema` + `TaskFormValues`)

### P04 — Store Zustand (base do CRUD)
- Criado `src/state/tasks.store.ts` com:
  - `tasks`, `isLoading`, `error`
  - `seedSample`, `addTask`, `updateTask`, `toggleDone`, `removeTask`, `clearError`
- Integração inicial da Lista como painel de teste (seed/toggle/remove).

## Validações executadas (gates)
- [x] `npx tsc --noEmit`
- [x] `npx expo start`

## Evidências da semana (salvas em `docs/projeto-mobile/evidencias/semana-01/`)
- [x] App abrindo no Expo
- [x] Navegação entre telas (Lista/Form/Detalhe)
- [x] Painel de teste do store (seed/toggle/remove)

## Arquivos principais alterados na semana
- `app/_layout.tsx`
- `app/index.tsx`
- `app/tarefa/[id].tsx`
- `app/tarefa/form.tsx`
- `src/domain/task.types.ts`
- `src/domain/task.schema.ts`
- `src/state/tasks.store.ts`
- `src/utils/id.ts`
- `src/utils/time.ts`

## Tag/Release da semana
- **Tag sugerida:** `v0.1-s1`