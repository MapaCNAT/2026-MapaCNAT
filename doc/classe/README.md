# Diagrama de Classes

## Classes

### Amigo
| Atributo | Função |
| :-------: | :-------: |
| +nome | + coordenadas() |

### Construcao
| Atributo | Função |
| :-------: | :-------: |
| +andares | |

### Piso
| Atributo | Função |
| :-------: | :-------: |
| +planta | |
| +banners | |

### Banner
| Atributo | Função |
| :-------: | :-------: |
| -blocos | +gerar_html() |

### BlocoBanner
| Atributo | Função |
| :-------: | :-------: |
| -titulo | |
| -texto | |
| -redirecionamento | |

### Local
| Atributo | Função |
| :-------: | :-------: |
| +nome | |

### Buscador
| Atributo | Função |
| :-------: | :-------: |
| | +gerar_rota(local_a, local_b) |
| | +buscar_local(nome) |
| | +buscar_amigo(nome) |

### Juncao
| Atributo | Função |
| :-------: | :-------: |
| +coordenadas | |
| +vizinhos | |

## Relações
| Classe A | Classe B | Cardinalidade | Generalização |
| :-------: | :-------: | :----: | :----: |
| Construcao | Piso | 1..* | |
| Construcao | Local | | Sim |
| piso | Banner | 1 | |
| Local | Banner | 1 | |
| Banner | BlocoBanner | 1..* | |
| Juncao | Juncao | 1..* | |
| Local | Juncao | | Sim |
| Buscador | Amigo | 1..* | |
| Buscador | Local | 1..* | |
