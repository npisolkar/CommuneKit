package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.BasicUserDto;
import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.dto.PasswordResetDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(long id);

    List<UserDto> getAllUsers();

    BasicUserDto getBasicUserInfoById(long userId);

    void updateUserImage(Long userID, Long imageId);
/*
    MultipartFile getUserImageById(long userID);
*/

    UserDto updateUser(Long userID, UserDto updatedUser);

    void deleteUser(Long userID);

    UserDto loginUser(UserDto userDto);

    void banUser(Long userId);

    void unbanUser(Long userId);

    boolean resetPassword(PasswordResetDto passwordResetDto);

    List<UserDto> getBannedUsers();
}
