package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.entity.Request;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.mapper.RequestMapper;
import com.example.CommuneKitBackendTest.repository.RequestRepository;
import com.example.CommuneKitBackendTest.service.RequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RequestServiceImpl implements RequestService {

    private RequestRepository requestRepository;

    @Override
    public RequestDto createRequest(RequestDto requestDto) {

        Request request = RequestMapper.mapToRequest(requestDto);
        Request savedRequest = requestRepository.save(request);
        return RequestMapper.mapToRequestDto(savedRequest);
    }

    @Override
    public RequestDto getRequestById(Long requestId) {
        Request request = requestRepository.findById(requestId).orElseThrow(() -> new ResourceNotFoundException("Request with given id not found: " + requestId));
        return RequestMapper.mapToRequestDto(request);
    }

    @Override
    public List<RequestDto> getAllRequests() {
        List<Request> requests = requestRepository.findAll();
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public RequestDto updateRequest(Long requestId, RequestDto updatedRequest) {
        Request request = requestRepository.findById(requestId).orElseThrow(() -> new ResourceNotFoundException("Request with given id not found: " + requestId));
        request.setIsApproved(updatedRequest.getIsApproved());

        Request updatedRequestObj = requestRepository.save(request);

        return RequestMapper.mapToRequestDto(updatedRequestObj);

    }

    @Override
    public List<RequestDto> getRequestsByUserId(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getLendingUserId().equals(userId)));
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getApprovedRequestsByUserId(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getBorrowingUserId().equals(userId)));
        requests.removeIf(request -> request.getIsApproved() == null);
        requests.removeIf(request -> request.getIsApproved() != true);
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getDeniedRequestsByUserId(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getBorrowingUserId().equals(userId)));
        requests.removeIf(request -> request.getIsApproved() == null);
        requests.removeIf(request -> request.getIsApproved() != false);
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getPendingRequestsByUserId(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getBorrowingUserId().equals(userId)));
        requests.removeIf(request -> request.getIsApproved() != null);
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }
    
}
