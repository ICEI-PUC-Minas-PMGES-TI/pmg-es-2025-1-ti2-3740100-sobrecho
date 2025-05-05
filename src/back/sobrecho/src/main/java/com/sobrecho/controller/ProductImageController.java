package com.sobrecho.controller;

import com.sobrecho.dao.ProductRepository;
import com.sobrecho.model.Product;
import com.sobrecho.model.ProductImage;
import com.sobrecho.model.User;
import com.sobrecho.service.ProductImageService;
import com.sobrecho.service.ProductService;

import jakarta.validation.Valid;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sobrecho.dao.ProductImageRepository;


@RestController
@RequestMapping("/product-image")
public class ProductImageController {

    @Autowired
    ProductImageRepository productImageRepository;

    @Autowired
    private ProductImageService productImageService;

    @GetMapping("/product/{id}")
    public ResponseEntity<List<ProductImage>> findAllProductById(@PathVariable Long id) {
        List<ProductImage> objs = this.productImageService.findAllByProductId(id);
        return  ResponseEntity.ok().body(objs);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> create(@Valid @RequestBody ProductImage obj) {
        this.productImageService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(obj.getId())
            .toUri();
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productImageService.delete(id);
        return ResponseEntity.noContent().build();
    }
}