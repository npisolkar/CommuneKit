package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.service.RequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private RequestService requestService;

    @PostMapping
    public ResponseEntity<RequestDto> createRequest(@RequestBody RequestDto requestDto) {
        RequestDto savedRequest = requestService.createRequest(requestDto);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<RequestDto> getRequestById(@PathVariable("id") Long requestId) {
        RequestDto requestDto = requestService.getRequestById(requestId);
        return ResponseEntity.ok(requestDto);
    }

    @GetMapping
    public ResponseEntity<List<RequestDto>> getAllRequests() {
        List<RequestDto> requests = requestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @PutMapping("{id}")
    public ResponseEntity<RequestDto> updateRequest(@PathVariable("id") Long requestId, @RequestBody RequestDto updatedRequest) {
        RequestDto requestDto = requestService.updateRequest(requestId, updatedRequest);
        return ResponseEntity.ok(requestDto);
    }

    @GetMapping("/sent-to/{id}")
    public ResponseEntity<List<RequestDto>> getMyRequests(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/approved/{id}")
    public ResponseEntity<List<RequestDto>> getApprovedRequests(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getApprovedRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }


}
