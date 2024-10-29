/* This file stores all functions related to fetching Requests from
*  the database */
import axios from 'axios'

const REQUEST_BASE_URL = 'http://localhost:8080/api/requests'

export function getMyRequests(userId) {
    return axios.get(REQUEST_BASE_URL + "/sent-by/" + userId)
}

export function getApprovedRequests(userId) {
    return axios.get(REQUEST_BASE_URL + "/approved/" + userId)
}

export function createRequest(requestDto) {
    return axios.post(REQUEST_BASE_URL, requestDto, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getApprovedRequestsById(itemID) {
    return axios.get(REQUEST_BASE_URL + "/current/" + itemID)
}