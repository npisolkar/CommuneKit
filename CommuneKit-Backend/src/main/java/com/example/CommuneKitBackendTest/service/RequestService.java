package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.RequestDateDto;
import com.example.CommuneKitBackendTest.dto.RequestDto;

import java.util.List;

public interface RequestService {
    RequestDto createRequest(RequestDto requestDto);

    RequestDto createDateRequest(RequestDateDto requestDateDto);

    RequestDto approveRequest(Long requestId);

    RequestDto denyRequest(Long requestId);

    RequestDto getRequestById(Long requestId);

    List<RequestDto> getAllRequests();

    RequestDto updateRequest(Long requestId, RequestDto updatedRequest);

    List<RequestDto> getRequestsByUserId(Long userId);

    List<RequestDto> getApprovedRequestsByLender(Long userId);

    List<RequestDto> getDeniedRequestsByLender(Long userId);

    List<RequestDto> getPendingRequestsByLender(Long userId);

    List<RequestDto> getApprovedRequestsByBorrower(Long userId);

    List<RequestDto> getDeniedRequestsByBorrower(Long userId);

    List<RequestDto> getPendingRequestsByBorrower(Long userId);

    List<RequestDto> getApprovedRequestsByItemId(Long itemId);

    List<RequestDto> getCurrentRequestsByItemId(Long itemId);

    void deleteRequest(Long requestId);


}
