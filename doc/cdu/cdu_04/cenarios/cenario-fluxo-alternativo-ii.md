# CDU004. Pinar lugar

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O usuário pina a localização de um lugar
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário tem o mapa atualizado

## Fluxo Alternativo II - Pinar por redirecionamento

1. Usuário
    1. Acessa um local
        - ![tela do mapa](./img/cenario-pinar-lugar-3.png)
    2. Acessa um link dentro do banner
        - Usuário utiliza um link de outro lugar contido dentro do banner de um local.
2. Sistema
    1. Obtêm as coordendas do local
        - Javascript extrai os dados de coordenadas do lugar obtido no fetch anterior.
    2. Atualiza a visualização do mapa para o usuário ver o pino
        - ![tela do mapa](./img/cenario-pinar-lugar-0.png)