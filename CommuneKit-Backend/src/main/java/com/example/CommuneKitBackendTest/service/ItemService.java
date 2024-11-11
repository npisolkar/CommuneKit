package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.ItemDto;

import java.util.List;

public interface ItemService {

    ItemDto createItem(ItemDto itemDto);

    ItemDto getItemById(Long itemID);

    List<ItemDto> getAllItems();

    ItemDto updateItem(Long itemID, ItemDto updatedItem);

    void deleteItem(Long itemID);

    List<ItemDto> getItemsByUserId(Long userId);

    List<ItemDto> searchItems(String keyword, String sort, Long userID);

    Double getDistance(Long itemID, Long userID);

    Double getRating(Long itemID);

    List<ItemDto> getSuggestedItems(Long userID);

    List<ItemDto> getSuggestedItemsByFavorites(Long userID);

}
