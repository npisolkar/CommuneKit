package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Item;

public class ItemMapper {
    public static ItemDto mapToItemDto(Item item, double score) {
        return new ItemDto(
                item.getItemID(),
                item.getItemName(),
                item.getItemDescription(),
                item.getItemCategory(),
                item.getUserID(),
                score
        );
    }

    public static ItemDto mapToItemDto(Item item) {
        return mapToItemDto(item, 0.0);
    }

    public static Item mapToItem(ItemDto itemDto) {
        return new Item(
                itemDto.getItemID(),
                itemDto.getItemName(),
                itemDto.getItemDescription(),
                itemDto.getItemCategory(),
                itemDto.getUserID()
        );
    }
}
