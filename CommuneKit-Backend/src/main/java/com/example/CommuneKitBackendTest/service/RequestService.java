package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.RequestDto;

import java.util.List;

public interface RequestService {
    RequestDto createRequest(RequestDto requestDto);

    RequestDto getRequestById(Long requestId);

    List<RequestDto> getAllRequests();

    RequestDto updateRequest(Long requestId, RequestDto updatedRequest);

    List<RequestDto> getRequestsByUserId(Long userId);

    List<RequestDto> getApprovedRequestsByUserId(Long userId);
}
