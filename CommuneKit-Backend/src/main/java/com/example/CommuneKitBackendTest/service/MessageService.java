package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.MessageDto;

import java.util.List;

public interface MessageService {

    MessageDto createMessage(MessageDto messageDto);

    MessageDto getMessageById(Long messageID);

}
