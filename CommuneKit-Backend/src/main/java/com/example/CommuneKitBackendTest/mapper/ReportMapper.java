package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.ReportDto;
import com.example.CommuneKitBackendTest.entity.Report;

public class ReportMapper {
    public static ReportDto mapToReportDto(Report report) {
        return new ReportDto(
                report.getReportID(),
                report.getReportingUserID(),
                report.getReportedUserID(),
                report.getReason(),
                report.getStatus()
        );
    }

    public static Report mapToReport(ReportDto reportDto) {
        return new Report(
                reportDto.getReportID(),
                reportDto.getReportingUserID(),
                reportDto.getReportedUserID(),
                reportDto.getReason(),
                reportDto.getStatus()
        );
    }
}
