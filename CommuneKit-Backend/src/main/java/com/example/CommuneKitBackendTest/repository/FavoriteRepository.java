package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUser_UserID(Long userID);
    List<Favorite> findByItem_ItemID(Long itemId); // Add this method

    List<Favorite> findByUser_UserIDAndItem_ItemID(Long userID, Long itemID);

    void deleteByUser_UserID(Long userID);
}
