# CDU003. Exploração do Mapa

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O Usuário navega pelo mapa em tempo real
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário tem o mapa atualizado

## Fluxo Principal

1. Usuário
    1. Usuário interage com o mapa arrastando o dedo
        - O usuário aperta em uma área do mapa e arrasta o dedo.
2. Sistema
    1. Registra a movimentação do mapa
        - O sistema detecta a movimentação pela tela.
    2. Calcula a transformação
        - O sistema calcula uma transformação matemática que faria com que os pontos de toque do usuário no mapa sejam os mesmo no inicio e no fim do toque.
    3. Atualiza a visualização do mapa para o usuário
        - O mapa é atualizado visualmente para representar o movimento.