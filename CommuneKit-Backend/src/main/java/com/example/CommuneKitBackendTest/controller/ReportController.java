package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.ReportDto;
import com.example.CommuneKitBackendTest.entity.User;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.repository.UserRepository;
import com.example.CommuneKitBackendTest.service.ReportService;
import com.example.CommuneKitBackendTest.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private ReportService reportService;

    @PostMapping
    public ResponseEntity<ReportDto> createReport(@RequestBody ReportDto reportDto) {
        ReportDto savedReport = reportService.createReport(reportDto);
        return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ReportDto> getReportById(@PathVariable("id") Long reportID) {
        ReportDto reportDto = reportService.getReportById(reportID);
        return ResponseEntity.ok(reportDto);
    }

    @GetMapping
    public ResponseEntity<List<ReportDto>> getAllReports() {
        List<ReportDto> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @PutMapping("{id}")
    public ResponseEntity<ReportDto> updateReport(@PathVariable("id") Long reportID, @RequestBody ReportDto updatedReport) {
        ReportDto reportDto = reportService.updateReport(reportID, updatedReport);
        return ResponseEntity.ok(reportDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteReport(@PathVariable("id") Long reportID) {
        reportService.deleteReport(reportID);
        return ResponseEntity.ok("Report deleted successfully");
    }

}
