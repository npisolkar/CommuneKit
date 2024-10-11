package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.entity.Request;

public class RequestMapper {
    public static RequestDto mapToRequestDto(Request request) {
        return new RequestDto(
                request.getRequestId(),
                request.getBorrowingUserId(),
                request.getLendingUserId(),
                request.getItemId(),
                request.getStartDay(),
                request.getStartMonth(),
                request.getStartYear(),
                request.getEndDay(),
                request.getEndMonth(),
                request.getEndYear(),
                request.isApproved(),
                request.getMessage()
        );
    }

    public static Request mapToRequest(RequestDto requestDto) {
        return new Request(
                requestDto.getRequestId(),
                requestDto.getBorrowingUserId(),
                requestDto.getLendingUserId(),
                requestDto.getItemId(),
                requestDto.getStartDay(),
                requestDto.getStartMonth(),
                requestDto.getStartYear(),
                requestDto.getEndDay(),
                requestDto.getEndMonth(),
                requestDto.getEndYear(),
                requestDto.isApproved(),
                requestDto.getMessage()
        );
    }
}
