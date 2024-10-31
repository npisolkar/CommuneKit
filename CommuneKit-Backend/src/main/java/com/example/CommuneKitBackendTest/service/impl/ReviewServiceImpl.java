package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.dto.ReviewDto;
import com.example.CommuneKitBackendTest.entity.Item;
import com.example.CommuneKitBackendTest.entity.Request;
import com.example.CommuneKitBackendTest.entity.Review;
import com.example.CommuneKitBackendTest.mapper.RequestMapper;
import com.example.CommuneKitBackendTest.mapper.ReviewMapper;
import com.example.CommuneKitBackendTest.repository.ReviewRepository;
import com.example.CommuneKitBackendTest.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ItemServiceImpl itemServiceImpl;
    private ReviewRepository reviewRepository;
    @Override
    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = ReviewMapper.mapToReview(reviewDto);
        Review savedReview = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDto(savedReview);
    }

    @Override
    public List<ReviewDto> getReviewsByItemId(Long itemId) {
        List<Review> reviews = reviewRepository.findAll();
        reviews.removeIf(review -> !(review.getItemID() == (itemId)));
        return reviews.stream().map((review) -> ReviewMapper.mapToReviewDto(review)).collect(Collectors.toList());
    }

    @Override
    public double getRatingByItemId(Long itemId) {
        List<Review> reviews = reviewRepository.findAll();
        reviews.removeIf(review -> !(review.getItemID() == (itemId)));

        int num = reviews.size();
        if (num == 0) {
            return 0.0;
        }

        int total = reviews.stream().mapToInt(Review::getRating).sum();
        return (double) total / num;
    }
}
