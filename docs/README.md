# SóBrechó


**Bernardo Antonio Meirelles Lima, bamlima@sga.pucminas.br**

**Caio Souza de Resende, caio.resende@sga.pucminas.br**

**Iago de Lara Cotta Monteiro, iago.cotta@sga.pucminas.br**

**João Paulo Gobira Lopes Costa, joao.costa.1520911@sga.pucminas.br**

**Matheus Cordeiro Berto, matheus.berto@sga.pucminas.br**

**Matheus Ruas Gazire Xavier, matheus.gazire@sga.pucminas.br**

**Sol Quaresma Crisóstomo, quaresmasol1221@gmail.com**

---

Professores:

**Danilo de Quadros Maia Filho**

**Joana Gabriela Ribeiro de Souza**

**Michelle Hanne Soares de Andrade**

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**. Escrever aqui o resumo. O resumo deve contextualizar rapidamente o trabalho, descrever seu objetivo e, ao final, 
mostrar algum resultado relevante do trabalho (até 10 linhas)._

---


## 1. Introdução

O objetivo deste trabalho é desenvolver uma plataforma inovadora para a compra e venda de produtos de segunda mão, com foco em brechós e bazares. A solução proposta busca facilitar a conexão entre vendedores e compradores, promovendo o consumo sustentável e acessível por meio da digitalização do comércio de peças usadas.

### 1.1 Contextualização

O projeto SóBrechó surge como uma solução inovadora para a compra e venda de produtos usados, atendendo a um mercado em constante crescimento. De acordo com o Resale Report 2023 da ThredUp [1] https://portugaltextil.com/vendas-de-roupa-em-segunda-mao-duplicam-ate-2027/, o mercado global de vestuário de segunda mão deverá quase dobrar até 2027, atingindo um valor estimado de US$ 350 bilhões. ​

No Brasil, o segmento de brechós vem ganhando força, impulsionado pela busca por alternativas mais econômicas e sustentáveis. Entretanto, muitos desses estabelecimentos ainda operam de forma analógica, sem uma presença digital consolidada, o que limita seu alcance e competitividade no mercado. A transformação digital no comércio tem sido uma tendência essencial para pequenos empreendedores, permitindo a ampliação da clientela, otimização da gestão de estoque e maior visibilidade para os negócios.​

Diante desse cenário, a plataforma SóBrechó busca unir sustentabilidade, inovação e proximidade humana no ambiente digital. Nossa solução não apenas facilita a entrada desses comerciantes no mundo online, mas também preserva a essência dos brechós, valorizando as histórias por trás das peças e incentivando o consumo consciente.

### 1.2 Problema

Atualmente, brechós e bazares enfrentam desafios significativos diante da crescente transformação digital. Sendo um segmento tradicionalmente analógico, muitos desses estabelecimentos ainda dependem de vendas presenciais e divulgação boca a boca, o que limita seu alcance e dificulta a adaptação ao novo cenário do varejo online.

