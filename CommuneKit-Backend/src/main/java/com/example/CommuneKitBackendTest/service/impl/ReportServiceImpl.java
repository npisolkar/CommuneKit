package com.example.CommuneKitBackendTest.service.impl;


import com.example.CommuneKitBackendTest.dto.ReportDto;
// import com.example.CommuneKitBackendTest.entity.Item;
import com.example.CommuneKitBackendTest.entity.Report;
// import com.example.CommuneKitBackendTest.entity.Request;
import com.example.CommuneKitBackendTest.entity.Request;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.mapper.ReportMapper;
// import com.example.CommuneKitBackendTest.mapper.RequestMapper;
import com.example.CommuneKitBackendTest.mapper.RequestMapper;
import com.example.CommuneKitBackendTest.repository.ReportRepository;
import com.example.CommuneKitBackendTest.service.ReportService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService {

    private ReportRepository reportRepository;

    @Override
    public ReportDto createReport(ReportDto reportDto) {
        Report report = ReportMapper.mapToReport(reportDto);
        Report savedReport = reportRepository.save(report);

        return ReportMapper.mapToReportDto(savedReport);
    }

    @Override
    public ReportDto getReportById(Long reportID) {
        Report report = reportRepository.findById(reportID).orElseThrow(() -> new ResourceNotFoundException("Report with given id not found: " + reportID));
        return ReportMapper.mapToReportDto(report);
    }

    @Override
    public List<ReportDto> getAllReports() {
        List<Report> reports = reportRepository.findAll();
        return reports.stream().map((report) -> ReportMapper.mapToReportDto(report)).collect(Collectors.toList());
    }

    @Override
    public List<ReportDto> getAllPending() {
        List<Report> reports = reportRepository.findAll();
        reports.removeIf(report -> !report.getStatus().equals("Pending"));
        return reports.stream().map((report) -> ReportMapper.mapToReportDto(report)).collect(Collectors.toList());
    }

    @Override
    public ReportDto updateReport(Long reportID, ReportDto updatedReport) {
        Report report = reportRepository.findById(reportID).orElseThrow(() -> new ResourceNotFoundException("Report with given id not found: " + reportID));
        report.setStatus(updatedReport.getStatus());

        Report updatedReportObj = reportRepository.save(report);

        return ReportMapper.mapToReportDto(updatedReportObj);
    }



    @Override
    public void deleteReport(Long reportID) {
        reportRepository.findById(reportID).orElseThrow(() -> new ResourceNotFoundException("Report with given id not found: " + reportID));
        reportRepository.deleteById(reportID);
    }
}
