package com.sobrecho.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "checkout_order")
public class CheckoutOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "checkout_identifier", unique = true, nullable = false)
    private String checkoutIdentifier;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "delivery_cep", length = 8)
    private String deliveryCep;
    @Column(name = "delivery_street", length = 255)
    private String deliveryStreet;
    @Column(name = "delivery_number", length = 20)
    private String deliveryNumber;
    @Column(name = "delivery_district", length = 100)
    private String deliveryDistrict;
    @Column(name = "delivery_city", length = 100)
    private String deliveryCity;
    @Column(name = "delivery_state", length = 2)
    private String deliveryState;
    @Column(name = "delivery_complement", length = 255)
    private String deliveryComplement;

    @OneToMany(mappedBy = "checkoutOrder", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CheckoutOrderItem> items = new ArrayList<>();

    @Column(name = "payment_method", nullable = false, length = 50)
    private String paymentMethod;
    @Column(name = "total_value", nullable = false)
    private Double totalValue;
    @Column(name = "installments")
    private Integer installments;
    @Column(name = "card_number_last_digits", length = 4)
    private String cardNumberLastDigits;
    @Column(name = "card_holder_name", length = 100)
    private String cardHolderName;
    @Column(name = "cpf_holder_payment", length = 14)
    private String cpfHolderPayment;

    @CreationTimestamp
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    public CheckoutOrder() {
        this.status = "CREATED";
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCheckoutIdentifier() {
        return checkoutIdentifier;
    }

    public void setCheckoutIdentifier(String checkoutIdentifier) {
        this.checkoutIdentifier = checkoutIdentifier;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDeliveryCep() {
        return deliveryCep;
    }

    public void setDeliveryCep(String deliveryCep) {
        this.deliveryCep = deliveryCep;
    }

    public String getDeliveryStreet() {
        return deliveryStreet;
    }

    public void setDeliveryStreet(String deliveryStreet) {
        this.deliveryStreet = deliveryStreet;
    }

    public String getDeliveryNumber() {
        return deliveryNumber;
    }

    public void setDeliveryNumber(String deliveryNumber) {
        this.deliveryNumber = deliveryNumber;
    }

    public String getDeliveryDistrict() {
        return deliveryDistrict;
    }

    public void setDeliveryDistrict(String deliveryDistrict) {
        this.deliveryDistrict = deliveryDistrict;
    }

    public String getDeliveryCity() {
        return deliveryCity;
    }

    public void setDeliveryCity(String deliveryCity) {
        this.deliveryCity = deliveryCity;
    }

    public String getDeliveryState() {
        return deliveryState;
    }

    public void setDeliveryState(String deliveryState) {
        this.deliveryState = deliveryState;
    }

    public String getDeliveryComplement() {
        return deliveryComplement;
    }

    public void setDeliveryComplement(String deliveryComplement) {
        this.deliveryComplement = deliveryComplement;
    }

    public List<CheckoutOrderItem> getItems() {
        return items;
    }

    public void setItems(List<CheckoutOrderItem> items) {
        this.items = items;
    }

    public void addOrderItem(CheckoutOrderItem item) {
        this.items.add(item);
        item.setCheckoutOrder(this);
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(Double totalValue) {
        this.totalValue = totalValue;
    }

    public Integer getInstallments() {
        return installments;
    }

    public void setInstallments(Integer installments) {
        this.installments = installments;
    }

    public String getCardNumberLastDigits() {
        return cardNumberLastDigits;
    }

    public void setCardNumberLastDigits(String cardNumberLastDigits) {
        this.cardNumberLastDigits = cardNumberLastDigits;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public String getCpfHolderPayment() {
        return cpfHolderPayment;
    }

    public void setCpfHolderPayment(String cpfHolderPayment) {
        this.cpfHolderPayment = cpfHolderPayment;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CheckoutOrder that = (CheckoutOrder) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}