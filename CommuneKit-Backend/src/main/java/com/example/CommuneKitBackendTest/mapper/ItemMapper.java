package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Item;

public class ItemMapper {

    // Mapping with averageRating, distance, borrowerID, and isBorrowed included
    public static ItemDto mapToItemDto(Item item, double averageRating, double distance) {
        return new ItemDto(
                item.getItemID(),
                item.getItemName(),
                item.getItemDescription(),
                item.getItemCategory(),
                item.getUserID(),
                item.getPicture(),
                item.getVisible(),
                averageRating,
                distance
        );
    }

    // Basic mapping without averageRating or distance
    public static ItemDto mapToItemDto(Item item) {
        return new ItemDto(
                item.getItemID(),
                item.getItemName(),
                item.getItemDescription(),
                item.getItemCategory(),
                item.getUserID(),
                item.getPicture(),
                item.getVisible()
        );
    }

    // Mapping from ItemDto to Item, including borrowerID and isBorrowed
    public static Item mapToItem(ItemDto itemDto) {
        Item item = new Item();
        item.setItemID(itemDto.getItemID());
        item.setItemName(itemDto.getItemName());
        item.setItemDescription(itemDto.getItemDescription());
        item.setItemCategory(itemDto.getItemCategory());
        item.setUserID(itemDto.getUserID());
        item.setPicture(itemDto.getPicture());
        item.setVisible(itemDto.getVisible());
        return item;
    }


}
