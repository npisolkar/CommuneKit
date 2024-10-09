package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.ItemDto;

import java.util.List;

public interface ItemService {
    ItemDto createItem(ItemDto itemDto);

    ItemDto getItemById(Long itemID);

    List<ItemDto> getAllItems();

    ItemDto updateItem(Long itemID, ItemDto updatedItem);

    void deleteItem(Long itemID);
}
