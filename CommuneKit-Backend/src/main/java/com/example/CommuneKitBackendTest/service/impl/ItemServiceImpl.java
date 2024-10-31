package com.example.CommuneKitBackendTest.service.impl;


import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Item;
import com.example.CommuneKitBackendTest.entity.Review;
import com.example.CommuneKitBackendTest.entity.User;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.mapper.ItemMapper;
import com.example.CommuneKitBackendTest.repository.ItemRepository;
import com.example.CommuneKitBackendTest.repository.ReviewRepository;
import com.example.CommuneKitBackendTest.repository.UserRepository;
import com.example.CommuneKitBackendTest.service.ItemService;
import com.example.CommuneKitBackendTest.service.ReviewService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService {

    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    private ItemRepository itemRepository;

    @Override
    public ItemDto createItem(ItemDto itemDto) {
        Item item = ItemMapper.mapToItem(itemDto);
        Item savedItem = itemRepository.save(item);
        return ItemMapper.mapToItemDto(savedItem);
    }

    @Override
    public ItemDto getItemById(Long itemID) {
        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));
        return ItemMapper.mapToItemDto(item);
    }

    @Override
    public List<ItemDto> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream().map((item) -> ItemMapper.mapToItemDto(item)).collect(Collectors.toList());
    }

    @Override
    public ItemDto updateItem(Long itemID, ItemDto updatedItem) {
        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));

        item.setItemName(updatedItem.getItemName());
        item.setItemDescription(updatedItem.getItemDescription());
        item.setItemCategory(updatedItem.getItemCategory());
        item.setUserID(updatedItem.getUserID());

        Item updatedItemObj = itemRepository.save(item);

        return ItemMapper.mapToItemDto(updatedItemObj);
    }

    @Override
    public void deleteItem(Long itemID) {
        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));
        itemRepository.deleteById(itemID);
    }

    @Override
    public List<ItemDto> getItemsByUserId(Long userId) {
        List<Item> items = itemRepository.findAll();
        items.removeIf(item -> !(item.getUserID().equals(userId)));
        return items.stream().map((item) -> ItemMapper.mapToItemDto(item)).collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> searchItems(String keyword, String sort, Long userID) {
        List<Item> items;

        if (keyword != null) {
            items = itemRepository.searchByKeyword(keyword);
        }
        else {
            items = itemRepository.findAll();
        }

        if (sort.equals("distance")) {
            User currentUser = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));

            double userLat = currentUser.getLatitude();
            double userLon = currentUser.getLongitude();

            items.sort((item1, item2) -> {
                User user1 = userRepository.getById(item1.getUserID());
                User user2 = userRepository.getById(item2.getUserID());

                double distance1 = calculateDistance(userLat, userLon, user1.getLatitude(), user1.getLongitude());
                double distance2 = calculateDistance(userLat, userLon, user2.getLatitude(), user2.getLongitude());

                return Double.compare(distance1, distance2);
            });

        } else if (sort.equals("rating")) {
            items.sort((item1, item2) -> {
                double rating1 = calculateAverageRating(item1.getItemID());
                double rating2 = calculateAverageRating(item2.getItemID());

                return Double.compare(rating2, rating1);
            });
        }

        return items.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private double calculateAverageRating(Long itemId) {
        List<Review> reviews = reviewRepository.findByItemID(itemId);

        if (reviews.isEmpty()) return 0.0;

        double total = reviews.stream().mapToDouble(Review::getRating).sum();
        return total / reviews.size();
    }

    @Override
    public Double getDistance(Long itemID, Long userID) {
        User user = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));

        double lat = user.getLatitude();
        double lon = user.getLongitude();

        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));

        User user2 = userRepository.getById(item.getUserID());

        return calculateDistance(lat, lon, user2.getLatitude(), user2.getLongitude());
    }

    @Override
    public Double getRating(Long itemID) {
        return calculateAverageRating(itemID);
    }

    private ItemDto convertToDto(Item item) {
        ItemDto dto = new ItemDto();
        dto.setItemID(item.getItemID());
        dto.setItemName(item.getItemName());
        dto.setItemDescription(item.getItemDescription());
        dto.setItemCategory(item.getItemCategory());
        dto.setUserID(item.getUserID());
        return dto;
    }


    public static double calculateDistance(double latitude1, double longitude1, double latitude2, double longitude2) {

        double lat1 = Math.toRadians(latitude1);
        double lon1 = Math.toRadians(longitude1);
        double lat2 = Math.toRadians(latitude2);
        double lon2 = Math.toRadians(longitude2);

        return Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))*3958.8;
    }



}
