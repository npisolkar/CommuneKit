package com.example.CommuneKitBackendTest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private int reviewId;
    private int reviewerID;
    private int rating;
    private String reviewText;
    private boolean isItem;
    private int targetID;

    public ReviewDto(int reviewID) {
    }
}
