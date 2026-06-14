# CDU007. Login

- **Ator principal**: Usuário qualquer
- **Atores secundários**: Django/Banco de Dados
- **Resumo**: O Usuário realiza uma autenticação 
- **Pré-condição**: Usuário está na tela de login
- **Pós-Condição**: Usuário é apresentado á tela inicial do aplicativo

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Preenche o formulário com seus dados | |  
| | 2.1 - Verifica os dados pelo sistema | 
| | 2.2 - Redireciona o usuário para a tela inicial | 

## Fluxo Alternativo I - Autenticação automática
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| | 1.1 - Obtêm o token de uma sessão anterior |
| | 1.2 - Verifica token de autenticação anterior |
| | 1.3 - Redireciona o usuário para a tela inicial |

## Fluxo de Exceção - Usuário inválido
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1 - Preenche o formulário com dados incorretos | | 
| | 2.1 - Verifica os dados no sistema |
| | 2.2 - Informa uma mensagem de erro ao usuário |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
