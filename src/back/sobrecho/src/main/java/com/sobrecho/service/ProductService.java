package com.sobrecho.service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobrecho.dao.ProductRepository;
import com.sobrecho.model.Product;
import com.sobrecho.model.User;

import jakarta.transaction.Transactional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    public Product findById(Long id) {
        Optional<Product> product = this.productRepository.findById(id);
        return product.orElseThrow(() -> new RuntimeException("Produto de Id: " + id + "não encontrado."));
    }

    public List<Product> findAllByUserId(Long userId) {
        return this.productRepository.findByUser_Id(userId);
    }

    @Transactional
    public Product create(Product obj) {
        User user = this.userService.findById(obj.getUser().getId());
        obj.setId(null);
        obj.setUser(user);
        obj = this.productRepository.save(obj);
        return obj;
    }

    @Transactional
    public Product update(Product obj) {
        Product newObj = this.findById(obj.getId());
        newObj.setDescription(obj.getDescription());
        newObj.setName(obj.getName());
        newObj.setDescription(obj.getDescription());
        newObj.setPrice(obj.getPrice());
        newObj.setName(obj.getName());
        return this.productRepository.save(newObj);
    }

    public void delete(Long id) {
        findById(id);
        try {
            this.productRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir pois há entidades relacionadas");
        }
    }
}