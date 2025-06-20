package com.sobrecho.dto.checkout;

public class PaymentDTO {
    private String method;
    private Integer installments;
    private CreditCardDTO card;
    
    
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public Integer getInstallments() {
		return installments;
	}
	public void setInstallments(Integer installments) {
		this.installments = installments;
	}
	public CreditCardDTO getCard() {
		return card;
	}
	public void setCard(CreditCardDTO card) {
		this.card = card;
	}


}