import axios from "axios";
import {useState} from "react";

const ITEM_API_BASE_URL = "http://localhost:8080/api/items"
const FAVORITE_API_BASE_URL = "http://localhost:8080/api/favorites";


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

export function search(userID, sort, keyword) {
    return axios.get(ITEM_API_BASE_URL + `/search?userID=${userID}&sort=${sort}&keyword=${keyword}`)
}

export function getDistance(itemID, userID) {
    return axios.get(ITEM_API_BASE_URL + `/distance/${itemID}/${userID}`)
}

export function getRating(itemID) {
    return axios.get(ITEM_API_BASE_URL + `/rating/${itemID}`)
}

export function updateItem(userId, itemDto) {
    return axios.put(ITEM_API_BASE_URL + "/1", itemDto, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: itemDto
    })
}

export function deleteItem(itemID) {
    return axios.delete(`${ITEM_API_BASE_URL}/${itemID}`);
}

export function getItemsByPage(page, pageSize) {
    return axios.get(`${ITEM_API_BASE_URL}?page=${page}&size=${pageSize}`);
}

export function createItem(itemDto) {
    return axios.post(ITEM_API_BASE_URL, itemDto, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

// 新增或删除收藏的API
export function favoriteItem(userID, itemID) {
    return axios.post(`${FAVORITE_API_BASE_URL}`, {
        userID,
        itemID
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function removeFavorite(userID, itemID) {
    return axios.delete(`${FAVORITE_API_BASE_URL}/${itemID}/favorite`, {
        params: { userId: userID },
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function getFavoriteItems(userID) {
    return axios.get(`${FAVORITE_API_BASE_URL}/${userID}`);
}

