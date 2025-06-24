package com.sobrecho.dto.checkout;

public class CardDetailsDTO {
    private String number; 
    private String holder;

    public CardDetailsDTO(String number, String holder) {
        this.number = number;
        this.holder = holder;
    }
    
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }
    public String getHolder() { return holder; }
    public void setHolder(String holder) { this.holder = holder; }
}