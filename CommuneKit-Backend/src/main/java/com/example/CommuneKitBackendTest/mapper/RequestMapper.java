package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.entity.Request;

public class RequestMapper {
    public static RequestDto mapToRequestDto(Request request) {
        return new RequestDto(
                request.getRequestID(),
                request.getRequesterID(),
                request.getItemID(),
                request.getStartYear(),
                request.getStartMonth(),
                request.getStartDate(),
                request.getEndYear(),
                request.getEndMonth(),
                request.getEndDate(),
                request.isApproved(),
                request.isReturned()
        );
    }

    public static Request mapToRequest(RequestDto requestDto) {
        return new Request(
                requestDto.getRequestID(),
                requestDto.getRequesterID(),
                requestDto.getItemID(),
                requestDto.getStartYear(),
                requestDto.getStartMonth(),
                requestDto.getStartDate(),
                requestDto.getEndYear(),
                requestDto.getEndMonth(),
                requestDto.getEndDate(),
                requestDto.isApproved(),
                requestDto.isReturned()
        );
    }
}
