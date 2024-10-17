package com.example.CommuneKitBackendTest.service.impl;


import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Item;
import com.example.CommuneKitBackendTest.entity.User;
import com.example.CommuneKitBackendTest.exception.ResourceNotFoundException;
import com.example.CommuneKitBackendTest.mapper.ItemMapper;
import com.example.CommuneKitBackendTest.repository.ItemRepository;
import com.example.CommuneKitBackendTest.repository.UserRepository;
import com.example.CommuneKitBackendTest.service.ItemService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService {

    private ItemRepository itemRepository;

    @Override
    public ItemDto createItem(ItemDto itemDto) {
        Item item = ItemMapper.mapToItem(itemDto);
        Item savedItem = itemRepository.save(item);
        return ItemMapper.mapToItemDto(savedItem);
    }

    @Override
    public ItemDto getItemById(Long itemID) {
        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));
        return ItemMapper.mapToItemDto(item);
    }

    @Override
    public List<ItemDto> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream().map((item) -> ItemMapper.mapToItemDto(item)).collect(Collectors.toList());
    }

    @Override
    public ItemDto updateItem(Long itemID, ItemDto updatedItem) {
        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));

        item.setItemName(updatedItem.getItemName());
        item.setItemDescription(updatedItem.getItemDescription());
        item.setItemCategory(updatedItem.getItemCategory());
        item.setUserID(updatedItem.getUserID());

        Item updatedItemObj = itemRepository.save(item);

        return ItemMapper.mapToItemDto(updatedItemObj);
    }

    @Override
    public void deleteItem(Long itemID) {
        Item item = itemRepository.findById(itemID).orElseThrow(() -> new ResourceNotFoundException("Item with given id not found: " + itemID));
        itemRepository.deleteById(itemID);
    }

    @Override
    public List<ItemDto> getItemsByUserId(Long userId) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("myPersistenceUnit");
        EntityManager entityManager = emf.createEntityManager();
        String jpql = "SELECT i FROM Item i WHERE i.userID = :id";
        TypedQuery<Item> query = entityManager.createQuery(jpql, Item.class);
        query.setParameter("id", userId);
        List<Item> items = query.getResultList();
        items.removeIf(item -> !(item.getUserID().equals(userId)));
        return items.stream().map((item) -> ItemMapper.mapToItemDto(item)).collect(Collectors.toList());
    }

}
