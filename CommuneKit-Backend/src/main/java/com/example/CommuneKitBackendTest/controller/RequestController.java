package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.service.RequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
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

    @GetMapping("/lender/approved/{id}")
    public ResponseEntity<List<RequestDto>> getApprovedRequestsByLender(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getApprovedRequestsByLender(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/lender/denied/{id}")
    public ResponseEntity<List<RequestDto>> getDeniedRequestsByLender(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getDeniedRequestsByLender(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/lender/pending/{id}")
    public ResponseEntity<List<RequestDto>> getPendingRequestsByLender(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getPendingRequestsByLender(userId);
        return ResponseEntity.ok(requests);
    }


    @GetMapping("/borrower/approved/{id}")
    public ResponseEntity<List<RequestDto>> getApprovedRequestsByBorrower(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getApprovedRequestsByBorrower(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/borrower/denied/{id}")
    public ResponseEntity<List<RequestDto>> getDeniedRequestsByBorrower(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getDeniedRequestsByBorrower(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/borrower/pending/{id}")
    public ResponseEntity<List<RequestDto>> getPendingRequestsByBorrower(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getPendingRequestsByBorrower(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/approved-by-Id/{itemId}")
    public ResponseEntity<List<RequestDto>> getApprovedRequestsById(@PathVariable Long itemId) {
        List<RequestDto> requests = requestService.getApprovedRequestsByItemId(itemId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/current/{itemId}")
    public ResponseEntity<List<RequestDto>> getCurrentRequests(@PathVariable Long itemId) {
        List<RequestDto> requests = requestService.getCurrentRequestsByItemId(itemId);
        return ResponseEntity.ok(requests);
    }

}
