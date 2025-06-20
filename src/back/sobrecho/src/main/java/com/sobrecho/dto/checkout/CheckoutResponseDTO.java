package com.sobrecho.dto.checkout;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CheckoutResponseDTO {
    @JsonProperty("id")
    private String id; 
    @JsonProperty("checkout")
    private CheckoutRequestDTO checkout; 

    @JsonProperty("status")
    private String status;

    public CheckoutResponseDTO(String id, CheckoutRequestDTO checkout, String status) {
        this.id = id;
        this.checkout = checkout;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CheckoutRequestDTO getCheckout() {
        return checkout;
    }

    public void setCheckout(CheckoutRequestDTO checkout) {
        this.checkout = checkout;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}