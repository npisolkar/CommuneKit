/* FetchPage: contains a basic framework for loading pages with
*  information from the database. Should be reusable. */

import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/users"
const USER_API_BASE_URL = "http://localhost:8080/api/users"

export function getUsers(){
    return axios.get(EMPLOYEE_API_BASE_URL);
}

export function updateUser(userId, userDto) {
    try {
        console.log("in updateUser:" + userDto)
        return axios.put(USER_API_BASE_URL + "/"+ String(userId), userDto, {
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

export function createUser(userDto){
    try {
        return axios.post(EMPLOYEE_API_BASE_URL, userDto, {
            headers: {
                'Content-Type': 'application/json'
            }}
        );
    } catch (error) {
        throw error;
    }
}

export function getUserById(userId){
    return axios.get(EMPLOYEE_API_BASE_URL + '/' + userId);
}

export default function loginUser(userDto){
    try {
        return axios.post(EMPLOYEE_API_BASE_URL + '/login', userDto, {
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
export function banUser(userId) {
    return axios.delete(EMPLOYEE_API_BASE_URL + '/ban/' + userId);

}
