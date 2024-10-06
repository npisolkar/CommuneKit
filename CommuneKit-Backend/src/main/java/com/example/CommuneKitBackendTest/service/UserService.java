package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(long id);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long userID, UserDto updatedUser);

    void deleteUser(Long userID);
}
