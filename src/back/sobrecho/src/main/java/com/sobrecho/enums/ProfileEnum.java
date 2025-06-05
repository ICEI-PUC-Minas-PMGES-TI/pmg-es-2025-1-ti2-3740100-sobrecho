package com.sobrecho.enums;

import java.util.Objects;

public enum ProfileEnum {

    ADMIN(1, "ROLE_ADMIN"),
    USER(2, "ROLE_USER"),
    SELLER(3, "ROLE_SELLER");

    private Integer code;
    private String description;

    ProfileEnum(Integer code, String description) {
        this.code = code;
        this.description = description;
    }

    public static ProfileEnum getADMIN() {
        return ADMIN;
    }

    public static ProfileEnum getUSER() {
        return USER;
    }

    public static ProfileEnum getSELLER() {
        return SELLER;
    }

    public static ProfileEnum toEnum(Integer code) {
        if (Objects.isNull(code))
            return null;

        for (ProfileEnum x : ProfileEnum.values()) {
            if (code.equals(x.getCode()))
                return x;
        }

        throw new IllegalArgumentException("Invalid code: " + code);
    }

    public Integer getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

}