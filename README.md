# 🌞 Lumina

> Aplicativo de gerenciamento de tarefas acessível, desenvolvido para pessoas com autismo, TDAH e outras condições neurológicas.

---

## 📋 Sobre o Projeto

O **Lumina** é um todo-list no estilo Kanban (inspirado no Trello e Jira) com foco em **acessibilidade cognitiva**. O app foi projetado para reduzir a sobrecarga sensorial e facilitar a organização de tarefas para pessoas neurodivergentes, com recursos como modo foco, timer pomodoro, modos cognitivos personalizados e paleta de cores pastéis.

---

## ✨ Funcionalidades

### 🚀 Onboarding
- Tela de boas-vindas com navegação por **swipe horizontal**
- Pergunta inicial sobre a atividade em foco
- Exibe o foco escolhido como banner na tela principal

### 📋 Quadro de Atividades
- Visualização em **colunas Kanban**
- Criar, editar e remover **listas** com cores pastéis personalizadas
- Criar, editar, concluir e excluir **tarefas** dentro de cada lista
- Tarefas concluídas exibidas com texto riscado e ícone verde

### 🎯 Modo Foco
- Oculta todas as listas exceto a que tem tarefas pendentes
- Reduz distrações visuais para maior concentração

### 🍅 Timer Pomodoro
- Timer de 25 minutos com controle de play/pause no header
- Reinicia automaticamente ao finalizar

### ⚙️ Configurações
- **Modos Cognitivos**: Foco, Leitura Clara, Sensibilidade Sensorial, Baixa Atenção
- **Personalização Visual**: tamanho de fonte, alertas visuais, passos guiados
- **Foco e Produtividade**: modo foco e timer pomodoro

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [React Native](https://reactnative.dev/) | 0.74+ | Framework mobile |
| [Expo](https://expo.dev/) | 51+ | Plataforma de desenvolvimento |
| [TypeScript](https://www.typescriptlang.org/) | 5+ | Tipagem estática |
| [Gluestack UI v1](https://gluestack.io/) | 1.1.73 | Biblioteca de componentes acessíveis |
| [Expo Router](https://expo.github.io/router/) | 3+ | Navegação baseada em arquivos |
| [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) | — | Espaçamento da status bar |
| [Lucide React Native](https://lucide.dev/) | — | Ícones |

---

## 📁 Estrutura do Projeto

```
lumina/
├── app/                        # Rotas do Expo Router
│   └── index.tsx               # Entrada principal
├── src/
│   ├── context/
│   │   └── BoardContext.tsx    # Contexto global de listas e tarefas
│   ├── screens/
│   │   ├── OnboardingScreen.tsx  # Tela de primeiro acesso (3 etapas)
│   │   └── HomeScreen.tsx        # Tela principal com quadro Kanban
│   └── components/
│       ├── AppHeader.tsx         # Header com pomodoro e modo foco
│       ├── ListColumn.tsx        # Coluna/lista do quadro
│       ├── TaskModal.tsx         # Modal de adicionar/editar tarefa
│       └── ListModal.tsx         # Modal de adicionar/editar lista
├── global.css                  # Estilos globais (NativeWind)
├── App.tsx                     # Raiz com providers
└── README.md
```

---

## 🏗️ Arquitetura

### BoardContext
Todo o estado de listas e tarefas é gerenciado pelo `BoardContext`, evitando prop drilling e facilitando o acesso em qualquer tela futura.

```typescript
const { lists, addList, editList, deleteList, addTask, editTask, deleteTask, toggleTask } = useBoard();
```

### Providers
O `App.tsx` envolve a aplicação com os providers necessários:

```tsx
<SafeAreaProvider>
  <GluestackUIProvider config={config}>
    <BoardProvider>
      {/* Telas */}
    </BoardProvider>
  </GluestackUIProvider>
</SafeAreaProvider>
```

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI
- Android Studio ou Xcode (para emulador) **ou** aplicativo Expo Go no celular

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/lumina.git
cd lumina

# Instale as dependências
npm install

# Instale as dependências peer do Gluestack UI
npm install @react-native-aria/overlays @react-native-aria/dialog @react-native-aria/utils @react-native-aria/interactions @react-native-aria/focus @react-native-aria/checkbox @react-native-aria/radio @react-native-aria/slider @react-native-aria/listbox @react-native-aria/menu @react-native-aria/combobox @react-native-aria/tabs
```

### Executando

```bash
# Inicia o servidor de desenvolvimento
npx expo start

# Android
npx expo start --android

# iOS
npx expo start --ios

# Limpar cache (use quando houver erros de bundle)
npx expo start --clear
```

---

## 🎨 Paleta de Cores

O Lumina utiliza cores pastéis para reduzir a sobrecarga sensorial:

| Cor | Hex | Uso |
|---|---|---|
| Branco pastel | `#F5F5F5` | Listas neutras |
| Amarelo pastel | `#FFF9E6` | Listas de planejamento |
| Azul pastel | `#E8F0FE` | Listas em desenvolvimento |
| Verde pastel | `#E6F4EA` | Listas concluídas |
| Lavender pastel | `#EDE7F6` | Banner de foco atual |
| Azul ação | `#BDD7F5` | Botão editar |
| Vermelho pastel | `#F5B5B5` | Botão excluir |

---

## ♿ Acessibilidade

O Lumina foi desenvolvido com foco em acessibilidade cognitiva:

- **Cores pastéis** — reduzem a sobrecarga sensorial visual
- **Modo foco** — elimina distrações, exibe apenas o necessário
- **Passos guiados** — orienta o usuário em ações dentro do app
- **Alertas visuais** — alternativa a alertas sonoros
- **Tamanho de fonte ajustável** — conforto na leitura
- **Modos cognitivos pré-configurados** — adaptações rápidas para diferentes necessidades
- **Gluestack UI** — componentes com suporte nativo a acessibilidade (ARIA)

---

## 📝 Convenção de Commits

O projeto adota **Conventional Commits em português**:

```
feat: adiciona nova funcionalidade
fix: corrige um bug
refactor: refatora código sem mudar comportamento
style: ajustes visuais e de formatação
chore: tarefas de configuração e manutenção
docs: atualiza documentação
```

**Exemplo:**
```bash
git commit -m "feat: adiciona timer pomodoro com play/pause no header"
```

---

## 🗺️ Próximos Passos

- [ ] Tela de Configurações funcional
- [ ] Persistência de dados com AsyncStorage
- [ ] Notificações ao fim do ciclo pomodoro
- [ ] Autenticação de usuário
- [ ] Sincronização na nuvem
- [ ] Modo escuro (Sensibilidade Sensorial)

---

## 🔄 CI/CD

O projeto possui um pipeline de integração contínua configurado com **GitHub Actions** (`.github/workflows/ci.yml`). O pipeline é executado automaticamente em pull requests e pushes para as branches `main` e `develop`, garantindo a qualidade do código através de:

- **Type Check** — Validação de tipos com TypeScript
- **Lint** — Análise estática de código com ESLint
- **Testes** — Execução automática da suíte de testes

Isso garante que todas as alterações sejam verificadas antes de serem integradas ao projeto.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">Feito com 🌞 para tornar a produtividade mais acessível</p>
