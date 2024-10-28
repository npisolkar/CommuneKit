package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.BasicUserDto;
import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.lang.Exception;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserController {
    private UserService userService;

    @PostMapping("/login")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<UserDto> loginUser(@RequestBody UserDto userDto) {
        UserDto user = userService.loginUser(userDto);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
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
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") long UserID) {
        UserDto userDto = userService.getUserById(UserID);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
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
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userID, @RequestBody UserDto updatedUser) {
        UserDto userDto = userService.updateUser(userID, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<String> deleteUser(@PathVariable("id") long UserID) {
        userService.deleteUser(UserID);
        return ResponseEntity.ok("User successfully deleted");
    }
/*
    @PutMapping("/image/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<MultipartFile> updateUserImage(@PathVariable("id") Long userID) {
        //UserDto userDto = userService.updateUserImage(userID, image);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/image/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<UserDto> getUserImage(@PathVariable("id") Long userID, @RequestParam MultipartFile image) {
        UserDto userDto = userService.updateUserImage(userID, image);
        return ResponseEntity.ok(userDto);
    }*/
}

