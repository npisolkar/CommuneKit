package com.example.CommuneKitBackendTest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestID;

    @Column(name = "requester_id", nullable = false)
    private Long requesterID;

    @Column(name = "item_id", nullable = false)
    private Long itemID;

    @Column(name = "start_year", nullable = false)
    private int startYear;

    @Column(name = "start_month", nullable = false)
    private int startMonth;

    @Column(name = "start_date", nullable = false)
    private int startDate;

    @Column(name = "end_year", nullable = false)
    private int endYear;

    @Column(name = "end_month", nullable = false)
    private int endMonth;

    @Column(name = "end_date", nullable = false)
    private int endDate;

    @Column(name = "approved", nullable = false)
    private boolean approved;

    @Column(name = "returned", nullable = false)
    private boolean returned;




}
