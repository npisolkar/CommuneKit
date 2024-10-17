package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.ReviewDto;
import com.example.CommuneKitBackendTest.entity.Review;
import com.example.CommuneKitBackendTest.mapper.ReviewMapper;
import com.example.CommuneKitBackendTest.repository.ReviewRepository;
import com.example.CommuneKitBackendTest.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private ReviewRepository reviewRepository;
    @Override
    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = ReviewMapper.mapToReview(reviewDto);
        Review savedReview = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDto(savedReview);
    }
}
