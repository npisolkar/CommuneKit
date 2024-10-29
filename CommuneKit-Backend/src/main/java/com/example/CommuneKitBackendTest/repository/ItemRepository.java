package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query("SELECT i FROM Item i WHERE (i.itemName LIKE %:keyword% OR i.itemDescription LIKE %:keyword%) AND i.itemCategory = :category")
    List<Item> searchByKeywordAndCategory(@Param("keyword") String keyword, @Param("category") String category);

    @Query("SELECT i FROM Item i WHERE i.itemName LIKE %:keyword% OR i.itemDescription LIKE %:keyword%")
    List<Item> searchByKeyword(@Param("keyword") String keyword);

    List<Item> findByItemCategory(String itemCategory);
}
