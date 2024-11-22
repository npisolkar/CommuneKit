package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.RequestDateDto;
import com.example.CommuneKitBackendTest.dto.RequestDto;
import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Request;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.mapper.RequestMapper;
import com.example.CommuneKitBackendTest.mapper.ItemMapper;

import com.example.CommuneKitBackendTest.repository.RequestRepository;
import com.example.CommuneKitBackendTest.repository.ItemRepository;


import com.example.CommuneKitBackendTest.service.RequestService;
import lombok.AllArgsConstructor;
// import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RequestServiceImpl implements RequestService {

    private RequestRepository requestRepository;
    private ItemRepository itemRepository;


    @Override
    public RequestDto createRequest(RequestDto requestDto) {

        Request request = RequestMapper.mapToRequest(requestDto);
        Request savedRequest = requestRepository.save(request);
        return RequestMapper.mapToRequestDto(savedRequest);
    }
    @Override
    public RequestDto createDateRequest(RequestDateDto requestDateDto) {

        Request request = RequestMapper.mapDateToRequest(requestDateDto);
        Request savedRequest = requestRepository.save(request);
        if(checkOverlap(request)) {
            return null;
        }


        return RequestMapper.mapToRequestDto(savedRequest);

    }

    public RequestDto approveRequest(Long requestId) {
        Request request = requestRepository.findById(requestId).orElseThrow(() -> new ResourceNotFoundException("Request with given id not found: " + requestId));
        Request updated = requestRepository.save(request);
        if(checkOverlap(request)) {
            return null;
        }
        request.setIsApproved(true);

        return RequestMapper.mapToRequestDto(updated);

    }
    public RequestDto denyRequest(Long requestId) {
        Request request = requestRepository.findById(requestId).orElseThrow(() -> new ResourceNotFoundException("Request with given id not found: " + requestId));
        request.setIsApproved(false);
        Request updated = requestRepository.save(request);
        return RequestMapper.mapToRequestDto(updated);
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

        if(checkOverlap(request)) {
            return null;
        }
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
    public List<RequestDto> getApprovedRequestsByLender(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getLendingUserId().equals(userId)));
        requests.removeIf(request -> request.getIsApproved() == null);
        requests.removeIf(request -> request.getIsApproved() != true);
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getDeniedRequestsByLender(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getLendingUserId().equals(userId)));
        requests.removeIf(request -> request.getIsApproved() == null);
        requests.removeIf(request -> request.getIsApproved() != false);
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getPendingRequestsByLender(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getLendingUserId().equals(userId)));
        requests.removeIf(request -> request.getIsApproved() != null);
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getApprovedRequestsByBorrower(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getBorrowingUserId().equals(userId)));
        requests.removeIf(request -> request.getIsApproved() == null);
        requests.removeIf(request -> request.getIsApproved() != true);
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getDeniedRequestsByBorrower(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getBorrowingUserId().equals(userId)));
        requests.removeIf(request -> request.getIsApproved() == null);
        requests.removeIf(request -> request.getIsApproved() != false);
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getPendingRequestsByBorrower(Long userId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getBorrowingUserId().equals(userId)));
        requests.removeIf(request -> request.getIsApproved() != null);
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getApprovedRequestsByItemId(Long itemId) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(request -> !(request.getItemId().equals(itemId)));
        requests.removeIf(request -> request.getIsApproved() == null);
        requests.removeIf(request -> !request.getIsApproved());
        return requests.stream().map((request) -> RequestMapper.mapToRequestDto(request)).collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getCurrentRequestsByItemId(Long itemId) {
        List<Request> requests = requestRepository.findAll();

        // Get today's date without time
        LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);

        return requests.stream()
                .filter(request -> request.getItemId().equals(itemId))  // Match the correct item
                .filter(request -> Boolean.TRUE.equals(request.getIsApproved()))  // Only approved requests
                .filter(request -> {
                    // Construct the end date from the entity fields
                    LocalDateTime endDate = LocalDateTime.of(
                            request.getEndYear(),
                            request.getEndMonth(),
                            request.getEndDay(),
                            23, 59, 59);

                    // Return only requests where endDate is today or in the future
                    return !endDate.isBefore(today);
                })
                .sorted(Comparator.comparing(request -> LocalDateTime.of(  // Sort by start date
                        request.getStartYear(),
                        request.getStartMonth(),
                        request.getStartDay(),
                        0, 0)))  // Use the start date for sorting
                .map(RequestMapper::mapToRequestDto)  // Map to DTO
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getBorrowerBorrowingHistory(Long userId) {
        LocalDateTime today = LocalDateTime.now();

        return getApprovedRequestsByBorrower(userId).stream()
                .filter(request -> {
                    LocalDateTime endDate = LocalDateTime.of(
                            request.getEndYear(),
                            request.getEndMonth(),
                            request.getEndDay(),
                            23, 59, 59);
                    return endDate.isBefore(today);
                })
                .sorted(Comparator.comparing(request -> LocalDateTime.of(
                        request.getEndYear(),
                        request.getEndMonth(),
                        request.getEndDay(),
                        0, 0)))
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestDto> getLenderRequestHistory(Long userId) {
        LocalDateTime today = LocalDateTime.now();

        return getApprovedRequestsByLender(userId).stream()
                .filter(request -> {
                    LocalDateTime endDate = LocalDateTime.of(
                            request.getEndYear(),
                            request.getEndMonth(),
                            request.getEndDay(),
                            23, 59, 59);
                    return endDate.isBefore(today);
                })
                .sorted(Comparator.comparing(request -> LocalDateTime.of(
                        request.getEndYear(),
                        request.getEndMonth(),
                        request.getEndDay(),
                        0, 0)))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteRequest(Long requestID) {
        Request request = requestRepository.findById(requestID).orElseThrow(() -> new ResourceNotFoundException("Request with given id not found: " + requestID));
        requestRepository.deleteById(requestID);
    }

    private boolean checkOverlap(Request request){
        List<Request> requests = requestRepository.findAll();
        for (Request r:requests){
            if(r.getRequestId()!=request.getRequestId()
                    && r.getIsApproved()!=null
                    && r.getIsApproved().equals(true)
                    && request.getItemId().equals(r.getItemId())) {
                int rStartDate = r.getStartYear() * 10000 + r.getStartMonth() * 100 + r.getStartDay();
                int rEndDate = r.getEndYear() * 10000 + r.getEndMonth() * 100 + r.getEndDay();
                int reqStartDate = request.getStartYear() * 10000 + request.getStartMonth() * 100 + request.getStartDay();
                int reqEndDate = request.getEndYear() * 10000 + request.getEndMonth() * 100 + request.getEndDay();
                if (rStartDate <= reqEndDate && rEndDate >= reqStartDate) {
                    deleteRequest(request.getRequestId());
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public List<ItemDto> getBorrowedItemsByUser(Long userId) {
        LocalDateTime now = LocalDateTime.now();

        List<Request> approvedRequests = requestRepository.findAll().stream()
                .filter(request -> Objects.equals(request.getBorrowingUserId(), userId))
                .filter(request -> Boolean.TRUE.equals(request.getIsApproved()))
                .filter(request -> {
                    LocalDateTime endDate = LocalDateTime.of(
                            request.getEndYear(),
                            request.getEndMonth(),
                            request.getEndDay(),
                            23, 59, 59);
                    LocalDateTime startDate = LocalDateTime.of(
                            request.getStartYear(),
                            request.getEndMonth(),
                            request.getStartDay(),
                            0, 0, 0);
                    return endDate.isAfter(now) && startDate.isBefore(now);
                })
                .collect(Collectors.toList());

        return approvedRequests.stream()
                .map(request -> itemRepository.findById(request.getItemId())
                        .map(item -> new ItemDto(
                                item.getItemID(),
                                item.getItemName(),
                                item.getItemDescription(),
                                item.getItemCategory(),
                                item.getUserID(),
                                item.getPicture(),
                                item.getVisible()))
                        .orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> getLentItemsByUser(Long userId) {
        LocalDateTime now = LocalDateTime.now();

        List<Request> approvedRequests = requestRepository.findAll().stream()
                .filter(request -> Objects.equals(request.getLendingUserId(), userId))
                .filter(request -> Boolean.TRUE.equals(request.getIsApproved()))
                .filter(request -> {
                    LocalDateTime endDate = LocalDateTime.of(
                            request.getEndYear(),
                            request.getEndMonth(),
                            request.getEndDay(),
                            23, 59, 59);
                    LocalDateTime startDate = LocalDateTime.of(
                            request.getStartYear(),
                            request.getEndMonth(),
                            request.getStartDay(),
                            0, 0, 0);
                    return endDate.isAfter(now) && startDate.isBefore(now);
                })
                .collect(Collectors.toList());

        return approvedRequests.stream()
                .map(request -> itemRepository.findById(request.getItemId())
                        .map(item -> new ItemDto(
                                item.getItemID(),
                                item.getItemName(),
                                item.getItemDescription(),
                                item.getItemCategory(),
                                item.getUserID(),
                                item.getPicture(),
                                item.getVisible()))
                        .orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }


}
