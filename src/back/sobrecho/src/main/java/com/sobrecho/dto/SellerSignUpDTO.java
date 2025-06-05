package com.sobrecho.dto;

public class SellerSignUpDTO {
    private String name;
    private String email;
    private String birthdate;
    private String phone;
    private String password;
    private String document;
    private StoreDTO store;

    // Getters e setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getBirthdate() { return birthdate; }
    public void setBirthdate(String birthdate) { this.birthdate = birthdate; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getDocument() { return document; }
    public void setDocument(String document) { this.document = document; }

    public StoreDTO getStore() { return store; }
    public void setStore(StoreDTO store) { this.store = store; }

    // Classe interna para os dados da loja
    public static class StoreDTO {
        private String name;
        private String description;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}