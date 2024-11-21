package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.BasicUserDto;
import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.dto.PasswordResetDto;
// import com.example.CommuneKitBackendTest.entity.Request;
import com.example.CommuneKitBackendTest.entity.User;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.mapper.UserMapper;
import com.example.CommuneKitBackendTest.repository.UserRepository;
import com.example.CommuneKitBackendTest.service.GeocodingService;
import com.example.CommuneKitBackendTest.service.RequestService;
import com.example.CommuneKitBackendTest.service.UserService;
//import com.example.CommuneKitBackendTest.repository.ItemRepository;
import com.example.CommuneKitBackendTest.service.ItemService;
//import com.example.CommuneKitBackendTest.service.impl.ItemServiceImpl;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.EntityManagerFactory;
//import jakarta.persistence.Persistence;
//import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private GeocodingService geocodingService;
    //private ItemRepository itemRepository;
    private ItemService itemService;
    private RequestService requestService;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);

        try {
            double[] coordinates = geocodingService.getCoordinates(user.getAddress());
            user.setLatitude(coordinates[0]);
            user.setLongitude(coordinates[1]);
        } catch (Exception e){
            System.out.println("Error getting coordinates from MapQuest: " + e.getMessage());
        }
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    public UserDto loginUser(UserDto userDto) {
        List<User> users = userRepository.findAll();
        User attemptingUser = UserMapper.mapToUser(userDto);
        for (User user : users) {
            if (user.getUserName().equals(attemptingUser.getUserName())
                    && user.getPassword().equals(attemptingUser.getPassword())) {
                return UserMapper.mapToUserDto(user);
            }
            if (user.getUserName().equals(attemptingUser.getUserName())) {
                return UserMapper.mapToUserDto(user);
            }
        }
        return null;
    }

    @Override
    public UserDto getUserById(long userID) {
        User user = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given ID does not exist: " + userID));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());
    }

    @Override
    public BasicUserDto getBasicUserInfoById(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User with given ID does not exist: " + userId));
        return UserMapper.mapToBasicUserDto(user);
    }

    //TODO: deletes whatever image they previously had. GENIUS.
    public void updateUserImage(Long userID, Long imageId) {
        User user = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given ID not found: " + userID));
        user.setProfilePicture( imageId );
        userRepository.save(user);
        return;
    }


    @Override
    public UserDto updateUser(Long userID, UserDto updatedUser) {
        User user = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given ID not found: " + userID));

        user.setUserName(updatedUser.getUserName());
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPassword(updatedUser.getPassword());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());
        user.setAddress(updatedUser.getAddress());
        user.setBio(updatedUser.getBio());
        //user.setProfilePicture( updatedUser.getProfilePicture() != null ? updatedUser.getProfilePicture() : user.getProfilePicture());

        User updatedUserObj = userRepository.save(user);

        return UserMapper.mapToUserDto(updatedUserObj);
    }

    @Override
    public void deleteUser(Long userID) {
        User user = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given ID not found: " + userID));
        userRepository.deleteById(userID);
    }

    @Override
    public void banUser(Long userID) {
        List<ItemDto> items = itemService.getItemsByUserId(userID);
        for(ItemDto i: items ) {
            itemService.hideItem(i.getItemID());
        }
        List<RequestDto> requests = requestService.getRequestsByUserId(userID);
        for(RequestDto r: requests ) {
            requestService.deleteRequest(r.getRequestId());
        }
        User user = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));
        user.setBanned(true);
        userRepository.save(user);

    }
    @Override
    public void unbanUser(Long userID) {
        List<ItemDto> items = itemService.getItemsByBannedUser(userID);
        for(ItemDto i: items ) {
            itemService.unhideItem(i.getItemID());
        }
        User user = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));
        user.setBanned(false);
        userRepository.save(user);
    }

    @Override
    public boolean resetPassword(PasswordResetDto passwordResetDto) {
        User user = userRepository.findByEmail(passwordResetDto.getEmail())
                .orElse(null);
        if (user != null && user.getPassword().equals(passwordResetDto.getCurrentPassword())) {
            user.setPassword(passwordResetDto.getNewPassword());
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public List<UserDto> getBannedUsers() {
        List<User> users = userRepository.findAll();
        users.removeIf(user -> !(user.isBanned()));
        return users.stream().map((user) -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());
    }

    public List<UserDto> getAdmins() {
        List<User> users = userRepository.findAll();
        users.removeIf(user -> !(user.getRole().equals("ADMIN")));
        return users.stream().map((user) -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());
    }
/*
    @Override
    public MultipartFile getUserImageById(long userID) { //no idea if this is correct

        return null;
    }
    @Override
    public UserDto updateUserImage(Long userID, MultipartFile image) {
        User user = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given ID not found: " + userID));

        if (image != null && !image.isEmpty()) {
            try {
                user.setProfilePicture(image.getBytes());
            } catch (IOException e) {
                System.out.println("IO Exception while updating user profile pic" + e.getMessage());
            }
        }

        userRepository.save(user);

        return UserMapper.mapToUserDto(user);
    }*/


}
