package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE (m.senderID = :user1 AND m.receiverID = :user2) OR (m.senderID = :user2 AND m.receiverID = :user1) ORDER BY m.timestamp ASC")
    List<Message> findConversationBetweenUsers(@Param("user1") long user1, @Param("user2") long user2);

}
