package com.example.CommuneKitBackendTest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.CommuneKitBackendTest.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewID;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User reviewer;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private String reviewText;

    private boolean isItem;

    @Column(nullable = false)
    private int targetID;

}

