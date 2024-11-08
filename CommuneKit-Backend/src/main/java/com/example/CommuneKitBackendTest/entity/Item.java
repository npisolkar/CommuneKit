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
    private Long itemID;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "item_description", nullable = false)
    private String itemDescription;

    @Column(name = "item_category", nullable = false)
    private String itemCategory;

    @Column(name = "fk_user_id", nullable = false)
    private Long userID;

    @Column(name = "visible", nullable = false)
    private Boolean visible;

    protected void onCreate() {
        this.visible = true;
    }

}
