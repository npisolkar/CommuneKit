package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.UserReviewDto;
import com.example.CommuneKitBackendTest.entity.UserReview;

public class UserReviewMapper {

    public static UserReviewDto mapToReviewDto(UserReview review) {
        return new UserReviewDto(
                review.getReviewID(),
                review.getReviewerID(),
                review.getRating(),
                review.getReviewText(),
                review.getUserID()
        );
    }

    public static UserReview mapToReview(UserReviewDto reviewDto) {
        return new UserReview(
                reviewDto.getReviewID(),
                reviewDto.getReviewerID(),
                reviewDto.getRating(),
                reviewDto.getReviewText(),
                reviewDto.getUserID()
        );
    }
}
