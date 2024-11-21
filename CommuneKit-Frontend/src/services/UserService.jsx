/* FetchPage: contains a basic framework for loading pages with
*  information from the database. Should be reusable. */

import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/users"

export function getUsers(){
    return axios.get(USER_API_BASE_URL);
}

export function updateUserImage(userID, imageID) {
    try {
        console.log("in updateUserImage... userID: " + userID + " imageID: " + imageID);
        return axios.put(USER_API_BASE_URL + "/updatePfp" + "/" + userID + "/" + imageID, {})
    } catch (error) {
        console.log(error);
    }
}

export function updateUser(userId, userDto) {
    try {
        console.log("in updateUser:" + userDto)
        return axios.put(USER_API_BASE_URL +  "/"+ String(userId), userDto, {
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
/*
export function updateUserImage(userId, image) {
    try {
        console.log("trying to update this user's pfp:" + userId)
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
}*/

export function createUser(userDto){
    try {
        return axios.post(USER_API_BASE_URL, userDto, {
            headers: {
                'Content-Type': 'application/json'
            }}
        );
    } catch (error) {
        throw error;
    }
}

export function getUserById(userId){
    return axios.get(USER_API_BASE_URL + '/' + userId);
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
}
export function banUser(userId) {
    return axios.delete(USER_API_BASE_URL + '/ban/' + userId);

}
export  function unbanUser(userId){
    return axios.delete(USER_API_BASE_URL + '/unban/' + userId);
}
export  function deleteUser(userId){
    return axios.delete(USER_API_BASE_URL + '/' + userId);
}