# Checkpoint Semana 01 (S1)

## Objetivo da semana
Garantir que o projeto roda corretamente e que a base do app está preparada para evoluir com segurança:
- navegação funcionando (sem crash)
- rotas organizadas no padrão Expo Router
- domínio e contrato de dados definidos (TypeScript + Zod)
- store centralizado (Zustand) com CRUD e estados de UI
- documentação e estrutura do repositório no padrão do professor

---

## O que foi feito (resumo)
Durante a Semana 1, foram concluídos os passos P00 a P04 do roteiro do professor:

### P00 — Setup inicial do projeto
- Projeto criado com Expo (Managed) + React Native + TypeScript
- App rodando localmente com `npx expo start`

### P01 — Navegação mínima (placeholders)
- Implementadas 3 rotas principais no padrão do curso:
  - Lista: `/` (app/index.tsx)
  - Formulário: `/tarefa/form` (app/tarefa/form.tsx)
  - Detalhe: `/tarefa/[id]` (app/tarefa/[id].tsx)
- Navegação testada com:
  - Lista → Form → Voltar
  - Lista → Detalhe (id demo) → Editar → Form → Voltar
- Tratamento seguro de parâmetros com `useLocalSearchParams()` e normalização de `string | string[] | undefined`

### P02 — Organização de src/ e dependências
- Instalação e organização do projeto para evoluir com padrão:
  - Criação de estrutura dentro de `src/`

### P03 — Contrato do domínio Task + Schema Zod
- Criados os arquivos exigidos pelo padrão do professor:
  - `src/utils/id.ts` (createId)
  - `src/utils/time.ts` (nowISO)
  - `src/domain/task.types.ts` (Task / TaskId)
  - `src/domain/task.schema.ts` (taskFormSchema + TaskFormValues)
- Definido o contrato do dado da aplicação:
  - Task completa com id, done e timestamps ISO
  - TaskFormValues como valores de entrada do formulário (title, notes)
- Validação em runtime planejada com Zod (schema pronto)

### P04 — Store Zustand (CRUD + estados de UI)
- Criado o store centralizado em:
  - `src/state/tasks.store.ts`
- Estado mínimo implementado:
  - `tasks: Task[]`
  - `isLoading: boolean`
  - `error: string | null`
- Actions implementadas:
  - `seedSample()`
  - `addTask(values)`
  - `updateTask(id, values)`
  - `toggleDone(id)`
  - `removeTask(id)`
  - `clearError()`
- Integração mínima feita na Lista (`app/index.tsx`) como painel de teste:
  - Botão “Carregar exemplos”
  - Contador de tarefas
  - Botões por item: “Concluir/Desfazer”, “Remover”, “Abrir”
  - Exibição de erro e botão “Limpar erro”

---

## Como rodar o projeto
Comandos usados para executar:

```bash
npm install
npx expo start
