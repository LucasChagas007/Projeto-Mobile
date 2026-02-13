# Relatório Final — Projeto Mobile

**App:** Todo App (Gerenciador de Tarefas)
**Disciplina:** Desenvolvimento Mobile
**Semestre:** [2025.2]
**Aluno:** Lucas Chagas Santos
**Matricula:** 2020005910
**Professor(a):** Carlos Augusto
**Repositório:** [https://github.com/LucasChagas007/Projeto-Mobile]
**Release final:** [URL_RELEASE_V1_0_FINAL]

---

## 1. Resumo Executivo

Este projeto consiste no desenvolvimento de um aplicativo mobile de gerenciamento de tarefas pessoais, construído com **Expo + React Native + TypeScript**, seguindo o plano de checkpoints da disciplina (S1–S4) e o roteiro técnico (P00–P10).

O aplicativo implementa o MVP com fluxo completo de tarefas: **listar, criar, editar, concluir/desfazer e remover**, com validação de formulário baseada em **Zod**, gerenciamento de estado centralizado com **Zustand** e testes automatizados com **Jest**.

O foco da entrega foi garantir:
- funcionamento consistente do fluxo principal;
- validações reais e mensagens claras;
- arquitetura simples e organizada;
- evidências e documentação reprodutíveis para correção.

---

## 2. Objetivo do Projeto

Desenvolver um aplicativo mobile funcional e verificável que permita ao usuário gerenciar tarefas do dia a dia com operações de CRUD, aplicando boas práticas de arquitetura, validação de dados, testes e documentação.

---

## 3. Escopo (MVP) e Requisitos Atendidos

### 3.1 Entidade principal

**Task** com os campos:
- `id: string`
- `title: string`
- `notes?: string`
- `done: boolean`
- `createdAtISO: string`
- `updatedAtISO?: string`

### 3.2 Regras de validação (Zod)

- `title`: obrigatório, com `trim()`, mínimo 3 e máximo 60 caracteres.
- `notes`: opcional, com `trim()`, máximo 200 caracteres.

### 3.3 Fluxo principal implementado

- Lista de tarefas (`/`)
- Formulário de tarefa (`/tarefa/form`) nos modos **criar** e **editar**
- Detalhe da tarefa (`/tarefa/[id]`)
- Ações: criar, editar, concluir/desfazer e remover (com confirmação)

### 3.4 Fora de escopo no MVP

- Persistência local (ex.: AsyncStorage)
- Busca/ordenação/filtros avançados
- Testes de UI de componentes/telas

---

## 4. Stack Tecnológica Utilizada

- **Expo (Managed)**
- **React Native**
- **TypeScript**
- **Expo Router** (rotas por arquivos)
- **Zustand** (estado global)
- **React Hook Form + Zod + @hookform/resolvers** (form + validação)
- **Jest + jest-expo** (testes)

---

## 5. Arquitetura e Organização do Projeto

Estrutura adotada:

```text
MinhasTarefas/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── tarefa/
│       ├── form.tsx
│       └── [id].tsx
├── src/
│   ├── components/
│   │   └── TaskListItem.tsx
│   ├── domain/
│   │   ├── task.types.ts
│   │   └── task.schema.ts
│   ├── state/
│   │   └── tasks.store.ts
│   └── utils/
│       ├── id.ts
│       └── time.ts
├── __tests__/
│   ├── smoke.test.ts
│   ├── task.schema.test.ts
│   └── tasks.store.test.ts
└── docs/
    └── projeto-mobile/
        ├── identificacao.md
        ├── relatorio-final.md
        ├── plano-de-testes.md
        ├── prompt-log.md
        ├── checkpoints/
        └── evidencias/
```

**Decisão arquitetural:**
- UI em `app/` (telas/rotas)
- Regra de negócio e estado em `src/`
- Fonte de verdade no store Zustand (evitando duplicação com `useState` nas telas)

---

## 6. Implementação por Etapas (P00–P10)

**P00 — Setup**
- Projeto criado com Expo e TypeScript.
- Aplicação rodando em emulador/dispositivo.
- Estrutura inicial validada.

**P01 — Navegação mínima**
- Rotas configuradas: Lista, Detalhe dinâmico e Form.
- Navegação entre telas funcional.
- Leitura de parâmetro `id` com tratamento seguro.

**P02 — Dependências e estrutura**
- Instalação das bibliotecas do projeto.
- Criação da estrutura `src/` modular.

**P03 — Domínio + Zod**
- Tipo `Task` definido.
- `taskFormSchema` criado com regras de validação.
- Utilitários `createId()` e `nowISO()` implementados.

**P04 — Store Zustand**
- Estado central: `tasks`, `isLoading`, `error`.
- Actions: `seedSample`, `addTask`, `updateTask`, `toggleDone`, `removeTask`, `clearError`.
- Painel inicial de teste integrado.

**P05 — Tela Lista**
- Implementação com `FlatList` e `keyExtractor` por `id`.
- Empty state com CTA para criação.
- Ações rápidas: concluir/desfazer e remover (com confirmação).

**P06 — Tela Detalhe**
- Exibição de dados da tarefa.
- Ações: concluir/desfazer, editar e remover.
- UI defensiva para `id` inválido / tarefa inexistente.

**P07 — Tela Form (real)**
- Integração de React Hook Form + `zodResolver`.
- Modo criar (sem `id`) e modo editar (com `id`).
- Prefill no modo edição e fallback defensivo se tarefa não existe.

**P08 — Setup Jest**
- Configuração de testes com `jest-expo`.
- Script `npm test`.
- Smoke test operacional.

**P09 — Testes mínimos**
- Testes do contrato Zod (`task.schema.test.ts`).
- Testes das regras do store (`tasks.store.test.ts`): add/update/toggle/remove/clearError.
- Reset de estado no `beforeEach` para evitar vazamento.

**P10 — Revisão final**
- Quality gate completo executado.
- Ajustes finais de consistência.
- Documentação e evidências consolidadas.

---

## 7. Fluxos Funcionais Validados

### 7.1 Criar tarefa
1. Usuário acessa `/tarefa/form`
2. Preenche `title` e opcionalmente `notes`
3. Salva
4. Tarefa aparece na Lista

### 7.2 Editar tarefa
1. Usuário acessa `/tarefa/form?id=<id>`
2. Form abre com dados preenchidos
3. Salva alterações
4. Lista/Detalhe refletem atualização

### 7.3 Concluir/Desfazer
- Ação disponível na Lista e no Detalhe.
- Alteração de `done` refletida na UI.

### 7.4 Remover tarefa
- Confirmação via `Alert`.
- Remoção do item e navegação segura sem inconsistência.

### 7.5 Estados defensivos
- Se `id` inválido ou tarefa inexistente: mensagem amigável + ação de retorno, sem crash.

---

## 8. Qualidade e Testes

### 8.1 Quality Gates adotados

```bash
npx tsc --noEmit
npm test
npx expo start
```

### 8.2 Testes implementados

**Schema (Zod):**
- aceita payload válido
- rejeita título curto
- respeita trim do título
- rejeita notes > 200

**Store (Zustand):**
- cria tarefa com metadados esperados
- alterna `done`
- atualiza conteúdo
- remove item
- limpa erro

### 8.3 Resultado

- ✅ TypeScript sem erros
- ✅ Testes passando
- ✅ Fluxo manual sem crash

---

## 9. Uso de IA no Projeto

A IA foi utilizada como apoio em:
- geração guiada de boilerplate;
- revisão de consistência de rotas e tipos;
- apoio na escrita de testes e documentação.

Práticas adotadas para uso responsável:
- validação local obrigatória (`tsc`, `npm test`, execução real no app);
- comparação com código já existente antes de aplicar mudanças;
- registro de decisões e prompts no `prompt-log.md`.

---

## 10. Evidências da Entrega

Evidências organizadas em:
- `docs/projeto-mobile/evidencias/semana-01/`
- `docs/projeto-mobile/evidencias/semana-02/`
- `docs/projeto-mobile/evidencias/semana-03/`
- `docs/projeto-mobile/evidencias/semana-04/`

Conteúdos registrados:
- prints/vídeos de fluxo funcional;
- validações de formulário com erro/sucesso;
- log/print de testes passando;
- evidência final de app em execução.

---

## 11. Releases e Versionamento

Padrão adotado:
- `v0.1-s1`
- `v0.2-s2`
- `v0.3-s3`
- `v1.0-final`

Links:
- Semana 1: [URL_RELEASE_S1]
- Semana 2: [URL_RELEASE_S2]
- Semana 3: [URL_RELEASE_S3]
- Final: [URL_RELEASE_V1_0_FINAL]

---

## 12. Dificuldades Encontradas e Soluções

**Erro de TypeScript com JSX em arquivo `.ts`**
- *Causa:* componente React salvo com extensão incorreta.
- *Solução:* renomear para `.tsx`.

**Risco de inconsistência entre telas**
- *Causa:* possível duplicação de estado local.
- *Solução:* manter store Zustand como fonte única de verdade.

**Fragilidade de testes por estado compartilhado**
- *Causa:* store em memória entre testes.
- *Solução:* reset do estado no `beforeEach`.

---

## 13. Limitações Atuais e Próximos Passos

### Limitações
- Persistência local ainda não implementada.
- Filtros, busca e ordenação não incluídos no MVP.
- Sem suíte de testes de UI/navegação.

### Próximos passos
- Persistir tarefas com AsyncStorage.
- Adicionar filtros (pendentes/concluídas) e busca.
- Expandir cobertura de testes para integração de telas.

---

## 14. Conclusão

O projeto atendeu ao objetivo da disciplina para um MVP mobile real, com arquitetura clara, validação consistente, fluxo funcional completo e gates de qualidade reprodutíveis. A entrega está organizada para correção objetiva, com documentação, testes e evidências centralizadas.

---

## 15. Como executar (resumo rápido para correção)

```bash
# instalar dependências
npm install

# typecheck
npx tsc --noEmit

# testes
npm test

# rodar app
npx expo start
```

---

## 16. Checklist final de entrega

- ✅ App funcional com fluxo principal completo
- ✅ TypeScript sem erros
- ✅ Testes automatizados passando
- ✅ Documentação obrigatória preenchida
- ✅ Evidências organizadas por semana
- ✅ Vídeo final (10–20 min) linkado
- ✅ Release final criada
