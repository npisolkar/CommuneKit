package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByItemID(Long itemID);

}
