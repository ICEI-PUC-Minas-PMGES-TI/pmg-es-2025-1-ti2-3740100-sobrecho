### 3.3.4 Processo 4 – Troca de Peças

![Modelo BPMN do Processo de Troca de Peças](images/TrocaDePecas.jpeg "Modelo BPMN do Processo de Troca de Peças.")

#### Detalhamento das atividades

**Cadastrar uma peça para troca**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome da peça    | Caixa de Texto   | máximo de 100 caracteres |         |
| Descrição       | Caixa de Texto   | Máximo de 500 caracteres |         |
| Foto da peça    | Arquivo          | Apenas arquivos png e jpeg |       |
| Brechó   | Seleção única | Um dos brechós cadastrados na plataforma |   |
| Peça desejada   | Seleção única | Uma das peças do brechó selecionado | |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
| Cadastrar            | Cadastrar Proposta de troca  |            |


**Analisar Proposta de Troca**

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Aceitar | Proposta Aceita  | (default/accept/  )                          |
| Recusar | Proposta Recusada  | (default/cancel/  )                        |

**Sugerir data para a troca**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Data/Hora da troca | Data e Hora | Tem que ser um dia no futuro |       |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
| Enviar proposta      | Envia proposta para análise  |            |

**Analisar Data Sugerida**

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Aceitar | Proposta Aceita  | (default/accept/  )                          |
| Recusar | Proposta Recusada  | (default/cancel/  )                        |
| Recusar e Reagendar | Proposta Recusada  | (default/cancel/  )            |
