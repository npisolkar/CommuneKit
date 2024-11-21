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

    List<ItemDto> getCombinedSuggestedItems(Long userID);

    List<ItemDto> filterItems(String category, Double minRating, Double maxDistance, String sort, Long userID);

    List<String> getAllCategories();



    void hideItem(Long itemID);

    void unhideItem(Long itemID);

    List<ItemDto> getItemsByBannedUser(Long userID);

    void updateItemImage(Long itemID, Long imageId);

    List<ItemDto> getLentItems(Long userId);

    List<ItemDto> getBorrowedItems(Long userId);
}
