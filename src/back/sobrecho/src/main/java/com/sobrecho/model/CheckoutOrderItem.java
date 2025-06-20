package com.sobrecho.model;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "checkout_order_item")
public class CheckoutOrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checkout_order_id", nullable = false)
    private CheckoutOrder checkoutOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "product_name", nullable = false, length = 100)
    private String productName;
    @Column(name = "product_description", length = 255)
    private String productDescription;
    @Column(name = "product_price", nullable = false)
    private Double productPrice;
    @Column(name = "product_size", nullable = false, length = 10)
    private String productSize;
    @Column(name = "product_category", length = 50)
    private String productCategory;
    @Column(name = "product_image_url", length = 500)
    private String productImageUrl;

    public CheckoutOrderItem() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CheckoutOrder getCheckoutOrder() {
        return checkoutOrder;
    }

    public void setCheckoutOrder(CheckoutOrder checkoutOrder) {
        this.checkoutOrder = checkoutOrder;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getProductName() {
        return productName;
    }

    public void voidsetProductName(String productName) { // Corrigido para setProductName
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductSize() {
        return productSize;
    }

    public void setProductSize(String productSize) {
        this.productSize = productSize;
    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public void setProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CheckoutOrderItem that = (CheckoutOrderItem) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}