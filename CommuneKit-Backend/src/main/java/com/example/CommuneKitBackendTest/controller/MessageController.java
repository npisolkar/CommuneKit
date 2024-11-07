package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.MessageDto;
import com.example.CommuneKitBackendTest.entity.Message;
import com.example.CommuneKitBackendTest.mapper.MessageMapper;
import com.example.CommuneKitBackendTest.repository.MessageRepository;
import com.example.CommuneKitBackendTest.service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository messageRepository;
    private MessageService messageService;

    @PostMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<MessageDto> createMessage(@RequestBody MessageDto messageDto) {
        MessageDto savedMessage = messageService.createMessage(messageDto);
        return new ResponseEntity<>(savedMessage, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<MessageDto> getMessageById(@PathVariable("id") Long messageId) {
        MessageDto messageDto = messageService.getMessageById(messageId);
        return ResponseEntity.ok(messageDto);
    }

    @GetMapping("/conversation/{user1}/{user2}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<MessageDto>> getConversation(@PathVariable long user1, @PathVariable long user2) {
        List<Message> messages = messageRepository.findConversationBetweenUsers(user1, user2);
        List<MessageDto> messageDtos = messages.stream().map((message) -> MessageMapper.mapToMessageDto(message)).collect(Collectors.toList());

        return ResponseEntity.ok(messageDtos);
    }

}
