package com.sobrecho.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sobrecho.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
