package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.MessageDto;
import com.example.CommuneKitBackendTest.entity.Message;

public class MessageMapper {
    public static MessageDto mapToMessageDto(Message message) {
        return new MessageDto(
                message.getMessageID(),
                message.getSenderID(),
                message.getReceiverID(),
                message.getMessage(),
                message.getTimestamp()
        );
    }

    public static Message mapToMessage(MessageDto messageDto) {
        return new Message(
                messageDto.getMessageID(),
                messageDto.getSenderID(),
                messageDto.getReceiverID(),
                messageDto.getMessage(),
                messageDto.getTimestamp()
        );
    }
}
