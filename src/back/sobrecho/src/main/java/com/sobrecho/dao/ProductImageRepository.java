package com.sobrecho.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sobrecho.model.ProductImage;

@Repository
public interface ProductImageRepository  extends JpaRepository<ProductImage, Long>{
    List<ProductImage> findByProduct_Id(Long id);
}
