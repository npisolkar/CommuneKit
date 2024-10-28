package com.example.CommuneKitBackendTest.dto;

import com.example.CommuneKitBackendTest.entity.Item;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long userId;
    private String userName;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String phone;
    private String address;
    private String bio;
    private boolean isBanned;
    private String role;
    private Long profilePicture;
    private Double latitude;
    private Double longitude;

}
