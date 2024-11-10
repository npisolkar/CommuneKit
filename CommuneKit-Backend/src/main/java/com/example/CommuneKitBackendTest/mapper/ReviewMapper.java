package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.ReviewDto;
import com.example.CommuneKitBackendTest.entity.Review;

public class ReviewMapper {

    public static ReviewDto mapToReviewDto(Review review) {
        return new ReviewDto(
                review.getReviewID(),
                review.getReviewerID(),
                review.getRating(),
                review.getReviewText(),
                review.getItemID()
        );
    }

    public static Review mapToReview(ReviewDto reviewDto) {
        return new Review(
                reviewDto.getReviewID(),
                reviewDto.getReviewerID(),
                reviewDto.getRating(),
                reviewDto.getReviewText(),
                reviewDto.getItemID()
        );
    }
}
