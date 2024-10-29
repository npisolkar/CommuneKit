/* FetchPage: contains a basic framework for loading pages with
*  information from the database. Should be reusable. */

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/requests"


export function getRequests(){
    return axios.get(API_BASE_URL);
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

export function createRequest(requestDto){
    try {
        return axios.post(API_BASE_URL, requestDto, {
            headers: {
                'Content-Type': 'application/json'
            }}
        );
    } catch (error) {
        throw error;
    }
}


