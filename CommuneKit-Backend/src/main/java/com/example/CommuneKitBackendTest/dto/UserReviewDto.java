package com.example.CommuneKitBackendTest.dto;

//import com.example.CommuneKitBackendTest.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserReviewDto {
    private long reviewID;
    private long reviewerID;
    private int rating;
    private String reviewText;
    private long userID;
}
