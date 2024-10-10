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
    public ResponseEntity<RequestDto> getRequestById(@PathVariable("id") Long requestID) {
        RequestDto requestDto = requestService.getRequestById(requestID);
        return ResponseEntity.ok(requestDto);
    }

    @GetMapping
    public ResponseEntity<List<RequestDto>> getAllRequests() {
        List<RequestDto> requests = requestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<RequestDto> approveRequest(@PathVariable("id") Long requestID) {
        RequestDto requestDto = requestService.approveRequest(requestID);
        return ResponseEntity.ok(requestDto);
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<RequestDto> returnRequest(@PathVariable("id") Long requestID) {
        RequestDto requestDto = requestService.returnRequest(requestID);
        return ResponseEntity.ok(requestDto);
    }




    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRequest(@PathVariable("id") Long requestID) {
        requestService.deleteRequest(requestID);
        return ResponseEntity.ok("Request deleted successfully");
    }
}
