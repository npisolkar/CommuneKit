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
}
