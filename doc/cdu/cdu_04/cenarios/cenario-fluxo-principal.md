# CDU004. Pinar lugar

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O usuário pina a localização de um lugar
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário tem o mapa atualizado

## Fluxo Principal

1. Usuário
    1. Aperta em um local dentro do mapa do instituto
        - Usuário aperta em uma região válida do mapa.
2. Sistema
    1. Registra a coordenada do local
        - Javascript obtêm as coordenadas do clique tanto na tela quanto no espaço do mapa.
    2. Atualiza a visualização do mapa para o usuário ver o pino
        ![tela do mapa](./img/cenario-pinar-lugar-0.png)