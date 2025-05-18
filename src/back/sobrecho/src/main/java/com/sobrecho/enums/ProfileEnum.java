package com.sobrecho.enums;

import java.util.Objects;

public enum ProfileEnum {

    ADMIN(1, "ROLE_ADMIN"),
    USER(2, "ROLE_USER");

    ProfileEnum(int i, String string) {
    }

    public static ProfileEnum getADMIN() {
        return ADMIN;
    }

    public static ProfileEnum getUSER() {
        return USER;
    }

    private Integer code;
    private String description;

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