/* This file stores all functions related to fetching Requests from
*  the database */
import axios from 'axios'

const REQUEST_BASE_URL = 'http://localhost:8000/api/requests'

export function getMyRequests(userId) {
    return axios.get(REQUEST_BASE_URL + "/sent-by/1")
}

export function getApprovedRequests(userId) {
    return axios.get(REQUEST_BASE_URL + "/approved/1")
}

export function createRequest(requestDto) {
    return axios.post(requestDto)
}