Além disso, a ascensão do e-commerce e das grandes redes de fast fashion — como Shein, Renner e C&A — impõe uma concorrência agressiva, oferecendo preços baixos e uma experiência de compra digitalizada e conveniente. O mercado global de fast fashion gerou US$ 25,1 bilhões em 2020 e está projetado para crescer a uma taxa anual composta de 21,9%, atingindo US$ 31 bilhões em 2021. Até 2030, estima-se que esse setor alcance uma receita de US$ 192 bilhões (Wikipedia, 2021, https://en.wikipedia.org/wiki/Fast_fashion).

Essa realidade torna cada vez mais difícil para pequenos lojistas de roupas usadas atrair e fidelizar clientes, especialmente aqueles que buscam praticidade na compra. Além da falta de infraestrutura digital, muitos brechós não possuem ferramentas de marketing, plataformas de gestão de estoque ou integração com marketplaces, reduzindo suas chances de competir nesse ambiente digitalizado.

Diante desse contexto, surge a necessidade de uma solução acessível e eficiente que permita a digitalização desse setor, garantindo que pequenos comerciantes possam competir em pé de igualdade no mercado online.

### 1.3 Objetivo geral

O objetivo geral deste projeto é desenvolver um sistema web do tipo "marketplace" voltado para brechós e bazares, proporcionando uma solução digital acessível e eficiente.

#### 1.3.1 Objetivos específicos

O projeto tem como objetivos específicos desenvolver as seguintes funcionalidades para o sistema:

- Carrinho de Compras, garantindo uma experiência intuitiva e eficiente para os compradores.
- Cadastro de Produtos, permitindo que os vendedores anunciem seus itens de forma organizada e atrativa.
- Sistema de Pagamento de Pedidos, integrando métodos de pagamento seguros e acessíveis.
- Trocas de Produtos, incentivando a economia circular e o consumo sustentável.
- 
### 1.4 Justificativas

O desenvolvimento deste projeto surgiu a partir das dificuldades observadas pelos integrantes do grupo na experiência de compra e venda de produtos usados em brechós e bazares. Em um cenário cada vez mais dominado pelo comércio digital, esses estabelecimentos enfrentam desafios significativos para se manterem competitivos.

A necessidade de transformação digital tem sido um fator crítico para a sobrevivência de pequenos comerciantes. Grandes plataformas de e-commerce, como Mercado Livre, Magalu e Shein, dominam o mercado, oferecendo preços baixos, conveniência e uma ampla variedade de produtos. Diante dessa realidade, muitos donos de brechós encontram dificuldades em expandir sua clientela, gerenciar seus estoques e competir com a praticidade das compras online.

Além disso, o mercado de segunda mão está em ascensão, impulsionado por fatores como sustentabilidade e economia circular. Segundo dados do ThredUp Resale Report 2023, o setor de moda de segunda mão deve dobrar de tamanho até 2027, atingindo um valor de US$ 350 bilhões. No entanto, brechós que não possuem presença digital estruturada correm o risco de ficar à margem desse crescimento.

Diante desse contexto, este trabalho busca desenvolver uma solução acessível e eficiente para digitalizar brechós e bazares, permitindo que esses comerciantes ampliem seu alcance, modernizem suas operações e se tornem mais competitivos no mercado online, sem perder a essência do comércio tradicional.

## 2. Participantes do processo

- **Lojista**
Perfil: Indivíduo que administra um brechó ou bazar, buscando ampliar sua clientela e modernizar suas vendas no ambiente digital. Ele é o participante responsável por todas as atividades que dizem respeito à venda de produtos e controle dos mesmos.

- **Comprador**
Perfil: Indivíduo que busca produtos usados como alternativa ao consumo tradicional, priorizando sustentabilidade e economia. Ele é o participante responsável pelas atividades que dizem respeito à compra de produtos.

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

Os brechós, historicamente, operam com um modelo de negócio tradicional, semelhante ao que era praticado décadas atrás. Geralmente, possuem um estabelecimento físico, onde um responsável realiza a curadoria de peças, adquirindo itens de diferentes fontes, como bazares, clientes e doações. Esses produtos são então organizados no espaço do brechó, proporcionando uma experiência de compra personalizada e baseada no contato humano, onde a interação entre vendedor e cliente desempenha um papel essencial.

No que diz respeito aos processos, o controle dos produtos é feito de forma manual e analógica, geralmente sem um gerenciamento de inventário detalhado ou rígido. O pagamento dos pedidos é feito tradicionalmente, através de dinheiro, pix ou cartão, no momento em que o comprador escolhe suas peças e as leva ao caixa, com a possibilidade de "pechinchar" o preço com o vendedor e adquirir descontos. As trocas de peças são feitas em tempo real, com o comprador trazendo ao lojista as peças que ele tem a oferecer e negocia outras peças e/ou dinheiro em troca delas.

### 3.2. Descrição geral da proposta de solução

Nossa solução busca aproximar vendedores e clientes, preservando a essência dos brechós tradicionais por meio de um marketplace digital humanizado e acessível. Para isso, utilizaremos processos informatizados que permitirão que lojistas anunciem itens de vestuário seminovos e em bom estado de maneira intuitiva e eficiente.

No que tange os prcessos, o controle dos produtos será feito de forma digital, com a possibilidade do lojista fazer o controle completo do seu inventário, além de contar com funcionalidades como a atualização automática do estoque quando, por exemplo, uma troca ou venda for efetivada. O pagamento dos pedidos será feito através de uma API de Pix no momento em que o comprador fizer o checkout fo seu carrinho de compras, o que assegura o conforto de não ter que sair de casa para efetuar a compra e a confiabilidade dessa forma de pagamento. E como no modelo tradicional, nosso sistema também vai permitir a "pechincha" de pedidos feitos para um lojista. Por fim, as trocas de peça poderão ser efetuadas à distância, o que garante mais praticidade e permite que as trocas sejam feitas entre clientes e lojistas que não tem como se encontrar pessoalmente por motivos de distância ou locomoção. 
 
### 3.3. Modelagem dos processos

[PROCESSO 1 - Cadastro de Produtos](processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Carrinho de Compras](processo-2-nome-do-processo.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Pagamento de Pedidos](processo-3-nome-do-processo.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Mapeamento de Brechós](processo-4-nome-do-processo.md "Detalhamento do Processo 4.")

## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

_Apresente aqui a conclusão do seu trabalho. Deve ser apresentada aqui uma discussão dos resultados obtidos no trabalho, local em que se verifica as observações pessoais de cada aluno. Essa seção poderá também apresentar sugestões de novas linhas de estudo._

# REFERÊNCIAS

_Como um projeto de software não requer revisão bibliográfica, a inclusão das referências não é obrigatória. No entanto, caso você deseje incluir referências relacionadas às tecnologias, padrões, ou metodologias que serão usadas no seu trabalho, relacione-as de acordo com a ABNT._

_Verifique no link abaixo como devem ser as referências no padrão ABNT:_

http://portal.pucminas.br/imagedb/documento/DOC_DSC_NOME_ARQUI20160217102425.pdf

**[1.1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._



# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






