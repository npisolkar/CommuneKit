package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface UserReviewRepository extends JpaRepository<UserReview, Integer> {

    List<UserReview> findByUserID(Long userID);

    @Query("SELECT AVG(r.rating) FROM UserReview r WHERE r.userID = :userID")
    Double findAverageRatingByUserID(@Param("userID") Long userID);

}
