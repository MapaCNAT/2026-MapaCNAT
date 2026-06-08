# CDU001. Uso do Mapa

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O Usuário localiza um local pelo mapa
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário é apresentado um banner informativo do local

## Fluxo Principal

1. Dado que o usuário está na tela inicial da aplicação visualizando a tela do mapa.
2. Quando o usuário aperta no lugar da tela em que está o local que deseja conhecer.
3. Então o sistema (via Django) deve registrar o local do aperto, obtendo as coordenadas exatas do ponto de toque no espaço da projeção do mapa.
4. E o backend deve buscar no banco de dados as informações, imagens e descrições do local selecionado correspondente a essas coordenadas.
5. E o sistema deve expor e renderizar visualmente os dados de informações, imagens e descrições para o usuário através de um banner informativo.

![tela do mapa](./cenario-uso-do-mapa.png)
