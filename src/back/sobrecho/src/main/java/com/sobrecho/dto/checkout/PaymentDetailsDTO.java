package com.sobrecho.dto.checkout;

public class PaymentDetailsDTO {
    private String method;
    private Double total;
    private Integer installments;
    private CardDetailsDTO card;

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
    public Integer getInstallments() { return installments; }
    public void setInstallments(Integer installments) { this.installments = installments; }
    public CardDetailsDTO getCard() { return card; }
    public void setCard(CardDetailsDTO card) { this.card = card; }
}