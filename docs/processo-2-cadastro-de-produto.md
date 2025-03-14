# 3.3.2 Processo 2 – Cadastro de Produtos

O processo de cadastro de produtos permite que vendedores adicionem novos produtos à venda. Ele garante que todas as informações necessárias estejam completas antes da publicação do item.

## Oportunidades de Melhoria
- Implementação de feedback mais detalhado sobre erros no cadastro.
- Automação do envio de notificações ao vendedor quando um erro for detectado.
- Interface mais intuitiva para evitar preenchimentos incorretos.

## Modelo BPMN do Processo 2
![Modelo BPMN do Processo 2](images/cadastro_de_produtos "Modelo BPMN do Processo 2.")

---

## Detalhamento das Atividades

### 1. Inserir Informações do Produto
O vendedor insere os dados básicos do produto, como nome, descrição, preço e categoria.

| **Campo**       | **Tipo**         | **Restrições**                     | **Valor default** |
|----------------|-----------------|----------------------------------|------------------|
| Nome do produto | Caixa de texto   | Obrigatório, mínimo 3 caracteres | - |
| Descrição       | Área de texto    | Obrigatório, mínimo 10 caracteres | - |
| Preço          | Número           | Obrigatório, maior que zero | - |
| Categoria      | Seleção única    | Obrigatório, opções predefinidas | - |

**Comandos:**
- **Salvar** → *Verificação do sistema* (default)

---

### 2. Upload de Imagens do Produto
O vendedor adiciona imagens para ilustrar o produto.

| **Campo**  | **Tipo**  | **Restrições** | **Valor default** |
|-----------|----------|----------------|------------------|
| Imagem 1  | Imagem   | Obrigatório, formato JPG/PNG | - |
| Imagem 2  | Imagem   | Opcional, formato JPG/PNG | - |

**Comandos:**
- **Enviar** → *Verificação do sistema* (default)

---

### 3. Verificação do Sistema
O sistema analisa se todas as informações e imagens foram preenchidas corretamente. Se houver erro, envia uma mensagem ao vendedor.

| **Campo**           | **Tipo**        | **Restrições**          | **Valor default** |
|--------------------|---------------|----------------------|------------------|
| Status de verificação | Seleção única | Aprovado/Reprovado | - |

**Comandos:**
- **Aprovado** → *Produto aprovado* (default)
- **Reprovado** → *Mensagem de erro* (default)

---

### 4. Mensagem de Erro
Caso haja erro no cadastro, o sistema notifica o vendedor para correção.

| **Campo**           | **Tipo**      | **Restrições** | **Valor default** |
|--------------------|-------------|--------------|------------------|
| Descrição do erro | Área de texto | Obrigatório | - |

**Comandos:**
- **Corrigir** → *Inserir informações do produto* (default)
- **Não corrigir** → *Fim* (cancel)

---

### 5. Produto Aprovado
Se todas as informações estiverem corretas, o sistema aprova o produto e envia uma notificação ao vendedor.

| **Campo**              | **Tipo**      | **Restrições** | **Valor default** |
|-----------------------|-------------|--------------|------------------|
| Mensagem de aprovação | Área de texto | Obrigatório | "Seu produto foi aprovado!" |

**Comandos:**
- **Confirmar** → *Postagem feita* (default)

---

### 6. Postagem Feita
O produto é publicado na plataforma e fica disponível para os compradores.

| **Campo**            | **Tipo**       | **Restrições** | **Valor default** |
|---------------------|--------------|--------------|------------------|
| Data de publicação | Data e Hora  | Obrigatório | - |

**Comandos:**
- **Finalizar** → *Fim* (default)

---

Esse detalhamento garante um entendimento completo do processo de cadastro de produtos no **SóBrecho**, conforme representado no diagrama BPMN.
