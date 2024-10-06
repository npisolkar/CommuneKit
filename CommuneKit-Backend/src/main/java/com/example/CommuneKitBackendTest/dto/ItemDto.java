package com.example.CommuneKitBackendTest.dto;

import com.example.CommuneKitBackendTest.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private long itemID;
    private String itemName;
    private String itemDescription;
    private String itemCategory;
    private User user;
}
