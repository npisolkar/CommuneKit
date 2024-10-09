package com.example.CommuneKitBackendTest.dto;

import com.example.CommuneKitBackendTest.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RequestResponse {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;

    private int userId;
    private String username;
    private String password;
    private String email;
    //private String phone;
    private String firstName;
    private String lastName;
    private String address;
    private String bio;
    private boolean isBanned;
    //private boolean isAdmin;
    private String role;
    //private boolean isOwner;

    private User user;
    private List<User> userList;
}
