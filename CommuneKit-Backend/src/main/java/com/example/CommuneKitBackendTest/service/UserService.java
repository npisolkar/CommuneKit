package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.BasicUserDto;
import com.example.CommuneKitBackendTest.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(long id);

    List<UserDto> getAllUsers();

    BasicUserDto getBasicUserInfoById(long userId);

    UserDto updateUser(Long userID, UserDto updatedUser);

    void deleteUser(Long userID);
}
