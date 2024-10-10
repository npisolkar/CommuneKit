package com.example.CommuneKitBackendTest.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestDto {
    private Long requestID;
    private Long requesterID;
    private Long itemID;
    private int startYear;
    private int startMonth;
    private int startDate;
    private int endYear;
    private int endMonth;
    private int endDate;
    private boolean approved;
    private boolean returned;
}
