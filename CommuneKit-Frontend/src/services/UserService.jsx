import {useEffect, useState} from 'react';
import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/users"


export function getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

export function createUser(userDto){
    try {
        return axios.post(USER_API_BASE_URL, userDto, {
            headers: {
                'Content-Type': 'application/json'
            }}
        );
    } catch (error) {
        throw error;
    }
}
export function getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/1');
    }

export function updateUser(userId, userDto) {
    try {
        console.log("in updateUser:" + userDto)
        return axios.put(USER_API_BASE_URL + "/1", userDto, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: userDto
        })
    }
    catch (error) {
        console.log(error);
    }
}

export default function loginUser(userDto){
    try {
        return axios.post(USER_API_BASE_URL + '/login', userDto, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        throw error;
    }
    //may be good to put this in here:
    // headers: {
    //     'Content-Type': 'application/json'
    // }
}
