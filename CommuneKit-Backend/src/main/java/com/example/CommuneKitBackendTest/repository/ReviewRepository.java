package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByItemID(Long itemID);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.itemID = :itemID")
    Double findAverageRatingByItemID(@Param("itemID") Long itemID);

}
