/* A wrapper class for functions that interact with the database
*  for the purpose of maintaining reviews */

import axios from 'axios';

const REVIEW_API_BASE_URL = "http://localhost:8080/api/user-reviews"

export function createUserReview(review) {

    return axios.post(REVIEW_API_BASE_URL, review, {
        headers: {'Content-Type': 'application/json'},
    });
}

export function getUserReviewsByUser(userID) {
    return axios.get(REVIEW_API_BASE_URL + "/" + userID)
}


export function getUserRatingById(userID) {
    return axios.get(REVIEW_API_BASE_URL + "/rating/" + userID)
}