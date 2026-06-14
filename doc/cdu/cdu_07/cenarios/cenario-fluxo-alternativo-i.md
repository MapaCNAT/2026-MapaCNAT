# CDU007. Login

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Django/Banco de Dados
- **Resumo**: O Usuário realiza uma autenticação
- **Pré-condição**: Usuário está na tela de login
- **Pós-Condição**: Usuário é apresentado á tela inicial do aplicativo

## Fluxo Alternativo I - Autenticação automática

1. Sistema
   1. Obtêm o token de uma sessão anterior
      - Javascript verifica o cache em busca de um token.
   2. Verifica os dados pelo sistema
      - Javascript verifica com o Back-End se o token é válido.
   3. Redireciona o usuário para a tela inicial
      ![tela do mapa](./img/cenario-login-1.png)