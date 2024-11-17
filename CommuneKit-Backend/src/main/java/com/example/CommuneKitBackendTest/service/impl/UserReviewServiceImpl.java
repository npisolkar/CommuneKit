package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.ReviewDto;
import com.example.CommuneKitBackendTest.dto.UserReviewDto;
import com.example.CommuneKitBackendTest.entity.UserReview;
import com.example.CommuneKitBackendTest.mapper.UserReviewMapper;
import com.example.CommuneKitBackendTest.repository.UserReviewRepository;
import com.example.CommuneKitBackendTest.service.UserReviewService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserReviewServiceImpl implements UserReviewService {
    private UserReviewRepository userReviewRepository;

    @Override
    public UserReviewDto createReview(UserReviewDto userReviewDto) {
        UserReview review = UserReviewMapper.mapToReview(userReviewDto);
        UserReview savedReview = userReviewRepository.save(review);
        return UserReviewMapper.mapToReviewDto(savedReview);
    }

    @Override
    public List<UserReviewDto> getReviewsByUserId(Long userId) {
        List<UserReview> reviews = userReviewRepository.findAll();
        reviews.removeIf(review -> !(review.getUserID() == (userId)));
        return reviews.stream().map((review) -> UserReviewMapper.mapToReviewDto(review)).collect(Collectors.toList());
    }

    @Override
    public double getRatingByUserId(Long userId) {
        List<UserReview> reviews = userReviewRepository.findAll();
        reviews.removeIf(review -> !(review.getUserID() == (userId)));

        int num = reviews.size();
        if (num == 0) {
            return 0.0;
        }

        int total = reviews.stream().mapToInt(UserReview::getRating).sum();
        return (double) total / num;
    }
}
