package com.example.CommuneKitBackendTest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private long messageID;
    private long senderID;
    private long receiverID;
    private String message;
    private LocalDateTime timestamp;
}
