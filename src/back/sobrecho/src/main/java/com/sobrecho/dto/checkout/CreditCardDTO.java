package com.sobrecho.dto.checkout;

public class CreditCardDTO {
 private String number;
 private String holder;
 private String expiration;
 private String cvv;
 private String cpf;
 
public String getNumber() {
	return number;
}
public void setNumber(String number) {
	this.number = number;
}
public String getHolder() {
	return holder;
}
public void setHolder(String holder) {
	this.holder = holder;
}
public String getExpiration() {
	return expiration;
}
public void setExpiration(String expiration) {
	this.expiration = expiration;
}
public String getCvv() {
	return cvv;
}
public void setCvv(String cvv) {
	this.cvv = cvv;
}
public String getCpf() {
	return cpf;
}
public void setCpf(String cpf) {
	this.cpf = cpf;
}


}
