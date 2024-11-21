package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ItemController {

    private ItemService itemService;

    @PostMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<ItemDto> createItem(@RequestBody ItemDto itemDto) {
        ItemDto savedItem = itemService.createItem(itemDto);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    /*@GetMapping("/my/{id}")
    public ResponseEntity<List<ItemDto>> getMyItems(@PathVariable("id") Long userId) {
        List<ItemDto> items = itemService.getAllItems();
        List<ItemDto> userItems = new ArrayList<>();
        for (ItemDto itemDto : items) {
            if itemDto.getUserId = userId
                    add to userItems
        }
        return ResponseEntity.ok(itemDto);
    }*/

    @GetMapping("{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<ItemDto> getItemById(@PathVariable("id") Long itemID) {
        ItemDto itemDto = itemService.getItemById(itemID);
        return ResponseEntity.ok(itemDto);
    }

    @GetMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<ItemDto>> getAllItems() {
        List<ItemDto> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @PutMapping("{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<ItemDto> updateItem(@PathVariable("id") Long itemID, @RequestBody ItemDto updatedItem) {
        ItemDto itemDto = itemService.updateItem(itemID, updatedItem);
        return ResponseEntity.ok(itemDto);
    }

    @DeleteMapping("{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<String> deleteItem(@PathVariable("id") Long itemID) {
        itemService.deleteItem(itemID);
        return ResponseEntity.ok("Item deleted successfully");
    }

    @GetMapping("/my/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<ItemDto>> getMyItems(@PathVariable("id") Long userID) {
        List<ItemDto> items = itemService.getItemsByUserId(userID);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/search")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<ItemDto>> searchItems(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Double maxDistance,
            @RequestParam Long userID) {

        List<ItemDto> items;

        if (category != null || minRating != null || maxDistance != null) {
            items = itemService.filterItems(category, minRating, maxDistance, sort, userID);
        } else {
            items = itemService.searchItems(keyword, sort, userID);
        }

        return ResponseEntity.ok(items);
    }

    @GetMapping("/distance/{itemID}/{userID}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<Double> getDistance(
            @PathVariable("itemID") Long itemID,
            @PathVariable("userID") Long userID) {
        Double distance = itemService.getDistance(itemID, userID);
        return ResponseEntity.ok(distance);
    }

    @GetMapping("/rating/{itemID}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<Double> getRating(@PathVariable("itemID") Long itemID) {
        Double rating = itemService.getRating(itemID);
        return ResponseEntity.ok(rating);
    }

    @GetMapping("/categories")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = itemService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/updateItemPic/{itemID}/{imageID}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<String> updateItemImage(@PathVariable("itemID") Long itemID,
                                                  @PathVariable("imageID") Long imageID) {
        try {
            itemService.updateItemImage(itemID, imageID);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/suggested/{id}")
    public ResponseEntity<List<ItemDto>> getSuggestedItems(@PathVariable("id") Long userID) {
        List<ItemDto> suggestedItems = itemService.getCombinedSuggestedItems(userID);
        return ResponseEntity.ok(suggestedItems);
    }

    @GetMapping("/lent/{userId}")
    public ResponseEntity<List<ItemDto>> getLentItems(@PathVariable Long userId) {
        List<ItemDto> lentItems = itemService.getLentItems(userId);
        return ResponseEntity.ok(lentItems);
    }

    @GetMapping("/borrowed/{userId}")
    public ResponseEntity<List<ItemDto>> getBorrowedItems(@PathVariable Long userId) {
        List<ItemDto> borrowedItems = itemService.getBorrowedItems(userId);
        return ResponseEntity.ok(borrowedItems);
    }


}
