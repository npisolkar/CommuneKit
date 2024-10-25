/* A wrapper class for functions that interact with the database
*  for the purpose of maintaining reviews */

import axios from 'axios';

const REVIEW_API_BASE_URL = "http://localhost:8080/api/reviews"

export function createReview(review, itemID) {

    return axios.post(REVIEW_API_BASE_URL + "/" + itemID, review, {
        headers: {'Content-Type': 'application/json'},
        data:JSON.stringify(review),
    });
}

export function getReviewsById(itemID) {
    return axios.get(REVIEW_API_BASE_URL + "/" + itemID)
}