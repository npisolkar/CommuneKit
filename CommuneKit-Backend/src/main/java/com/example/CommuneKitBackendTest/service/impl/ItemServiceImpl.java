package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.dto.ItemDto;
import com.example.CommuneKitBackendTest.entity.Item;
import com.example.CommuneKitBackendTest.mapper.ItemMapper;
import com.example.CommuneKitBackendTest.repository.ItemRepository;
import com.example.CommuneKitBackendTest.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
}
