# CDU001. Uso do Mapa

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O Usuário localiza um local pelo mapa
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário é apresentado um banner informativo do local

## Fluxo Alternativo I - Usuário pesquisa pelo lugar

1. Usuário
   1. acessa a barra de pesquisa
      ![tela do mapa](./img/cenario-uso-do-mapa-2.png)
   2. Insere o nome de um local
      - O usuário digita por um texto com o teclado recém aberto e confirma a busca.
2. Sistema
   1. Busca as informações do local selecionado
      - O Javascript faz um fetch pelo lugar no banco de dado com o nome mais semelhante.
   2. Expôe os dados de informações, imagens e descrições para o usuário visualmente
      ![tela do mapa](./img/cenario-uso-do-mapa-1.png)
