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

export function updateRequest(requestId, requestDto) {
    try {
        console.log("in updateRequest:" + requestDto)
        return axios.put(API_BASE_URL + "/" + requestId, requestDto, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: requestDto
        })
    }
    catch (error) {
        console.log(error);
    }
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