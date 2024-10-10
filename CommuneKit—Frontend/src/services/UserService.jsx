import {useEffect, useState} from 'react';
import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/users"


export function getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

export function createUser(user){
        return axios.post(USER_API_BASE_URL,user);
    }

export function getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/1');
    }

