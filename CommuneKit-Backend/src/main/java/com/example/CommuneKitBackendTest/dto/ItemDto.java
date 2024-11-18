package com.example.CommuneKitBackendTest.dto;

import com.example.CommuneKitBackendTest.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    private Long itemID;
    private String itemName;
    private String itemDescription;
    private String itemCategory;
    private Long userID;
    private Long picture;
    private Boolean visible;
    private Double averageRating;
    private Double distance;

    public ItemDto(Long itemID, String itemName, String itemDescription, String itemCategory, Long userID) {
        this.itemID = itemID;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemCategory = itemCategory;
        this.userID = userID;
    }

    public ItemDto(Long itemID, String itemName, String itemDescription, String itemCategory, Long userID, Boolean visible) {
        this.itemID = itemID;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemCategory = itemCategory;
        this.userID = userID;
        this.visible = visible;
    }

    public ItemDto(Long itemID, String itemName, String itemDescription, String itemCategory, Long userID, Long picture, Boolean visible) {
        this.itemID = itemID;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemCategory = itemCategory;
        this.userID = userID;
        this.picture = picture;
        this.visible = visible;
    }


    public ItemDto(Long itemID, String itemName, String itemDescription, String itemCategory, Long userID, Boolean visible, Double averageRating, Double distance) {
        this.itemID = itemID;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemCategory = itemCategory;
        this.userID = userID;
        this.visible = visible;
        this.averageRating = averageRating;
        this.distance = distance;
    }
}
