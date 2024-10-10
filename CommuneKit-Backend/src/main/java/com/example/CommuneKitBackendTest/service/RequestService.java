package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.entity.Request;

import java.util.List;

public interface RequestService {
    RequestDto createRequest(RequestDto requestDto);

    RequestDto getRequestById(Long requestID);

    List<RequestDto> getAllRequests();

    RequestDto approveRequest(Long requestID);

    RequestDto returnRequest(Long requestID);

    void deleteRequest(Long requestID);


}
