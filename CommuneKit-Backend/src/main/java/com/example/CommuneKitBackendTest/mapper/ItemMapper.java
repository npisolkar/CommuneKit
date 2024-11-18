package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Item;

public class ItemMapper {

    // Mapping with averageRating and distance included
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
        return mapToItemDto(item, 0.0, 0.0); // Default averageRating and distance
    }

    public static Item mapToItem(ItemDto itemDto) {
        return new Item(
                itemDto.getItemID(),
                itemDto.getItemName(),
                itemDto.getItemDescription(),
                itemDto.getItemCategory(),
                itemDto.getUserID(),
                itemDto.getPicture(),
                itemDto.getVisible()
        );
    }
}
