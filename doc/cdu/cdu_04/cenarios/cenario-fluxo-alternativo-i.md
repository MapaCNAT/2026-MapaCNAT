# CDU004. Pinar lugar

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O usuário pina a localização de um lugar
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário tem o mapa atualizado

## Fluxo Alternativo I - Pinar por pesquisa

1. Usuário
    1. Usuário acessa a barra de pesquisa
        ![tela do mapa](./img/cenario-pinar-lugar-1.png)
    2. Insere o nome de um lugar
        - O usuário digita por um texto com o teclado recém aberto e confirma a busca.
        ![tela do mapa](./img/cenario-pinar-lugar-2.png)
    3. Seleciona um local
        - O usuário aperta em uma das opções, levando o Javascript a realizar um fetch do local.
2. Sistema
    1. Obtêm as coordendas do local
        - Javascript extrai os dados de coordenadas do lugar obtido no fetch anterior.
    2. Atualiza a visualização do mapa para o usuário ver o pino
        - ![tela do mapa](./img/cenario-pinar-lugar-0.png)