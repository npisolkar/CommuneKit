import axios from "axios";

const MESSAGE_BASE_URL = "http://localhost:8080/api/messages"

export function createMessage(messageDto) {
    return axios.post(MESSAGE_BASE_URL, messageDto, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export function getMessageById(id) {
    return axios.get(MESSAGE_BASE_URL + "/" + String(id))
}

export function getConversation(user2) {
    return axios.get(MESSAGE_BASE_URL + "/conversation/" + localStorage.getItem("userID") + "/" + user2.user2)
}