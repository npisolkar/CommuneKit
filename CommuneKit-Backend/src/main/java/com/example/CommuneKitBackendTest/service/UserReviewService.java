package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.UserReviewDto;

import java.util.List;

public interface UserReviewService {
    UserReviewDto createReview(UserReviewDto reviewDto);

    List<UserReviewDto> getReviewsByUserId(Long userId);

    double getRatingByUserId(Long userId);
}
