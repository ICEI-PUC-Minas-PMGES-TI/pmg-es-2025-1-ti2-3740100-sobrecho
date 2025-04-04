# 3.3.6 Processo 5 – Avaliação de Cliente 

O processo de avaliação de clientes permite que lojistas atribuam uma nota ao cliente após um atendimento. Caso a nota seja menor ou igual a 2 estrelas, um comentário se torna obrigatório antes de finalizar a avaliação. 

## Oportunidades de Melhoria 
- Implementação de feedback mais detalhado sobre a avaliação. 
- Integração de um sistema de alertas para clientes com avaliações baixas recorrentes. 
- Interface mais intuitiva para a atribuição de notas e comentários. 

## Modelo BPMN do Processo 6 
![Modelo BPMN do Processo 6](images/processoAvaliacaoLojista.png "Modelo BPMN do Processo 6.") 

---

## Detalhamento das Atividades 

### 1. Realiza Atendimento 
O lojista realiza o atendimento ao cliente antes de prosseguir com a avaliação. 

| **Campo**               | **Tipo**       | **Restrições** | **Valor default** |
|-------------------------|---------------|---------------|------------------|
| Descrição do atendimento | Área de texto | Obrigatório   | -                |

**Comandos:**  
- **Finalizar atendimento** → *Gateway "Deseja avaliar o cliente?"* (default)  

---

### 2. Atribuir Nota de Avaliação 
O lojista escolhe uma nota de 1 a 5 estrelas para avaliar o cliente. 

| **Campo** | **Tipo** | **Restrições**          | **Valor default** |
|-----------|----------|-------------------------|------------------|
| Nota      | Número   | Obrigatório (1 a 5 estrelas) | -                |

**Comandos:**  
- **Confirmar nota** → *Gateway "Nota maior que 2 estrelas?"* (default)  

---

### 3. Escrever Comentário *(Obrigatório caso a nota seja menor ou igual a 2 estrelas)* 
Se a nota atribuída for **≤ 2**, o lojista deve obrigatoriamente inserir um comentário. 

| **Campo**    | **Tipo**       | **Restrições**                | **Valor default** |
|--------------|---------------|-------------------------------|------------------|
| Comentário   | Área de texto | Obrigatório se nota ≤ 2       | -                |

**Comandos:**  
- **Enviar comentário** → *Gateway "Incluir comentário na avaliação?"* (default)  

---

### 4. Registrar Avaliação no Sistema 
Após a atribuição da nota e possível inclusão de comentário, a avaliação é registrada no sistema. 

| **Campo**         | **Tipo**     | **Restrições** | **Valor default** |
|-------------------|--------------|----------------|------------------|
| Avaliação salva   | Confirmação  | Obrigatório    | -                |

**Comandos:**  
- **Finalizar** → *Fim do processo* (default)  

---

Esse detalhamento garante um entendimento completo do processo de **Avaliação de Cliente**, conforme representado no diagrama BPMN.
