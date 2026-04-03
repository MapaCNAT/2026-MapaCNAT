# CDU001. Exploração do Mapa

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O Usuário navega pelo mapa em tempo real
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário tem o mapa atualizado

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Usuário interage com o mapa arrastando o dedo | |  
| | 2.1 - Registra a movimentação do mapa | 
| | 2.2 - Calcula a transformação | 
| | 2.3 - Atualiza a visualização do mapa para o usuário | 

## Fluxo Alternativo I - Usuário usa a pesquisa para navegar
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1 - Usuário acessa a barra de pesquisa | | 
| 1.1 - Insere o nome de um lugar | |  
| | 2.1 - Sugere lugares relacionados |
| 3 - Usuário seleciona uma das sugestões de lugar | |
| | 3.1 - Busca os dados do lugar | 
| | 3.2 - Atualiza a translação e escala do mapa para enquadrar o local exatamente |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
