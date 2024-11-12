package com.example.CommuneKitBackendTest.service;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Favorite;
import com.example.CommuneKitBackendTest.entity.Item;
import com.example.CommuneKitBackendTest.entity.User;
import com.example.CommuneKitBackendTest.repository.FavoriteRepository;
import com.example.CommuneKitBackendTest.repository.ItemRepository;
import com.example.CommuneKitBackendTest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Transactional
    public void favoriteItem(Long userID, Long itemID) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userID));
        Item item = itemRepository.findById(itemID)
                .orElseThrow(() -> new RuntimeException("Item not found with ID: " + itemID));

        List<Favorite> existingFavorites = favoriteRepository.findByUser_UserIDAndItem_ItemID(userID, itemID);
        if (!existingFavorites.isEmpty()) {
            throw new RuntimeException("This item is already in the user's favorites.");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setItem(item);
        favoriteRepository.save(favorite);
    }

    public List<ItemDto> getFavoriteItems(Long userID) {
        List<Favorite> favorites = favoriteRepository.findByUser_UserID(userID);
        return favorites.stream().map(favorite -> {
            Item item = favorite.getItem();
            return new ItemDto(item.getItemID(), item.getItemName(), item.getItemDescription(), item.getItemCategory(), item.getUserID());
        }).collect(Collectors.toList());
    }

    @Transactional
    public void removeFavorite(Long userID, Long itemID) {
        List<Favorite> favorites = favoriteRepository.findByUser_UserIDAndItem_ItemID(userID, itemID);
        if (favorites.isEmpty()) {
            throw new RuntimeException("Favorite not found for userID: " + userID + " and itemID: " + itemID);
        }

        favoriteRepository.deleteAll(favorites);
    }

    @Transactional
    public void removeAllFavorites(Long userID) {
        favoriteRepository.deleteByUser_UserID(userID);
    }
}
