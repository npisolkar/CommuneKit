package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.dto.FavoriteDto;
import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping
    public ResponseEntity<String> favoriteItem(@RequestBody FavoriteDto request) {
        favoriteService.favoriteItem(request.getUserID(), request.getItemID());
        return ResponseEntity.ok("Item added to favorites successfully.");
    }

    @GetMapping("/{userID}")
    public List<ItemDto> getFavoriteItems(@PathVariable Long userID) {
        return favoriteService.getFavoriteItems(userID);
    }

    @DeleteMapping("/{itemId}/favorite")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long itemId, @RequestParam Long userId) {
        favoriteService.removeFavorite(userId, itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<String> removeAllFavorites(@PathVariable Long userID) {
        favoriteService.removeAllFavorites(userID);
        return ResponseEntity.ok("All favorites removed successfully.");
    }
}
