package com.example.CommuneKitBackendTest.dto;


import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestDateDto {
    private Long requestId;
    private Long borrowingUserId;
    private Long lendingUserId;
    private Long itemId;
    private String startDate;
    private String endDate;
    private Boolean isApproved;
    private String message;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
