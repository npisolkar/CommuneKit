package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
