# 📝 Todo App

Aplicativo de gerenciamento de tarefas pessoais desenvolvido para a disciplina de Desenvolvimento Mobile.

## 📋 Sobre o Projeto

Um app simples e funcional para gerenciar suas tarefas do dia a dia, com:
- Criação, edição e exclusão de tarefas
- Priorização (baixa, média, alta)
- Marcação de conclusão
- Validação de dados

## 🚀 Stack

| Tecnologia | Versão | Função |
|------------|--------|--------|
| Expo | ~50.0.0 | Ambiente de desenvolvimento |
| React Native | 0.73.x | Framework mobile |
| TypeScript | ^5.3.0 | Tipagem estática |
| Expo Router | ~3.4.0 | Navegação |
| Zustand | ^4.4.7 | Gerenciamento de estado |
| React Hook Form | ^7.49.3 | Formulários |
| Zod | ^3.22.4 | Validação |
| Jest | ^29.7.0 | Testes |

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm
- Expo CLI (`npm install -g expo-cli`)
- Emulador Android/iOS ou dispositivo físico com Expo Go

### Passos

```bash
# 1. Clonar o repositório
git clone [URL_DO_REPOSITORIO]
cd todo-app

# 2. Instalar dependências
npm install

# 3. Iniciar o projeto
npm start
```

### Executar no emulador

```bash
# Android
npm run android

# iOS (apenas macOS)
npm run ios
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar com coverage
npm test -- --coverage
```

## 📁 Estrutura do Projeto

```
todo-app/
├── app/                    # Telas (Expo Router)
│   ├── (tabs)/            # Navegação por tabs
│   │   ├── _layout.tsx    # Configuração das tabs
│   │   ├── index.tsx      # Lista de tarefas
│   │   └── criar.tsx      # Criar tarefa
│   ├── tarefa/
│   │   └── [id].tsx       # Detalhes da tarefa
│   └── _layout.tsx        # Layout raiz
├── src/
│   ├── store/             # Zustand stores
│   ├── schemas/           # Validação Zod
│   └── types/             # TypeScript types
├── docs/
│   └── projeto-mobile/    # Documentação do projeto
│       ├── identificacao.md
│       ├── relatorio-final.md
│       ├── plano-de-testes.md
│       ├── prompt-log.md
│       ├── checkpoints/
│       └── evidencias/
└── __tests__/             # Testes automatizados
```

## 📱 Funcionalidades

### MVP (Semanas 1-2)
- [x] Listagem de tarefas
- [x] Navegação entre telas
- [ ] Criação de tarefas com validação
- [ ] Edição de tarefas
- [ ] Exclusão de tarefas
- [ ] Marcar como concluída

### Extras (se der tempo)
- [ ] Filtro por status (pendentes/concluídas)
- [ ] Ordenação por prioridade/data
- [ ] Busca por texto

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

- **Nome:** [Seu nome]
- **RA:** [Seu RA]

---

Desenvolvido para a disciplina de Desenvolvimento Mobile - 2025.2
