import axios from "axios";

const ITEM_API_BASE_URL = "http://localhost:8080/api/items"

export function createItem(itemDto) {
    return axios.post(ITEM_API_BASE_URL, itemDto, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export function getItemById(id) {
    return axios.get(ITEM_API_BASE_URL + "/" + id);
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

export function updateItem(itemId, itemDto) {
    return axios.put(ITEM_API_BASE_URL + "/" + itemId, itemDto, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: itemDto
    })
}

export function deleteItem(itemID) {
    return axios.delete(ITEM_API_BASE_URL + "/" + itemID);
}