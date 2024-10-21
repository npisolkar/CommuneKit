import axios from "axios";
import {useState} from "react";

const ITEM_API_BASE_URL = "http://localhost:8080/api/items"

export function getItemById(id) {
    return axios.get(ITEM_API_BASE_URL + "/1");
}

export function getItemsByUser(userID) {
    return axios.get(ITEM_API_BASE_URL + "/my/" + userID)
}

export function getMyBorrows(userID) {
    return axios.get(ITEM_API_BASE_URL + "/my-borrows/" + userID)
}

export function getAllItems() {
    return axios.get(ITEM_API_BASE_URL)
}

export function updateItem(userId, itemDto) {
    return axios.put(ITEM_API_BASE_URL + "/1", itemDto, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(itemDto)
    })
}