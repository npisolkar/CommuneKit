package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.RequestResponse;
import com.example.CommuneKitBackendTest.entity.User;
import com.example.CommuneKitBackendTest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.RequestContextFilter;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserManagementService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RequestContextFilter requestContextFilter;

    public RequestResponse register(RequestResponse registrationRequest) {
        RequestResponse response = new RequestResponse();

        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setFirstName(registrationRequest.getFirstName());
            user.setLastName(registrationRequest.getLastName());
            user.setRole(registrationRequest.getRole());
            user.setUserID(registrationRequest.getUserId());
            user.setAddress(registrationRequest.getAddress());
            User savedUser = userRepository.save(user);
            if (savedUser.getUserID() > 0) {
                response.setUser(savedUser);
                response.setMessage("User registered successfully");
                response.setStatusCode(200);
            }

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public RequestResponse login(RequestResponse loginRequest) {
        RequestResponse response = new RequestResponse();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUserName(),
                            loginRequest.getPassword()
                    ));
            var user = userRepository.findByUsername(loginRequest.getUserName()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("User logged in successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public RequestResponse refreshToken(RequestResponse refreshRequest) {
        RequestResponse response = new RequestResponse();
        try {
            String ourName = jwtUtils.extractUsername(refreshRequest.getToken());
            User user = userRepository.findByUsername(ourName).orElseThrow(); //email/username stuff here
            if (jwtUtils.isTokenValid(refreshRequest.getToken(), user)) {
                var jwt = jwtUtils.generateToken(user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshRequest.getToken()); //COULD be getrefreshtoken instead
                response.setExpirationTime("24Hrs");
                response.setMessage("User logged in successfully");
            }
            response.setStatusCode(200); // shouldn't this reflect invalid request since not in the if statement??
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }

    }

    public RequestResponse getAllUsers() {
        RequestResponse response = new RequestResponse();

        try {
            List<User> result = userRepository.findAll();
            if (!result.isEmpty()) {
                response.setUserList(result);
                response.setStatusCode(200);
                response.setMessage("Success: all users");
            } else {
                response.setStatusCode(404);
                response.setMessage("No users found");
            }
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public RequestResponse getUsersById(Integer id) {
        RequestResponse response = new RequestResponse();
        try {
            User usersById = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            response.setUser(usersById);
            response.setStatusCode(200);
            response.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }


    public RequestResponse deleteUser(Integer userID) {
        RequestResponse response = new RequestResponse();
        try {
            Optional<User> user = userRepository.findById(userID);
            if (user.isPresent()) {
                userRepository.deleteById(userID);
                response.setStatusCode(200);
                response.setMessage("User deleted successfully");
            } else {
                response.setStatusCode(404);
                response.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred deleting user" + e.getMessage());
        }
        return response;
    }

    public RequestResponse updateUser(Integer userID, User updatedUser) {
        RequestResponse response = new RequestResponse();
        try {
            Optional<User> userop = userRepository.findById(userID);
            if (userop.isPresent()) {
                User existingUser = userop.get();
                existingUser.setFirstName(updatedUser.getFirstName());
                existingUser.setLastName(updatedUser.getLastName());
                existingUser.setRole(updatedUser.getRole());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setAddress(updatedUser.getAddress());
                existingUser.setBio(updatedUser.getBio());
                //TODO finish this part, make sure loading all fields
                // Check if password is present in the request
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                User savedUser = userRepository.save(existingUser);
                response.setUser(savedUser);
                response.setStatusCode(200);
                response.setMessage("User updated successfully");
            } else {
                response.setStatusCode(404);
                response.setMessage("User not found for update");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while updating user. " + e.getMessage());
        }
        return response;
    }

    public RequestResponse getMyInfo(String username){
        RequestResponse response = new RequestResponse();
        try {
            Optional<User> userOptional = userRepository.findByUsername(username);
            if (userOptional.isPresent()) {
                response.setUser(userOptional.get());
                response.setStatusCode(200);
                response.setMessage("successful");
            } else {
                response.setStatusCode(404);
                response.setMessage("User not found for update");
            }
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return response;
    }
    public RequestResponse getMyInfo(long userId){
        RequestResponse response = new RequestResponse();
        try {
            Optional<User> userOptional = userRepository.findByUserID(userId);
            if (userOptional.isPresent()) {
                response.setUser(userOptional.get());
                response.setStatusCode(200);
                response.setMessage("successful");
            } else {
                response.setStatusCode(404);
                response.setMessage("User not found for update");
            }
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return response;
    }

}
