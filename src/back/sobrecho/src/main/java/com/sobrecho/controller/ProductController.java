package com.sobrecho.controller;

import com.sobrecho.dao.ProductRepository;
import com.sobrecho.model.Product;
import com.sobrecho.model.User;
import com.sobrecho.service.ProductService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@Validated
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public List<Product> listProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findProductById(@PathVariable Long id) {
        Product obj = this.productService.findById(id);
        return  ResponseEntity.ok().body(obj);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> create(
            @RequestParam("name") @NotBlank String name,
            @RequestParam("description") @NotBlank String description,
            @RequestParam("price") @Positive double price,
            @RequestParam(value = "size") String size,
            @RequestParam(value = "category") String category,
            @RequestParam(value = "images", required = false) MultipartFile[] images) {
        try {
            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            product.setSize(size);
            product.setCategory(category);

            Product savedProduct = productService.create(product, images);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(savedProduct.getId())
                    .toUri();
            return ResponseEntity.created(uri).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@RequestBody Product obj, @PathVariable Long id) {
        obj.setId(id);
        this.productService.update(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/findById/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        Product obj = this.productService.findById(id);
        return ResponseEntity.ok().body(obj);
    }
    
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<Product>> findByStore(@PathVariable Long storeId) {
        List<Product> products = this.productService.findAllByStoreId(storeId);
        return ResponseEntity.ok().body(products);
    }
}