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
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long itemID;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private String itemDescription;

    @Column(nullable = false)
    private String itemCategory;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private User user;
}
