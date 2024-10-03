package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.entity.User;
import com.example.CommuneKitBackendTest.mapper.UserMapper;
import com.example.CommuneKitBackendTest.repository.UserRepository;
import com.example.CommuneKitBackendTest.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }
}
