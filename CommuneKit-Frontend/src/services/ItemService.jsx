import axios from "axios";

const ITEM_API_BASE_URL = "http://localhost:8080/api/items"
const FAVORITE_API_BASE_URL = "http://localhost:8080/api/favorites";

export function getItemById(id) {
    return axios.get(`${ITEM_API_BASE_URL}/${id}`);
}

export function getItemsByUser(userID) {
    return axios.get(`${ITEM_API_BASE_URL}/my/${userID}`);
}

export function getMyBorrows(userID) {
    return axios.get(`${ITEM_API_BASE_URL}/borrowed/${userID}`);
}

export function getMyLent(userID) {
    return axios.get(`${ITEM_API_BASE_URL}/lent/${userID}`);
}

export function getAllItems() {
    return axios.get(ITEM_API_BASE_URL);
}

export function search(userID, sort, keyword, category, minRating, maxDistance) {
    let query = `?userID=${userID}`;
    if (keyword) query += `&keyword=${encodeURIComponent(keyword)}`;
    if (sort) query += `&sort=${encodeURIComponent(sort)}`;
    if (category) query += `&category=${encodeURIComponent(category)}`;
    if (minRating) query += `&minRating=${minRating}`;
    if (maxDistance) query += `&maxDistance=${maxDistance}`;
    return axios.get(`${ITEM_API_BASE_URL}/search${query}`);
}

export function getDistance(itemID, userID) {
    return axios.get(ITEM_API_BASE_URL + `/distance/${itemID}/${userID}`)
}

export function getRating(itemID) {
    return axios.get(`${ITEM_API_BASE_URL}/rating/${itemID}`);
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

export function getSuggestedItems(userID) {
    return axios.get(`${ITEM_API_BASE_URL}/suggested/${userID}`);
}

export function getSuggestedItemsByFavorites(userID) {
    return axios.get(`${ITEM_API_BASE_URL}/suggestedf/${userID}`);
}

export function getFavorites(userID) {
    return axios.get(`${FAVORITE_API_BASE_URL}/${userID}`);
}

export function createItem(itemDto) {
    return axios.post(ITEM_API_BASE_URL, itemDto, {
        headers: {
            "Content-Type": "application/json",
        }
    })
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

export function getCategories() {
    return axios.get(`${ITEM_API_BASE_URL}/categories`);
}

export function updateItemImage(itemID, imageID) {
    try {
        console.log("in updateItemImage... itemID: " + itemID + " imageID: " + imageID);
        return axios.put(ITEM_API_BASE_URL + "/updateItemPic" + "/" + itemID + "/" + imageID, {})
    } catch (error) {
        console.log(error);
    }
}

export function deleteItemImage(itemID) {
    try {
        console.log("in deleteImage... itemID: " + itemID);
        return axios.delete(ITEM_API_BASE_URL + "/updateItemPic" + "/" + itemID, {})
    } catch (error) {
        console.log(error);
    }
}