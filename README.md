# 📝 Todo App

Aplicativo de gerenciamento de tarefas pessoais desenvolvido para a disciplina de Desenvolvimento Mobile.

## 📋 Sobre o Projeto

Um app simples e funcional para gerenciar tarefas do dia a dia, seguindo checkpoints semanais (S1–S4) e o roteiro do professor (P00+).

Até o momento, o projeto possui:
- Navegação mínima com Expo Router (Lista / Detalhe / Form)
- Contrato do domínio (TypeScript) + validação em runtime (Zod)
- Store centralizada (Zustand) com CRUD e estados de UI (painel de teste no P04)

## 🚀 Stack

| Tecnologia | Função |
|------------|--------|
| Expo (Managed) | Ambiente de desenvolvimento |
| React Native | Framework mobile |
| TypeScript | Tipagem estática |
| Expo Router | Navegação |
| Zustand | Gerenciamento de estado |
| Zod | Validação (runtime) |

> React Hook Form e Jest serão adicionados nas próximas etapas do projeto (P07 e P09), conforme o roteiro do professor.

---

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm
- Emulador Android/iOS ou dispositivo físico com Expo Go

### Passos

```bash
# 1. Clonar o repositório
git clone [URL_DO_REPOSITORIO]


# 2. Instalar dependências
npm install

# 3. Rodar o app
npx expo start

Executar no emulador

# Android
npx expo start --android

# iOS (apenas macOS)
npx expo start --ios
```

## ✅ Quality Gates (obrigatórios no curso)
- 1) Smoke test (app abre)

    ```
    npx expo start
    ```

- 2) Gate TypeScript (sem erros)
    ```
    - npx tsc --noEmit
    ```
## 🧭 Rotas do App (Expo Router)

O Expo Router transforma arquivos em rotas automaticamente:

   - app/index.tsx → / (Lista)

   - app/tarefa/form.tsx → /tarefa/form (Form: criar/editar via query)

   - app/tarefa/[id].tsx → /tarefa/<id> (Detalhe)

Exemplos:

    Criar: /tarefa/form

    Editar: /tarefa/form?id=demo

    Detalhe: /tarefa/demo

## 📁 Estrutura do Projeto (atual)
```
todo-app/
├── app/                        # Telas (Expo Router)
│   ├── _layout.tsx             # Stack root (títulos)
│   ├── index.tsx               # Lista (Painel P04)
│   └── tarefa/
│       ├── form.tsx            # Form (placeholder / em evolução)
│       └── [id].tsx            # Detalhe (placeholder / em evolução)
├── src/
│   ├── domain/
│   │   ├── task.types.ts       # Tipo Task (entidade)
│   │   └── task.schema.ts      # Schema Zod (TaskFormValues)
│   ├── state/
│   │   └── tasks.store.ts      # Zustand store (CRUD + isLoading + error)
│   └── utils/
│       ├── id.ts               # createId()
│       └── time.ts             # nowISO()
├── docs/
│   └── projeto-mobile/         # Documentação oficial do professor
│       ├── identificacao.md
│       ├── relatorio-final.md
│       ├── plano-de-testes.md
│       ├── prompt-log.md
│       ├── checkpoints/
│       └── evidencias/
└── __tests__/                  # (será usado no P09)
```

## 📱 Funcionalidades
### Semana 1 (S1) — Base do projeto

-    Projeto criado e rodando com Expo + TypeScript (P00)

-    Navegação mínima (Lista / Detalhe / Form placeholders) (P01)

-    Contrato do domínio Task + schema Zod + utils (P03)

-    Store Zustand com CRUD + estados de UI (P04)

-    Painel na Lista para testar seedSample, toggleDone e removeTask (P04)

### Semana 2 (S2) — MVP completo (em andamento)

-    Transformar a Lista em FlatList real + empty state (P05)

-    Integrar criação/edição real com Form validado (P07)

-    Evidências do fluxo criar → listar → detalhe → editar + validações

### Extras (se der tempo)

-    Filtro por status (pendentes/concluídas)

-    Ordenação por prioridade/data

-    Busca por texto

## 📱 Funcionalidades

### MVP (Semanas 1-2)
- [x] Listagem de tarefas
- [x] Navegação entre telas
- [x] Criação de tarefas com validação
- [x] Edição de tarefas
- [x] Exclusão de tarefas
- [x] Marcar como concluída


## 📄 Documentação

Toda a documentação do projeto está em `docs/projeto-mobile/`:

- [Identificação](docs/projeto-mobile/identificacao.md)
- [Relatório Final](docs/projeto-mobile/relatorio-final.md)
- [Plano de Testes](docs/projeto-mobile/plano-de-testes.md)
- [Prompt Log (IA)](docs/projeto-mobile/prompt-log.md)

### Checkpoints
- [Semana 1](docs/projeto-mobile/checkpoints/semana-01.md)
- [Semana 2](docs/projeto-mobile/checkpoints/semana-02.md)
- [Semana 3](docs/projeto-mobile/checkpoints/semana-03.md)
- [Semana 4](docs/projeto-mobile/checkpoints/semana-04.md)

## 🎥 Vídeo de Demonstração

[Link do vídeo - adicionar na S4]

## 📌 Releases

| Versão | Descrição | Link |
|--------|-----------|------|
| v0.1-s1 | Setup + Navegação | [tag] |
| v0.2-s2 | MVP completo | [tag] |
| v0.3-s3 | Testes | [tag] |
| v1.0-final | Entrega final | [tag] |

## 👤 Autor

- **Nome:** Lucas Chagas Santos
- **Matricula:** 2020005910

---

Desenvolvido para a disciplina de Desenvolvimento Mobile - 2025.2