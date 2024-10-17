package com.example.CommuneKitBackendTest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestDto {
    private Long requestId;
    private Long borrowingUserId;
    private Long lendingUserId;
    private Long itemId;
    private int startDay;
    private int startMonth;
    private int startYear;
    private int endDay;
    private int endMonth;
    private int endYear;
    private Boolean isApproved;
    private String message;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
