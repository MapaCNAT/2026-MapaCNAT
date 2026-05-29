# CDU001. Uso do Mapa

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O Usuário localiza um local pelo mapa
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário é apresentado um banner informativo do local

## Fluxo Principal

1. Usuário aperta no lugar da tela em que está o local que deseja conhecer

![tela do mapa](./cenario-uso-do-mapa.png)


2. Sistema
   1. Registrar o local de aperto relativo ao mapa
      - Django obtêm as coordenadas do ponto de toque tanto no espaço da projeção.
   2. Busca as informações do local selecionado
      - O django
   3. Expôe os dados de informações, imagens e descrições para o usuário visualmente | 

