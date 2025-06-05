package com.sobrecho.dto;

public class AuthResponseDTO {
    private TokensDTO tokens;
    private UserDTO user;

    public TokensDTO getTokens() {
        return tokens;
    }

    public void setTokens(TokensDTO tokens) {
        this.tokens = tokens;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public static class TokensDTO {
        private String refresh;
        private String refresh_expires_at;
        private String access;
        private String access_expires_at;

        public String getRefresh() {
            return refresh;
        }

        public void setRefresh(String refresh) {
            this.refresh = refresh;
        }

        public String getRefresh_expires_at() {
            return refresh_expires_at;
        }

        public void setRefresh_expires_at(String refresh_expires_at) {
            this.refresh_expires_at = refresh_expires_at;
        }

        public String getAccess() {
            return access;
        }

        public void setAccess(String access) {
            this.access = access;
        }

        public String getAccess_expires_at() {
            return access_expires_at;
        }

        public void setAccess_expires_at(String access_expires_at) {
            this.access_expires_at = access_expires_at;
        }
    }

    public static class UserDTO {
        private String id;
        private String name;
        private String email;
        private String role;
        private StoreDTO store;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public StoreDTO getStore() {
            return store;
        }

        public void setStore(StoreDTO store) {
            this.store = store;
        }
    }

    public static class StoreDTO {
        private String id;
        private String name;
        private String description;
        private String image;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }
    }
}