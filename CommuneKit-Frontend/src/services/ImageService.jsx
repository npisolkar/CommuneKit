
import axios from "axios";

const IMAGE_API_BASE_URL = "http://localhost:8080/api/image"

export function getImageById(imageId) {
    try {
        console.log("getting this image ID:" + imageId)
        console.log(IMAGE_API_BASE_URL + "/fileId/" + imageId)
        return axios.get(IMAGE_API_BASE_URL + "/fileId/" + imageId , {
            responseType: "arraybuffer", // Ensure the response is treated as binary data
        } )
    }
    catch (error) {
        console.log(error);
    }
}

export function uploadImage(formData) {
    try {
        console.log('Image uploading...');
        //formData contains one attribute "image"
        return axios.post(IMAGE_API_BASE_URL, formData);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

export function getImage(imageID) {
    return axios.get(IMAGE_API_BASE_URL + "/" + String(imageID));
}
