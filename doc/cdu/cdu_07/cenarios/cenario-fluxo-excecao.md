# CDU007. Login

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Django/Banco de Dados
- **Resumo**: O Usuário realiza uma autenticação 
- **Pré-condição**: Usuário está na tela de login
- **Pós-Condição**: Usuário é apresentado á tela inicial do aplicativo

## Fluxo de Exceção - Usuário inválido

1. Usuário
   1. Preenche o formulário com dados incorretos
      - O usuário informa um email e uma senha inválidos.
      ![tela do mapa](./img/cenario-login-0.png)
2. Sistema
   1. Verifica os dados pelo sistema
      - Javascript verifica com o Back-End se os dados são válidos no banco de dados.
   2. Redireciona o usuário para a tela inicial
      - Ao falhar em encontrar um usuário válido, o sistema avisa o usuário com uma mensagem de erro.
      - Javascript mostra um aviso de erro junto a mensagem do erro.
      ![tela do mapa](./img/cenario-login-2.png)