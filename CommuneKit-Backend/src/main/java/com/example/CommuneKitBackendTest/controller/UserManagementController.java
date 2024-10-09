package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.RequestResponse;
import com.example.CommuneKitBackendTest.entity.User;
import com.example.CommuneKitBackendTest.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserManagementController {
    @Autowired
    UserManagementService userManagementService;

    @PostMapping("/auth/register")
    public ResponseEntity<RequestResponse> register(@RequestBody RequestResponse reg) {
        return ResponseEntity.ok(userManagementService.register(reg));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<RequestResponse> login(@RequestBody RequestResponse reg) {
        return ResponseEntity.ok(userManagementService.login(reg));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<RequestResponse> refresh(@RequestBody RequestResponse refresh) {
        return ResponseEntity.ok(userManagementService.refreshToken(refresh));
    }

    @GetMapping("user/get-all-users")
    public ResponseEntity<RequestResponse> register() {
        //TODO: make this only get users with role as "ADMIN"
        // or just have this logic persist, probably fine too
        // filtering by role can happen on frontend
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }


    @GetMapping("user/get-user/{userId}")
    public ResponseEntity<RequestResponse> getUserById(@PathVariable int userId) {
        //TODO: make this only get users with role as "ADMIN"
        return ResponseEntity.ok(userManagementService.getUsersById(userId));
    }


    @GetMapping("user/update/{userId}")
    public ResponseEntity<RequestResponse> updateUser(@PathVariable int userId, @RequestBody User reg) {
        //TODO: make this only get users with role as "ADMIN"
        return ResponseEntity.ok(userManagementService.updateUser(userId, reg));
    }

    @GetMapping("user/get-profile")
    public ResponseEntity<RequestResponse> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); //will get unique identifier for authentication stuff
        RequestResponse response = userManagementService.getMyInfo(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
