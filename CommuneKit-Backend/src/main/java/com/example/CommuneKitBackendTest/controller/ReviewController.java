package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.ReviewDto;
import com.example.CommuneKitBackendTest.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@AllArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto) {
        ReviewDto savedReview = reviewService.createReview(reviewDto);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<List<ReviewDto>> getReviewsByItem(@PathVariable("id") Long itemID) {
        List<ReviewDto> reviews = reviewService.getReviewsByItemId(itemID);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/rating/{id}")
    public ResponseEntity<Long> getRating(@PathVariable("id") Long itemID) {
        Long rating = reviewService.getRatingByItemId(itemID);
        return ResponseEntity.ok(rating);
    }


}

