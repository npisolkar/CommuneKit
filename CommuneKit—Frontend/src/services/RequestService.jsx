/* This file stores all functions related to fetching Requests from
*  the database */
import axios from 'axios'

const REQUEST_BASE_URL = 'http://localhost:8000/api/requests/'

export function getLendingRequests(userId) {
    return axios.get(REQUEST_BASE_URL + "sent-by/" + JSON.stringify(userId))
}

export function getBorrowingRequests(userId) {
    return axios.get(REQUEST_BASE_URL + "approved/" + JSON.stringify(userId))
}