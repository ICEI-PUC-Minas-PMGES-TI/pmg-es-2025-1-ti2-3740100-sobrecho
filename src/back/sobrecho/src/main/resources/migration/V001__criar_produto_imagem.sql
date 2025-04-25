CREATE TABLE produto (
    id_produto BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome_produto VARCHAR(255),
    quantidade INT CHECK (quantidade >= 1 AND quantidade <= 99),
    preco DOUBLE,
    tamanho VARCHAR(5),
    cor VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE imagem (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome_imagem VARCHAR(255) NOT NULL,
    id_produto BIGINT NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;