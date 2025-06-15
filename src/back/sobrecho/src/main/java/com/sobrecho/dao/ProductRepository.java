package com.sobrecho.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sobrecho.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUser_Id(Long id);
    List<Product> findAllByUser_Store_Id(Long storeId);

}
