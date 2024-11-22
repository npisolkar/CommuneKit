package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.BasicUserDto;
import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.dto.PasswordResetDto;
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
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else if (!(user.getPassword()).equals(userDto.getPassword())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else if (user.isBanned()){
            return new ResponseEntity<>(HttpStatus.GONE);
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

    @PutMapping("updatePfp/{userID}/{imageID}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<String> updateUserImage(@PathVariable("userID") Long userID,
                                                  @PathVariable("imageID") Long imageID) {
        try {
            userService.updateUserImage(userID, imageID);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    @DeleteMapping("/ban/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<String> banUser(@PathVariable("id") long UserID) {
        userService.banUser(UserID);
        return ResponseEntity.ok("User successfully banned");
    }
    @DeleteMapping("/unban/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<String> unbanUser(@PathVariable("id") long UserID) {
        userService.unbanUser(UserID);
        return ResponseEntity.ok("User successfully unbanned");
    }

    @PostMapping("/reset-password")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetDto passwordResetDto) {
        boolean isReset = userService.resetPassword(passwordResetDto);

        if (isReset) {
            return ResponseEntity.ok("Password successfully reset.");
        } else {
            return new ResponseEntity<>("Password reset failed. Invalid credentials.", HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/banned")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<UserDto>> getBannedUsers() {
        List<UserDto> users = userService.getBannedUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/admins")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<UserDto>> getAdmins() {
        List<UserDto> users = userService.getAdmins();
        return ResponseEntity.ok(users);
    }

}

