package com.sobrecho.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobrecho.dao.ProductImageRepository;
import com.sobrecho.model.ProductImage;

import jakarta.transaction.Transactional;

import com.sobrecho.model.Product;

@Service
public class ProductImageService {
    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductService productService;

    public ProductImage findById(Long id) {
        Optional<ProductImage> productImage = this.productImageRepository.findById(id);
        return productImage.orElseThrow(() -> new RuntimeException("Imagem de Produto de Id: " + id + "não encontrado."));
    }

    public List<ProductImage> findAllByProductId(Long productId) {
        return this.productImageRepository.findByProduct_Id(productId);
    }

    @Transactional
    public ProductImage create(ProductImage obj) {
        Product product = this.productService.findById(obj.getProduct().getId());
        obj.setId(null);
        obj.setProduct(product);
        obj = this.productImageRepository.save(obj);
        return obj;
    }

    public void delete(Long id) {
        findById(id);
        try {
            this.productImageRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir pois há entidades relacionadas");
        }
    }

    /*
     * @TODO
     * Implementar salvamento das imagens do produto na nuvem (firebase) e atualizar o service para suportar essa funcionalidade.
     */
}