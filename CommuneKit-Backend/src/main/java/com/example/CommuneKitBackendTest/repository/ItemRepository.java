package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query("SELECT i FROM Item i WHERE i.itemName LIKE %:keyword% OR i.itemDescription LIKE %:keyword%")
    List<Item> searchByKeyword(@Param("keyword") String keyword);
    @Query("SELECT i FROM Item i LEFT JOIN Review r ON i.itemID = r.itemID " +
            "WHERE (:category IS NULL OR i.itemCategory = :category) " +
            "GROUP BY i.itemID " +
            "HAVING (:minRating IS NULL OR AVG(r.rating) >= :minRating)")
    List<Item> findItemsByCategoryAndMinRating(@Param("category") String category,
                                               @Param("minRating") Double minRating);

    List<Item> findByUserID(Long userId);

    @Query("SELECT DISTINCT i.itemCategory FROM Item i")
    List<String> findAllDistinctCategories();



}