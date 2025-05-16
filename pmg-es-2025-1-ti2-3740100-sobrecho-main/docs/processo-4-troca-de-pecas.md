### 3.3.5 Processo 4 – Troca de Peças

O processo de trocas de peças permite que clientes e lojistas troquem peças de valor similar. As trocas podem ser feitas de forma presencial e à distância, além de haver a possibilidade de cancelamento durante várias etapas do processo.
## Oportunidades de Melhoria 
- Implementação de medidas de garantia para o cliente e o lojista não sofrerem golpes.
- Implementação de uma forma de comunicação direta entre o lojista e o cliente.
## Modelo BPMN do Processo 4 
![Modelo BPMN do Processo de Troca de Peças](images/TrocasDePecas.png "Modelo BPMN do Processo de Troca de Peças.")

## Detalhamento das atividades

### 1. Cadastrar uma peça para troca

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome da peça    | Caixa de Texto   | máximo de 100 caracteres |         |
| Descrição       | Caixa de Texto   | Máximo de 500 caracteres |         |
| Foto da peça    | Arquivo          | Apenas arquivos png e jpeg |       |
| Brechó   | Seleção única | Um dos brechós cadastrados na plataforma |   |
| Peça desejada   | Seleção única | Uma das peças do brechó selecionado | |

**Comandos:**  
- **Cadastrar** → *Atividade "Cadastrar um pedido de troca"* (default): Cadastra o pedido de troca.  
- **Cancelar** → *Tela inicial do sistema* (cancel): permite ao cliente cancelar a criação do pedido e retornar ao menu principal.

---

### 2. Analisar Proposta de Troca

**Comandos:**  
- **Aceitar** → *Atividade "Analisar proposta de troca"* (default): Aceita a proposta e dá seguimento ao processo.  
- **Recusar** → *Atividade "Analisar proposta de troca"* (cancel): Recusa a proposta de troca e redireciona o sistema para o menu principal, dando fim ao processo.  

---

### 3. Sugerir data para a troca

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Data/Hora da troca | Data e Hora | Tem que ser um dia no futuro |       |

**Comandos:**  
- **Enviar Proposta** → *Atividade "Sugerir data para a troca"* (default): Envia a sugestão de data para a troca.  
- **Cancelar** → *Atividade "Analisar proposta de troca"* (cancel): Retorna ao menu principal.  

---

### 4. Analisar Data Sugerida

- **Aceitar** → *Atividade "Analisar Data Sugerida"* (default): Aceita a data de troca e dá seguimento ao processo.  
- **Recusar** → *Atividade "Analisar Data Sugerida"* (cancel): Recusa a data de troca sugerida redireciona o sistema para o menu principal, dando fim ao processo.
- **Recusar e Reagendar** → *Atividade "Analisar Data Sugerida"* (default): Recusa a data de troca sugerida redireciona o sistema para o menu principal. Reenvia a proposta de troca para o cliente para que ele possa sugerir uma nova data.

---

### 5. Atualizar estado da(s) peça(s)

**Comandos:**  
- **Aprovar** → *Atividade "Atualizar estado da(s) peça(s)"* (default): Aprova as peças e dá seguimento ao processo.  
- **Reprovar** → *Atividade "Analisar proposta de troca"* (cancel): Reprova as peças e redireciona o sistema para o menu principal, dando fim ao processo.  

---

### 6. Alterar Status da(s) peça(s) para Enviado

**Comandos:**  
- **Confirmar Envio** → *Atividade "Alterar Status da(s) peça(s) para Enviado"* (default): Altera o status da peça para enviado e dá seguimento ao processo.

---

### 7. Cancelar Pedido de Troca

**Comandos:**  
- **Cancelar Pedido de Troca** → *Atividade "Cancelar Pedido de Troca"* (cancel): Cancela o pedido de troca e redireciona o sistema para o menu principal, dando fim ao processo.

---

### 8. Confirmar recebimento da(s) peça(s)

- **Finalizar Troca** → *Atividade "Confirmar recebimento da(s) peça(s)"* (default): Finaliza o pedido de troca e redireciona o sistema para o menu principal, dando fim ao processo.

---

Esse detalhamento garante um entendimento completo do processo de **Trocas de Peças**, conforme representado no diagrama BPMN.
