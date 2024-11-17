package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.RequestDateDto;
import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.dto.UserDto;
import com.example.CommuneKitBackendTest.service.RequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class RequestController {

    private RequestService requestService;

    @PostMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<RequestDto> createRequest(@RequestBody RequestDto requestDto) {
        RequestDto savedRequest = requestService.createRequest(requestDto);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }
    @PostMapping("/date")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<RequestDto> createDateRequest(@RequestBody RequestDateDto requestDateDto) {
        RequestDto savedRequest;
        try {
            savedRequest = requestService.createDateRequest(requestDateDto);
            if (savedRequest == null) {
                System.out.println("saved request is null when attempting creation");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("\n\nfound normalinternal server error\n\n " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PutMapping("/approve/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<RequestDto> approveRequest(@RequestBody Long requestID) {
        RequestDto savedRequest;
        try {
            savedRequest = requestService.approveRequest(requestID);
            if (savedRequest == null) {
                System.out.println("Unable to approve request");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(savedRequest, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/deny/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<RequestDto> denyRequest(@RequestBody Long requestID) {
        RequestDto savedRequest = requestService.denyRequest(requestID);
        return ResponseEntity.ok(savedRequest);
    }


    @GetMapping("{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<RequestDto> getRequestById(@PathVariable("id") Long requestId) {
        RequestDto requestDto = requestService.getRequestById(requestId);
        return ResponseEntity.ok(requestDto);
    }

    @GetMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getAllRequests() {
        List<RequestDto> requests = requestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }
    @PutMapping("{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<RequestDto> updateRequest(@PathVariable("id") Long requestId, @RequestBody RequestDto updatedRequest) {
        RequestDto savedRequest;
        try {
            savedRequest = requestService.updateRequest(requestId,updatedRequest);
            if (savedRequest == null) {
                System.out.println("unable to update request");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sent-to/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getMyRequests(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/lender/approved/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getApprovedRequestsByLender(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getApprovedRequestsByLender(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/lender/denied/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getDeniedRequestsByLender(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getDeniedRequestsByLender(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/lender/pending/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getPendingRequestsByLender(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getPendingRequestsByLender(userId);
        return ResponseEntity.ok(requests);
    }


    @GetMapping("/borrower/approved/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getApprovedRequestsByBorrower(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getApprovedRequestsByBorrower(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/borrower/denied/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getDeniedRequestsByBorrower(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getDeniedRequestsByBorrower(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/borrower/pending/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getPendingRequestsByBorrower(@PathVariable("id") Long userId) {
        List<RequestDto> requests = requestService.getPendingRequestsByBorrower(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/approved-by-Id/{itemId}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getApprovedRequestsById(@PathVariable Long itemId) {
        List<RequestDto> requests = requestService.getApprovedRequestsByItemId(itemId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/current/{itemId}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<RequestDto>> getCurrentRequests(@PathVariable Long itemId) {
        List<RequestDto> requests = requestService.getCurrentRequestsByItemId(itemId);
        return ResponseEntity.ok(requests);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<String> deleteRequest(@PathVariable("id") Long requestID) {
        requestService.deleteRequest(requestID);
        return ResponseEntity.ok("Request deleted successfully");
    }

}
