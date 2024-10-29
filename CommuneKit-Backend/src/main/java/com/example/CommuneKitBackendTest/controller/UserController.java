package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.BasicUserDto;
import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.service.UserService;
import com.example.CommuneKitBackendTest.dto.PasswordResetDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.web.bind.annotation.*;
import java.lang.Exception;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserController {
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody UserDto userDto) {
        UserDto user = userService.loginUser(userDto);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto savedUser;
        try {
            savedUser = userService.createUser(userDto);
            if (savedUser == null) {
                System.out.println("savedUser is null when attempting creation");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") long UserID) {
        UserDto userDto = userService.getUserById(UserID);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<BasicUserDto> getUserInfoById(@PathVariable("id") long userId) {
        BasicUserDto basicUserDto = userService.getBasicUserInfoById(userId);
        return ResponseEntity.ok(basicUserDto);
    }


    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userID, @RequestBody UserDto updatedUser) {
        UserDto userDto = userService.updateUser(userID, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") long UserID) {
        userService.deleteUser(UserID);
        return ResponseEntity.ok("User successfully deleted");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetDto passwordResetDto) {
        boolean isReset = userService.resetPassword(passwordResetDto);

        if (isReset) {
            return ResponseEntity.ok("Password successfully reset.");
        } else {
            return new ResponseEntity<>("Password reset failed. Invalid credentials.", HttpStatus.UNAUTHORIZED);
        }
    }

}

