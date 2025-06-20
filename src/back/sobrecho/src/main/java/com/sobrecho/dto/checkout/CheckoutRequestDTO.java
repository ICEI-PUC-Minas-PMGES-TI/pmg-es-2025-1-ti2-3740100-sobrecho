package com.sobrecho.dto.checkout;

import java.util.List;

public class CheckoutRequestDTO {
    private AddressDTO address;
    private List<CheckoutItemDTO> items;
    private PaymentDTO payment;
    
    
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
    
    
}