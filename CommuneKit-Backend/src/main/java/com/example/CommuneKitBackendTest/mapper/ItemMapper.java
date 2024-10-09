package com.example.CommuneKitBackendTest.mapper;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Item;

public class ItemMapper {
    public static ItemDto mapToItemDto(Item item) {
        return new ItemDto(
                item.getItemID(),
                item.getItemName(),
                item.getItemDescription(),
                item.getItemCategory()
        );
    }

    public static Item mapToItem(ItemDto itemDto) {
        return new Item(
                itemDto.getItemID(),
                itemDto.getItemName(),
                itemDto.getItemDescription(),
                itemDto.getItemCategory()
        );
    }
}
