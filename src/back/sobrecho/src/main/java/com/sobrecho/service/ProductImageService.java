package com.sobrecho.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;
import com.sobrecho.model.Product;
import com.sobrecho.model.ProductImage;

import jakarta.transaction.Transactional;

import com.sobrecho.dao.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductImageService {
    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    @Lazy
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
    public ProductImage uploadProductImage(MultipartFile file, Product product) throws IOException {
        Storage storage = StorageClient.getInstance().bucket("sobrecho").getStorage();

        String fileName = "product-images/" + product.getId() + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        BlobId blobId = BlobId.of("sobrecho", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(file.getContentType())
                .build();

        Blob blob = storage.create(blobInfo, file.getBytes());
        String imageUrl = blob.getMediaLink();

        ProductImage productImage = new ProductImage();
        productImage.setUrl(imageUrl);
        productImage.setProduct(product);
        productImageRepository.save(productImage);

        return productImage;
    }

}