package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.ReviewDto;
import com.example.CommuneKitBackendTest.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ReviewController {
    private ReviewService reviewService;

    @PostMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto) {
        ReviewDto savedReview = reviewService.createReview(reviewDto);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<ReviewDto>> getReviewsByItem(@PathVariable("id") Long itemID) {
        List<ReviewDto> reviews = reviewService.getReviewsByItemId(itemID);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/rating/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<Double> getRating(@PathVariable("id") Long itemID) {
        Double rating = reviewService.getRatingByItemId(itemID);
        return ResponseEntity.ok(rating);
    }

    @GetMapping("/rating/{itemId}/{userId}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<Double> getRatingBbyUser(@PathVariable("itemId") Long itemId, @PathVariable("userId") Long userId) {
        Double rating = reviewService.getRatingByUser(itemId, userId);
        return ResponseEntity.ok(rating);
    }
}

