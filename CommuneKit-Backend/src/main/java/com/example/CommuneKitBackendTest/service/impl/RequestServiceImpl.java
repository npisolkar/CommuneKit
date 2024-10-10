package com.example.CommuneKitBackendTest.service.impl;


import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.entity.Request;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.mapper.RequestMapper;
import com.example.CommuneKitBackendTest.repository.RequestRepository;
import com.example.CommuneKitBackendTest.service.RequestService;
import lombok.AllArgsConstructor;
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
    public RequestDto getRequestById(Long requestID) {
        Request request = requestRepository.findById(requestID).orElseThrow(() -> new ResourceNotFoundException("Request with given id not found: " + requestID));
        return RequestMapper.mapToRequestDto(request);
    }

    @Override
    public List<RequestDto> getAllRequests() {
        List<Request> requests = requestRepository.findAll();
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public RequestDto approveRequest(Long requestID) {
        Request request = requestRepository.findById(requestID).orElseThrow(() -> new ResourceNotFoundException("Request with given id not found: " + requestID));
        request.setApproved(true);
        Request updatedRequest = requestRepository.save(request);

        return RequestMapper.mapToRequestDto(updatedRequest);
    }
    @Override
    public RequestDto returnRequest(Long requestID) {
        Request request = requestRepository.findById(requestID).orElseThrow(() -> new ResourceNotFoundException("Request with given id not found: " + requestID));
        request.setReturned(true);
        Request updatedRequest = requestRepository.save(request);

        return RequestMapper.mapToRequestDto(updatedRequest);
    }


    @Override
    public void deleteRequest(Long requestID) {
        Request request = requestRepository.findById(requestID).orElseThrow(() -> new ResourceNotFoundException("Request with given id not found: " + requestID));
        requestRepository.deleteById(requestID);
    }
}
