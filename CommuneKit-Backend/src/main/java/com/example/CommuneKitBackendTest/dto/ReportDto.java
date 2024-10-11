package com.example.CommuneKitBackendTest.dto;

import com.example.CommuneKitBackendTest.entity.Report;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportDto {
    private Long reportID;
    private Long reportingUserID;
    private Long reportedUserID;
    private String reason;
    private String status;

}
