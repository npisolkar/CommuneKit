package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

import java.util.Optional;

//Just added Repository annotation myself
//@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    //Optional<User> findByUserID(Long userID);
}
