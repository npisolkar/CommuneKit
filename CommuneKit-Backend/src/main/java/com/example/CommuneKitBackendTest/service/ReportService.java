package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.ReportDto;
import com.example.CommuneKitBackendTest.entity.Report;

import java.util.List;

public interface ReportService {
    ReportDto createReport(ReportDto reportDto);

    ReportDto getReportById(Long reportID);

    List<ReportDto> getAllReports();

    List<ReportDto> getAllPending();

    ReportDto updateReport(Long reportID, ReportDto updatedReport);

    void deleteReport(Long reportID);


}
