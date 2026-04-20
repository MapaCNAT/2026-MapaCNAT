# CDU001. Pinar lugar

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Nenhum
- **Resumo**: O usuário pina a localização de um lugar
- **Pré-condição**: Usuário está na tela inicial da aplicação
- **Pós-Condição**: Usuário tem o mapa atualizado

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Aperta em um local dentro do mapa do instituto | |  
| | 2.1 - Registra a coordenada do local | 
| | 2.2 - Atualiza a visualização do mapa para o usuário ver o pino | 

## Fluxo Alternativo I - Pinar por pesquisa
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1 - Usuário acessa a barra de pesquisa | | 
| 1.1 - Insere o nome de um lugar | |  
| 1.2 - Seleciona um local | |  
| | 2.1 - Obtêm as coordendas do local |
| | 2.2 - Atualiza a visualização do mapa para o usuário ver o pino |

## Fluxo Alternativo II - Pinar por redirecionamento
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1.1 - Acessa um local | | 
| 1.2 - Acessa um link dentro do banner | | 
| | 2.1 - Obtêm as coordendas do local |
| | 2.2 - Atualiza a visualização do mapa para o usuário ver o pino |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
