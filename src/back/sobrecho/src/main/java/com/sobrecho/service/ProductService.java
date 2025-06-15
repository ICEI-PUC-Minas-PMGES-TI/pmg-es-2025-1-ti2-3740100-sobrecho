package com.sobrecho.service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sobrecho.dao.ProductRepository;
import com.sobrecho.model.Product;
import com.sobrecho.model.ProductImage;
import com.sobrecho.model.User;
import com.sobrecho.security.UserSpringSecurity;
import com.sobrecho.service.exceptions.AuthorizationException;

import jakarta.transaction.Transactional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;
   
    @Autowired
    private ProductImageService productImageService;
    
    public Product findById(Long id) {
        Optional<Product> product = this.productRepository.findById(id);
        return product.orElseThrow(() -> new RuntimeException("Produto de Id: " + id + "não encontrado."));
    }

    public List<Product> findAllByUserId(Long userId) {
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if (Objects.isNull(userSpringSecurity))
            throw new AuthorizationException("Acesso negado!");

        return this.productRepository.findByUser_Id(userSpringSecurity.getId());
    }

    @Transactional
    public Product create(Product obj, MultipartFile[] images) throws IOException {
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if (Objects.isNull(userSpringSecurity)) {
            throw new AuthorizationException("Acesso negado!");
        }
        User user = this.userService.findById(userSpringSecurity.getId());
        obj.setId(null);
        obj.setUser(user);
        obj = this.productRepository.save(obj);

        List<ProductImage> productImages = new ArrayList<>();
        if (images != null && images.length > 0) {
            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    ProductImage productImage = productImageService.uploadProductImage(image, obj);
                    productImages.add(productImage);
                }
            }
            obj.setImages(productImages); 
            obj = this.productRepository.save(obj); 
        }

        System.out.println(obj.toString());
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

    private Boolean userHasProduct(UserSpringSecurity userSpringSecurity, Product product) {
        return product.getUser().getId().equals(userSpringSecurity.getId());
    }
}