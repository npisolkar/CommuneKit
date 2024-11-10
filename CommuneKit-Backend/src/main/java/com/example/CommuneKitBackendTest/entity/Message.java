package com.example.CommuneKitBackendTest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long messageID;

    @Column(nullable = false)
    private long senderID;

    @Column(nullable = false)
    private long receiverID;

    @Column(nullable = false)
    private String message;

    @CreationTimestamp
    @Column(name = "timestamp")
    private LocalDateTime timestamp;
}
