package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface RequestRepository extends JpaRepository<Request, Long> {

    @Query("SELECT r FROM Request r WHERE r.borrowingUserId = :userId AND r.isApproved = true")
    List<Request> findBorrowedItemsByUserId(Long userId);

    @Query("SELECT r FROM Request r WHERE r.lendingUserId = :userId AND r.isApproved = true")
    List<Request> findLentItemsByUserId(Long userId);
}
