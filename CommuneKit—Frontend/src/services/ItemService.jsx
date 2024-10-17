import axios from "axios";
import {useState} from "react";

const ITEM_API_BASE_URL = "http://localhost:8080/api/items"

export function getItemsByUser(userId) {
    return axios.get(ITEM_API_BASE_URL + "/my/" + JSON.stringify(userId))
}

export function getMyBorrows(userID) {
    return axios.get(ITEM_API_BASE_URL + "/my-borrows/1")
}

export function getAllItems() {
    return axios.get(ITEM_API_BASE_URL)
}

export function getItemById(id) {
    return axios.get(`${id}`);
}

export function updateItem(userId, itemDto) {
    return axios.put(ITEM_API_BASE_URL + "/1", itemDto, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}