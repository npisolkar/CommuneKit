package com.example.CommuneKitBackendTest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import com.example.CommuneKitBackendTest.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "userReviews")
public class UserReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewID;

    @Column(nullable = false)
    private long reviewerID;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private String reviewText;

    @Column(nullable = false)
    private long userID;

}

