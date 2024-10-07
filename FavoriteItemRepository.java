package com.example.commune;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteItemRepository extends JpaRepository<FavoriteItem, Long> {
    List<FavoriteItem> findByUserId(Long userId);
    Optional<FavoriteItem> findByUserIdAndItemId(Long userId, Long itemId);
}
