package com.example.CommuneKitBackendTest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "requests")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @Column(nullable = false)
    private Long borrowingUserId;

    @Column(nullable = false)
    private Long lendingUserId;

    @Column(nullable = false)
    private Long itemId;

    @Column(nullable = false)
    private int startDay;

    @Column(nullable = false)
    private int startMonth;

    @Column(nullable = false)
    private int startYear;

    @Column(nullable = false)
    private int endDay;

    @Column(nullable = false)
    private int endMonth;

    @Column(nullable = false)
    private int endYear;

    @Column(nullable = false)
    private Boolean isApproved;

    @Column(nullable = false)
    private String message;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
