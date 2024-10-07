package com.example.commune;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/favorites")
public class FavoriteItemController {

    @Autowired
    private FavoriteItemRepository favoriteItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addFavoriteItem(@RequestParam Long userId, @RequestParam Long itemId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Item> item = itemRepository.findById(itemId);

        if (user.isPresent() && item.isPresent()) {
            FavoriteItem favoriteItem = new FavoriteItem(user.get(), item.get());
            favoriteItemRepository.save(favoriteItem);
            return ResponseEntity.ok("Item added to favorites");
        }

        return ResponseEntity.badRequest().body("User or Item not found");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFavoriteItem(@RequestParam Long userId, @RequestParam Long itemId) {
        Optional<FavoriteItem> favoriteItem = favoriteItemRepository.findByUserIdAndItemId(userId, itemId);

        if (favoriteItem.isPresent()) {
            favoriteItemRepository.delete(favoriteItem.get());
            return ResponseEntity.ok("Item removed from favorites");
        }

        return ResponseEntity.badRequest().body("Favorite item not found");
    }

    @GetMapping("/user/{userId}")
    public List<FavoriteItem> getUserFavorites(@PathVariable Long userId) {
        return favoriteItemRepository.findByUserId(userId);
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearUserFavorites(@PathVariable Long userId) {
        List<FavoriteItem> favorites = favoriteItemRepository.findByUserId(userId);
        favoriteItemRepository.deleteAll(favorites);
        return ResponseEntity.ok("All favorite items removed");
    }
}
