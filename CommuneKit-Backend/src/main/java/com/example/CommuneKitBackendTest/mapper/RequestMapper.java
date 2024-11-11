package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.RequestDateDto;
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
                request.getIsApproved(),
                request.getMessage(),
                request.getCreatedAt(),
                request.getUpdatedAt()
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
                requestDto.getIsApproved(),
                requestDto.getMessage(),
                requestDto.getCreatedAt(),
                requestDto.getUpdatedAt()
        );
    }

    public static Request mapDateToRequest(RequestDateDto requestDateDto) {
        String[] start = requestDateDto.getStartDate().split("-");
        String[] end = requestDateDto.getEndDate().split("-");
        return new Request(
                requestDateDto.getRequestId(),
                requestDateDto.getBorrowingUserId(),
                requestDateDto.getLendingUserId(),
                requestDateDto.getItemId(),
                Integer.parseInt(start[0]),
                Integer.parseInt(start[1]),
                Integer.parseInt(start[2]),
                Integer.parseInt(end[0]),
                Integer.parseInt(end[1]),
                Integer.parseInt(end[2]),
                requestDateDto.getIsApproved(),
                requestDateDto.getMessage(),
                requestDateDto.getCreatedAt(),
                requestDateDto.getUpdatedAt()
        );
    }


}
