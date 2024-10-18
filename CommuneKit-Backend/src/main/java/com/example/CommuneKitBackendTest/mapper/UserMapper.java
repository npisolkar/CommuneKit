package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.BasicUserDto;
import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getUserID(),
                user.getUserName(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getBio(),
                user.isBanned(),
                user.getRole(),
                user.getItems()
        );
    }

    public static User mapToUser(UserDto userDto) {
        return new User(
                userDto.getUserId(),
                userDto.getUserName(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getPassword(),
                userDto.getEmail(),
                userDto.getPhone(),
                userDto.getAddress(),
                userDto.getBio(),
                userDto.isBanned(),
                userDto.getRole(),
                userDto.getItems()
        );
    }

    public static BasicUserDto mapToBasicUserDto(User user) {
        return new BasicUserDto(
                user.getUserID(),
                user.getUserName(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getBio(),
                user.isBanned(),
                user.getRole()
        );
    }

}
