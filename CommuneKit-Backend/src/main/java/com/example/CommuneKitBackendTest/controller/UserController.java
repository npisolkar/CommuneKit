package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.BasicUserDto;
import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private UserService userService;

    @PostMapping
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") long UserID) {
        UserDto userDto = userService.getUserById(UserID);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:5173")
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
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userID, @RequestBody UserDto updatedUser) {
        UserDto userDto = userService.updateUser(userID, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<String> deleteUser(@PathVariable("id") long UserID) {
        userService.deleteUser(UserID);
        return ResponseEntity.ok("User successfully deleted");
    }
}

