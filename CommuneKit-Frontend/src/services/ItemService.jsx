import axios from "axios";

const ITEM_API_BASE_URL = "http://localhost:8080/api/items";
const FAVORITE_API_BASE_URL = "http://localhost:8080/api/favorites";

export function getItemById(id) {
    return axios.get(`${ITEM_API_BASE_URL}/${id}`);
}

export function getItemsByUser(userID) {
    return axios.get(`${ITEM_API_BASE_URL}/my/${userID}`);
}

export function getMyBorrows(userID) {
    return axios.get(`${ITEM_API_BASE_URL}/my-borrows/${userID}`);
}

export function getAllItems() {
    return axios.get(ITEM_API_BASE_URL);
}

export function updateItem(userID, itemDto) {
    return axios.put(`${ITEM_API_BASE_URL}/${itemDto.itemID}`, itemDto, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteItem(itemID) {
    return axios.delete(`${ITEM_API_BASE_URL}/${itemID}`);
}

export function getItemsByPage(page, pageSize) {
    return axios.get(`${ITEM_API_BASE_URL}?page=${page}&size=${pageSize}`);
}

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