package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    private ItemService itemService;

    @PostMapping
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
    public ResponseEntity<ItemDto> getItemById(@PathVariable("id") Long itemID) {
        ItemDto itemDto = itemService.getItemById(itemID);
        return ResponseEntity.ok(itemDto);
    }

    @GetMapping
    public ResponseEntity<List<ItemDto>> getAllItems() {
        List<ItemDto> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @PutMapping("{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<ItemDto> updateItem(@PathVariable("id") Long itemID, @RequestBody ItemDto updatedItem) {
        ItemDto itemDto = itemService.updateItem(itemID, updatedItem);
        return ResponseEntity.ok(itemDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteItem(@PathVariable("id") Long itemID) {
        itemService.deleteItem(itemID);
        return ResponseEntity.ok("Item deleted successfully");
    }
}
