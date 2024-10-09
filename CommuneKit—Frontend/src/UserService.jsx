/* FetchPage: contains a basic framework for loading pages with
*  information from the database. Should be reusable. */

import {useEffect, useState} from 'react';
import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/users"


export function getUsers(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

export function createUser(user){
        return axios.post(EMPLOYEE_API_BASE_URL,user);
    }

export function getUserById(userId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + userId);
    }

