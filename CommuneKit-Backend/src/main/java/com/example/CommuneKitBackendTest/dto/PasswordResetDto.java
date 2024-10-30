package com.example.CommuneKitBackendTest.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetDto {
    private String email;
    private String currentPassword;
    private String newPassword;
}
