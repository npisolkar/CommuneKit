package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.MessageDto;
import com.example.CommuneKitBackendTest.entity.Message;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.mapper.MessageMapper;
import com.example.CommuneKitBackendTest.repository.MessageRepository;
import com.example.CommuneKitBackendTest.service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService {

    private MessageRepository messageRepository;

    @Override
    public MessageDto createMessage(MessageDto messageDto) {
        Message message = MessageMapper.mapToMessage(messageDto);
        Message savedMessage = messageRepository.save(message);
        return MessageMapper.mapToMessageDto(savedMessage);
    }

    @Override
    public MessageDto getMessageById(Long messageID) {
        Message message = messageRepository.findById(messageID).orElseThrow(() ->
                new ResourceNotFoundException("Message not found with given ID: " + messageID));

        return MessageMapper.mapToMessageDto(message);
    }
}
