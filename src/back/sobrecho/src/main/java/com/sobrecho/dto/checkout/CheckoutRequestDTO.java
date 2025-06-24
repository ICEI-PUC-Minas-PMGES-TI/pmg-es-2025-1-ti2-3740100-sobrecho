package com.sobrecho.dto.checkout;

import java.util.List;

import jakarta.validation.constraints.PositiveOrZero;

public class CheckoutRequestDTO {
    private AddressDTO address;
    private List<CheckoutItemDTO> items;
    private PaymentDTO payment;
    @PositiveOrZero
    private Double total;
    
    
    
	public AddressDTO getAddress() {
		return address;
	}
	public void setAddress(AddressDTO address) {
		this.address = address;
	}
	public List<CheckoutItemDTO> getItems() {
		return items;
	}
	public void setItems(List<CheckoutItemDTO> items) {
		this.items = items;
	}
	public PaymentDTO getPayment() {
		return payment;
	}
	public void setPayment(PaymentDTO payment) {
		this.payment = payment;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	} 
    
    
}