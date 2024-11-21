package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(ReviewDto reviewDto);

    List<ReviewDto> getReviewsByItemId(Long itemId);

    double getRatingByItemId(Long itemId);

    double getRatingByUser(Long itemId, Long userId);
}
