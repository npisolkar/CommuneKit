package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Item;
import com.example.CommuneKitBackendTest.entity.Review;
import com.example.CommuneKitBackendTest.entity.User;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.mapper.ItemMapper;
import com.example.CommuneKitBackendTest.repository.FavoriteRepository;
import com.example.CommuneKitBackendTest.repository.ItemRepository;
import com.example.CommuneKitBackendTest.repository.ReviewRepository;
import com.example.CommuneKitBackendTest.repository.UserRepository;
import com.example.CommuneKitBackendTest.service.ItemService;
//import com.example.CommuneKitBackendTest.service.ReviewService;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.EntityManagerFactory;
//import jakarta.persistence.Persistence;
//import jakarta.persistence.TypedQuery;
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
    private FavoriteRepository favoriteRepository;

    @Override
    public ItemDto createItem(ItemDto itemDto) {
        Item item = ItemMapper.mapToItem(itemDto);
        Item savedItem = itemRepository.save(item);
        return ItemMapper.mapToItemDto(savedItem);
    }

    @Override
    public ItemDto getItemById(Long itemID) {
        Item item = itemRepository.findById(itemID)
                .orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));
        return ItemMapper.mapToItemDto(item);
    }

    @Override
    public List<ItemDto> getAllItems() {
        List<Item> items = itemRepository.findAll();
        items.removeIf(item -> (item.getVisible().equals(false)));
        return items.stream().map((item) -> ItemMapper.mapToItemDto(item)).collect(Collectors.toList());
    }

    @Override
    public ItemDto updateItem(Long itemID, ItemDto updatedItem) {
        Item item = itemRepository.findById(itemID)
                .orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));

        item.setItemName(updatedItem.getItemName());
        item.setItemDescription(updatedItem.getItemDescription());
        item.setItemCategory(updatedItem.getItemCategory());
        item.setUserID(updatedItem.getUserID());

        Item updatedItemObj = itemRepository.save(item);
        return ItemMapper.mapToItemDto(updatedItemObj);
    }

    @Override
    public void deleteItem(Long itemID) {
        Item item = itemRepository.findById(itemID)
                .orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));
        itemRepository.deleteById(itemID);
    }

    @Override
    public List<ItemDto> getItemsByUserId(Long userId) {
        List<Item> items = itemRepository.findAll();
        items.removeIf(item -> !(item.getUserID().equals(userId)));
        items.removeIf(item -> (item.getVisible().equals(false)));
        return items.stream().map((item) -> ItemMapper.mapToItemDto(item)).collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> searchItems(String keyword, String sort, Long userID) {
        List<Item> items;

        if (keyword != null && !keyword.isEmpty()) {
            items = itemRepository.searchByKeyword(keyword);
        } else {
            items = itemRepository.findAll();
        }

        if ("distance".equalsIgnoreCase(sort)) {
            User currentUser = userRepository.findById(userID)
                    .orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));

            double userLat = currentUser.getLatitude();
            double userLon = currentUser.getLongitude();

            items.sort((item1, item2) -> {
                User user1 = userRepository.findById(item1.getUserID())
                        .orElseThrow(() -> new ResourceNotFoundException("Owner of the item not found: " + item1.getUserID()));
                User user2 = userRepository.findById(item2.getUserID())
                        .orElseThrow(() -> new ResourceNotFoundException("Owner of the item not found: " + item2.getUserID()));

                Double distance1 = calculateDistance(userLat, userLon, user1.getLatitude(), user1.getLongitude());
                Double distance2 = calculateDistance(userLat, userLon, user2.getLatitude(), user2.getLongitude());

                return distance1.compareTo(distance2);
            });

        } else if ("rating".equalsIgnoreCase(sort)) {
            items.sort((item1, item2) -> {
                Double rating1 = calculateAverageRating(item1.getItemID());
                Double rating2 = calculateAverageRating(item2.getItemID());

                return rating2.compareTo(rating1);
            });
        }

        return items.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> filterItems(String category, Double minRating, Double maxDistance, String sort, Long userID) {
        List<Item> items = itemRepository.findItemsByCategoryAndMinRating(category, minRating);

        User searchingUser = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));

        double userLat = searchingUser.getLatitude();
        double userLon = searchingUser.getLongitude();

        List<ItemDto> itemDtos = items.stream().map(item -> {
            ItemDto dto = convertToDto(item);
            Double avgRating = calculateAverageRating(item.getItemID());
            dto.setAverageRating(avgRating != null ? avgRating : Double.valueOf(0.0)); // 显式装箱

            User itemOwner = userRepository.findById(item.getUserID())
                    .orElseThrow(() -> new ResourceNotFoundException("Owner of the item not found: " + item.getUserID()));
            Double distance = calculateDistance(userLat, userLon, itemOwner.getLatitude(), itemOwner.getLongitude());
            dto.setDistance(distance != null ? distance : Double.valueOf(0.0)); // 显式装箱

            return dto;
        }).collect(Collectors.toList());

        if (maxDistance != null) {
            itemDtos = itemDtos.stream()
                    .filter(dto -> dto.getDistance() <= maxDistance)
                    .collect(Collectors.toList());
        }

        if (sort != null) {
            if ("rating".equalsIgnoreCase(sort)) {
                itemDtos.sort((d1, d2) -> d2.getAverageRating().compareTo(d1.getAverageRating()));
            } else if ("distance".equalsIgnoreCase(sort)) {
                itemDtos.sort((d1, d2) -> d1.getDistance().compareTo(d2.getDistance()));
            }
        }

        return itemDtos;
    }

    @Override
    public Double getDistance(Long itemID, Long userID) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));

        double lat = user.getLatitude();
        double lon = user.getLongitude();

        Item item = itemRepository.findById(itemID)
                .orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));

        User itemOwner = userRepository.findById(item.getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("Owner of the item not found: " + item.getUserID()));

        return calculateDistance(lat, lon, itemOwner.getLatitude(), itemOwner.getLongitude()); // 已修改方法返回 Double
    }

    @Override
    public Double getRating(Long itemID) {
        Double rating = calculateAverageRating(itemID);
        return rating != null ? rating : Double.valueOf(0.0); // 显式装箱
    }

    @Override
    public List<ItemDto> getSuggestedItems(Long userID) {
        User currentUser = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));
        double userLat = currentUser.getLatitude();
        double userLon = currentUser.getLongitude();

        List<Item> items = itemRepository.findAll().stream()
                .filter(item -> !item.getUserID().equals(userID))
                .collect(Collectors.toList());

        return calculateAndSortSuggestedItems(items, userLat, userLon);
    }

    @Override
    public List<ItemDto> getSuggestedItemsByFavorites(Long userID) {
        User currentUser = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));
        double userLat = currentUser.getLatitude();
        double userLon = currentUser.getLongitude();

        List<String> favoriteCategories = favoriteRepository.findByUser_UserID(userID).stream()
                .map(favorite -> favorite.getItem().getItemCategory())
                .distinct()
                .collect(Collectors.toList());

        List<Item> filteredItems = itemRepository.findAll().stream()
                .filter(item -> favoriteCategories.contains(item.getItemCategory()))
                .filter(item -> !item.getUserID().equals(userID))
                .collect(Collectors.toList());

        return calculateAndSortSuggestedItems(filteredItems, userLat, userLon);
    }

    @Override
    public List<ItemDto> getCombinedSuggestedItems(Long userID) {
        // Check if the user exists
        User currentUser = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User with given id not found: " + userID));

        // Check if the user has any favorite items
        boolean hasFavorites = favoriteRepository.findByUser_UserID(userID).stream()
                .anyMatch(favorite -> favorite.getItem() != null);

        // Call the appropriate method based on whether the user has favorite items
        if (hasFavorites) {
            return getSuggestedItemsByFavorites(userID);
        } else {
            return getSuggestedItems(userID);
        }
    }

    private List<ItemDto> calculateAndSortSuggestedItems(List<Item> items, double userLat, double userLon) {
        return items.stream()
                .map(item -> {
                    Double averageRating = calculateAverageRating(item.getItemID());
                    if (averageRating == null || averageRating == 0.0) {
                        averageRating = 0.1; // default to 0.1 if rating is null or zero
                    }

                    User user = userRepository.findById(item.getUserID())
                            .orElseThrow(() -> new ResourceNotFoundException("User not found for item owner ID: " + item.getUserID()));

                    double lat = user.getLatitude();
                    double lon = user.getLongitude();
                    Double distance = calculateDistance(userLat, userLon, lat, lon);
                    if (distance == null) {
                        distance = Double.valueOf(0.0); // default to 0 if distance cannot be calculated
                    }

                    return ItemMapper.mapToItemDto(item, averageRating, distance);
                })
                .filter(itemDto -> itemDto.getAverageRating() > 0) // filter out items with zero average rating
                .sorted((dto1, dto2) -> {
                    // Calculate scores using averageRating and distance to sort
                    double score1 = dto1.getAverageRating() / (dto1.getDistance() > 0 ? dto1.getDistance() : 1);
                    double score2 = dto2.getAverageRating() / (dto2.getDistance() > 0 ? dto2.getDistance() : 1);
                    return Double.compare(score2, score1); // sort descending by score
                })
                .collect(Collectors.toList());
    }


    private ItemDto convertToDto(Item item) {
        // Use ItemMapper to map basic fields
        ItemDto dto = ItemMapper.mapToItemDto(item);

        // Calculate and set the average rating
        Double avgRating = calculateAverageRating(item.getItemID());
        dto.setAverageRating(avgRating != null ? avgRating : Double.valueOf(0.0));

        // If needed, you can add distance calculation here
        // User itemOwner = userRepository.findById(item.getUserID())
        //         .orElseThrow(() -> new ResourceNotFoundException("Owner of the item not found: " + item.getUserID()));
        // Double distance = calculateDistance(userLat, userLon, itemOwner.getLatitude(), itemOwner.getLongitude());
        // dto.setDistance(distance != null ? distance : Double.valueOf(0.0));

        return dto;
    }

    private Double calculateAverageRating(Long itemId) {
        List<Review> reviews = reviewRepository.findByItemID(itemId);

        if (reviews.isEmpty()) return null; // 或者返回 Double.valueOf(0.0)

        double total = reviews.stream().mapToDouble(Review::getRating).sum();
        return Double.valueOf(total / reviews.size()); // 显式装箱
    }

    public static Double calculateDistance(double latitude1, double longitude1, double latitude2, double longitude2) {
        double lat1 = Math.toRadians(latitude1);
        double lon1 = Math.toRadians(longitude1);
        double lat2 = Math.toRadians(latitude2);
        double lon2 = Math.toRadians(longitude2);

        double distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * 3958.8;
        return (double) Math.round(distance * 100) / 100;
    }

    public void hideItem(Long itemID) {
        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));
        item.setVisible(false);
        itemRepository.save(item);
    }
    public void unhideItem(Long itemID) {
        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));
        item.setVisible(true);
        itemRepository.save(item);
    }
    @Override
    public List<String> getAllCategories() {
        return itemRepository.findAllDistinctCategories();
    }

    @Override
    public List<ItemDto> getItemsByBannedUser(Long userId) {
        List<Item> items = itemRepository.findAll();
        items.removeIf(item -> !(item.getUserID().equals(userId)));
        return items.stream().map((item) -> ItemMapper.mapToItemDto(item)).collect(Collectors.toList());
    }

    //TODO: deletes whatever image they previously had. GENIUS.
    public void updateItemImage(Long itemID, Long imageId) {
        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given ID not found: " + itemID));
        item.setPicture( imageId );
        itemRepository.save(item);
    }
    @Override
    public List<ItemDto> getLentItems(Long userId) {
        List<Item> lentItems = itemRepository.findLentItemsByUserId(userId);
        return lentItems.stream().map(this::mapItemToDto).collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> getBorrowedItems(Long userId) {
        List<Item> borrowedItems = itemRepository.findBorrowedItemsByUserId(userId);
        return borrowedItems.stream().map(this::mapItemToDto).collect(Collectors.toList());
    }

    private ItemDto mapItemToDto(Item item) {
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

}