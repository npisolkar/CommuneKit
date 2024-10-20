import axios from 'axios';

export function createReview(review) {
    return axios.post('/api/reviews', review, {
        headers: {'Content-Type': 'application/json'},
        data:JSON.stringify(review),
    });
}