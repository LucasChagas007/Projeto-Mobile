/// path: docs/projeto-mobile/checkpoints/semana-02.md
# Checkpoint — Semana 02 (S2)

## Objetivo da semana
Fechar o MVP funcional: Lista real, Detalhe real e Form real com validação e integração completa com store.

## O que foi feito

### P05 — Tela Lista (MVP real)
- `app/index.tsx` implementada com:
  - `FlatList` + `keyExtractor` por `id`
  - leitura de `tasks` direto do store (sem estado duplicado)
  - empty state com CTA para criar tarefa
  - botão “Nova tarefa” para `/tarefa/form`
  - ações rápidas:
    - concluir/desfazer
    - remover com confirmação (`Alert`)
- Componente de item:
  - `src/components/TaskListItem.tsx`

### P06 — Tela Detalhe (MVP real)
- `app/tarefa/[id].tsx` implementada com:
  - leitura segura do `id` da rota dinâmica
  - busca da tarefa no store
  - UI defensiva para:
    - `id` inválido
    - tarefa não encontrada
  - ações:
    - concluir/desfazer
    - editar (`/tarefa/form?id=...`)
    - remover com confirmação e navegação segura

### P07 — Tela Form (criar/editar de verdade)
- `app/tarefa/form.tsx` implementada com:
  - React Hook Form + `zodResolver`
  - modo criar (sem `id`)
  - modo editar (com `id`)
  - prefill no modo editar
  - validação por `taskFormSchema`
  - normalização de `notes`
  - UI defensiva para `id` inexistente no modo editar

## Validações executadas (gates)
- [x] `npx tsc --noEmit`
- [x] `npx expo start`
- [x] Fluxo manual completo:
  - criar → listar → detalhe → editar → concluir/desfazer → remover

## Evidências da semana (salvas em `docs/projeto-mobile/evidencias/semana-02/`)
- [x] Vídeo/prints do fluxo CRUD completo
- [x] Prints de validação do Form:
  - título inválido
  - notes acima do limite
- [x] Evidência de atualização da Lista após criar/editar/remover

## Arquivos principais alterados na semana
- `app/index.tsx`
- `app/tarefa/[id].tsx`
- `app/tarefa/form.tsx`
- `src/components/TaskListItem.tsx`
- `src/domain/task.schema.ts`

## Tag/Release da semana
- **Tag sugerida:** `v0.2-s2`
