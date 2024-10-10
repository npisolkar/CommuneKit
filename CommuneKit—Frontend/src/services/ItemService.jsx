import axios from "axios";
import {useState} from "react";

const USER_API_BASE_URL = "http://localhost:8080/api/users"

export function getItemsByUser() {
    const [items, setItems] = useState([]);
    axios.get(USER_API_BASE_URL + '/1')
        .then((response) => {
            setItems(response.data.items);
        })
    return items;
}

export function getAllItems() {

}