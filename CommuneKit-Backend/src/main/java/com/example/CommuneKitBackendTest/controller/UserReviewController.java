package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.UserReviewDto;
import com.example.CommuneKitBackendTest.service.UserReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/user-reviews")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserReviewController {
    private UserReviewService reviewService;

    @PostMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<UserReviewDto> createReview(@RequestBody UserReviewDto reviewDto) {
        UserReviewDto savedReview = reviewService.createReview(reviewDto);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<UserReviewDto>> getReviewsByUser(@PathVariable("id") Long userID) {
        List<UserReviewDto> reviews = reviewService.getReviewsByUserId(userID);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/rating/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<Double> getRating(@PathVariable("id") Long userID) {
        Double rating = reviewService.getRatingByUserId(userID);
        return ResponseEntity.ok(rating);
    }


}

