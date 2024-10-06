package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
