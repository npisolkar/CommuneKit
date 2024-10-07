package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getUserID(),
                user.getUserName(),
                user.getPassword(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getBio(),
                user.isBanned(),
                user.isAdmin(),
                user.isOwner(),
                user.getReviews()
        );
    }

    public static User mapToUser(UserDto userDto) {
        return new User(
                userDto.getUserId(),
                userDto.getUserName(),
                userDto.getPassword(),
                userDto.getEmail(),
                userDto.getPhone(),
                userDto.getAddress(),
                userDto.getBio(),
                userDto.isBanned(),
                userDto.isAdmin(),
                userDto.isOwner(),
                userDto.getReviews()
        );
    }
}
