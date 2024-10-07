package com.example.CommuneKitBackendTest.dto;

import com.example.CommuneKitBackendTest.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long userId;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private String address;
    private String bio;
    private boolean isBanned;
    private boolean isAdmin;
    private boolean isOwner;
    private ArrayList<Review> reviews;
}
