# CDU001. Uso do Mapa

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O Usuário localiza um local pelo mapa
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário é apresentado um banner informativo do local

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Usuário aperta no lugar da tela em que está o local que deseja conhecer | |  
| | 2.1 - Registrar o local de aperto relativo ao mapa | 
| | 2.2 - Busca as informações do local selecionado | 
| | 2.3 - Expôe os dados de informações, imagens e descrições para o usuário visualmente | 

## Fluxo Alternativo I - Usuário pesquisa pelo lugar
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1 - Usuário acessa a barra de pesquisa | |  
| 1.1 - Insere o nome de um lugar | |  
| | 2.1 - Busca as informações do local selecionado |
| | 2.2 - Expôe os dados de informações, imagens e descrições para o usuário visualmente |

## Fluxo Alternativo I - Usuário usa sugestão de pesquisa
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1 - Usuário acessa a barra de pesquisa | | 
| 1.1 - Insere o nome de um lugar | |  
| | 2.1 - Sugere lugares relacionados |
| 3 - Usuário seleciona uma das sugestões de lugar | |
| | 3.1 - Busca os dados do lugar | 
| | 3.2 - Expôe os dados de informações, imagens e descrições para o usuário visualmente |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
