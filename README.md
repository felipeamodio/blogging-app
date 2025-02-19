
# Documentação da Arquitetura do Sistema

Este documento descreve a arquitetura do sistema da aplicação "Blogging App", desenvolvida com React Native, TypeScript e Expo. A aplicação permite que usuários se cadastrem, façam login, criem, editem e excluam posts, além de visualizar posts de outros usuários. O sistema utiliza o Firebase para autenticação e armazenamento de dados.

## Arquitetura do Sistema
### Estrutura Geral

A arquitetura do sistema é baseada em uma abordagem modular, onde cada funcionalidade é encapsulada em componentes e serviços. A aplicação é dividida em várias partes principais:

-   **Autenticação**: Gerencia o login e o registro de usuários utilizando Firebase Authentication.
-   **Navegação**: Utiliza o React Navigation para gerenciar a navegação entre telas.
-   **API**: Utiliza Axios para fazer requisições a uma API RESTful para gerenciar posts.
-   **Banco de Dados**: Utiliza Firebase Firestore para armazenar dados de usuários e posts.

### Componentes Principais

1.  **Autenticação**:
    
    -   `SignInScreen`: Tela de login onde os usuários inserem suas credenciais.
    -   `RegisterScreen`: Tela de registro onde os usuários criam uma nova conta.
    -   `SettingsScreen`: Tela de configurações onde os usuários podem sair ou deletar suas contas.
2.  **Navegação**:
    
    -   `StackRoute`: Gerencia a navegação entre as telas de autenticação e a tela principal.
    -   `TabRoute`: Gerencia a navegação entre as telas de "Home" e "Settings".
3.  **Home**:
    
    -   `HomeScreen`: Tela principal onde os usuários podem visualizar, criar, editar e excluir posts.
4.  **Post**:
    -   `Post`: Componente que exibe as informações de um post individual.
5. **Toast**:
	- `Toast`: Componente que serve como alerta para informar se teve sucesso ou erro em alguma ação
6. **Option**:
	- `Option`: Componente que serve para escolher ícones da biblioteca `  @expo/vector-icons`

## Uso da Aplicação

### Fluxo de Uso

1.  **Cadastro**: O usuário acessa a tela de registro, insere suas informações e cria uma conta.
2.  **Login**: Após o registro, o usuário faz login na aplicação.
3.  **Visualização de Posts**: O usuário é direcionado para a tela principal, onde pode visualizar posts.
4.  **Criação de Posts**: Usuários com a função de "Professor" podem criar novos posts.
5.  **Edição e Exclusão de Posts**: Usuários com a função de "Professor" podem editar ou excluir seus posts.
6.  **Configurações**: O usuário pode acessar as configurações para sair ou deletar sua conta.

## Relato de Experiências e Desafios

### Experiências
Tive uma experiência positiva ao trabalhar com React Native e Expo, pois a plataforma permitiu um desenvolvimento rápido e eficiente. A utilização de TypeScript trouxe benefícios em termos de tipagem e detecção de erros em tempo de compilação, o que melhorou a qualidade do código.

### Desafios

1.  **Integração com Firebase**: A configuração inicial do Firebase e a integração com a autenticação e Firestore apresentaram alguns desafios, especialmente em relação à configuração correta das regras de segurança e permissões.
    
2.  **Gerenciamento de Estado**: O gerenciamento do estado da aplicação, especialmente em relação à autenticação do usuário e à atualização da lista de posts, exigiu um planejamento cuidadoso para garantir que a interface do usuário fosse responsiva e atualizada corretamente.
    
3.  **Desempenho**: A equipe enfrentou desafios relacionados ao desempenho, especialmente ao carregar e exibir uma lista de posts. A implementação de técnicas de otimização, como a utilização de  `FlatList`  e a implementação de carregamento assíncrono, ajudou a mitigar esses problemas.
    
4.  **Testes**: A realização de testes em dispositivos físicos e emuladores foi crucial para garantir que a aplicação funcionasse corretamente em diferentes plataformas e tamanhos de tela.

## Conclusão

O Blogging App é uma aplicação robusta que permite aos usuários interagir com conteúdo de forma eficiente. Enfrentei desafios durante o desenvolvimento, mas a experiência adquirida e as soluções implementadas contribuíram para o sucesso do projeto. A utilização de tecnologias modernas como React Native, TypeScript e Firebase proporcionou uma base sólida para o desenvolvimento da aplicação.
