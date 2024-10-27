package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(ReviewDto reviewDto);

    List<ReviewDto> getReviewsByItemId(Long itemId);

    long getRatingByItemId(Long itemId);
}
