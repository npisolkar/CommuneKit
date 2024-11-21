import '../styles.css';
import { useState, useEffect } from 'react';

import axios from 'axios';
import {getUserById} from "../services/UserService.jsx";

axios.defaults.baseURL = "http://localhost:8080/api/users";

const ProfilePicture = ({ imageId }) => {
    return( <img src={imageId ? `http://localhost:8080/api/image/fileId/${imageId}`
        : '../public/simplepfp.png'}
                 alt="User Profile"
                 style={{width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%"}}/>);
}

export default function ContactInfo( { userID }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        address: '',
        bio: '',
        phone: '',
        profilePicture: ''
    });

    useEffect(() => {
        // if not logged in, navigate to login page
        getUserById(userID)
            .then(res => {
                console.log("formdata before fetch: " + JSON.stringify(formData))
                setFormData(res.data);
                console.log("User data fetched:", res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [userID])

    return (
        <div id="contact-info">
            <p>
                <b>Email{"\t"}</b>
                {formData.email}

                <b>{"\t"}{"\t"}Address{"\t"}</b>
                {formData.address}

                <b>{"\t"}{"\t"}Phone Number{"\t"}</b>
                {formData.phone}
            </p>
        </div>
)
}