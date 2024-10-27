/* Profile: The page which contains all profile information for
*  certain user. The page's behavior should change based on
*  whether one is accessing one's own page or another's. */
import './styles.css'
import React, { useState, useEffect } from 'react'
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import {getUserById, updateUser} from "./services/UserService.jsx";

axios.defaults.baseURL = "http://localhost:8080/api/users"

function EditButton({isOwn, handleClick, bodyText}) {
    if (isOwn) {
        return (
            <button onClick={handleClick}>{bodyText}</button>
        )
    }
    else {
        return null
    }
}

function ItemsButton(isOwn) {
    if (isOwn) {
        return (
            <div id="my-items-button">
                <Link to="/profile/my-items">
                    <button>View My Items</button>
                </Link>
            </div>

        )
    } else {
        return null
    }
}

export default function Profile() {

    const { userID } = useParams();
    const [isClicked, setClicked] = useState(false);
    const [profilePicture, setProfilePicture] = useState(' ');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        //password: '',
        address: '',
        bio: '',
        phone: ''
    });
    const loggedInUserID = localStorage.getItem('userID');

    if (userID === loggedInUserID) {
        const isOwn = true;
    } else {
        const isOwn = false;
    }
    /**
        Image file change handling
     */
    const handleFileChange = (e) => {
        console.log(e.target.file)
        setProfilePicture(e.target.files[0]);
    }

    useEffect(() => {
       /* if (id === localStorage.getItem("userID")) {
            isOwn = true;
        }*/
        getUserById(localStorage.getItem("userID"))
            .then (res => {
                setFormData(res.data)
                console.log("in get:" + JSON.stringify(res.data));
                console.log("username in get: " + formData.userName)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    function onClick() {
        setClicked(!isClicked);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("username at beginning of upload: " + formData.userName)
        console.log("upload: " + JSON.stringify(formData));
        try {
           /* let profileJson = {
                name: formData.userName,
                password: formData.password,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                isBanned: false
            }*/
            const fdata = new FormData();
            fdata.append('firstName', formData.firstName);
            fdata.append('lastName', formData.lastName);
            fdata.append('userName', formData.userName);
            fdata.append('password', formData.password);
            fdata.append('email', formData.email);
            fdata.append('password', formData.password);
            fdata.append('phone', formData.phone);
            fdata.append('address', formData.address);
            fdata.append('profilePicture', profilePicture);

            console.log("fData: " + JSON.stringify(fData));
            console.log("trying to submit " + JSON.stringify(formData))

            const profileResponse = await updateUser(userID, JSON.stringify(formData));
            const profileData = profileResponse.data;

            console.log("got this as profileData:" + JSON.stringify(profileData));
            setFormData(profileData);
            onClick();
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div id="profile-image" className="about-box"></div>
            {isClicked ?
                <div className="about-box">
                    <div> <p>Your username: {formData.userName}</p></div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Profile picture:</label>
                            <input type="file" onChange={handleFileChange}/>
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" value={formData.userName} name="userName" id="profile-username"
                                   onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label>
                                Bio
                                <input id="profile-bio" value={formData.bio} name="bio" type="text"
                                       onChange={handleInputChange}/>
                            </label></div>
                        <div className="form-group">
                            <label>Address</label>
                            <input id="profile-address" value={formData.address} name="address" type="text"
                                       onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                                <input id="profile-phone" value={formData.phone} type="text" name="phone"
                                       onChange={handleInputChange}/>
                        </div>
                        <div id="edit-profile">
                            <EditButton isOwn={userID === localStorage.getItem('userID')} handleClick={onClick}
                                        bodyText={"Cancel"}/>
                        </div>
                        <div id="submit-profile">
                            <button type="submit">Save Changes</button>
                        </div>
                    </form>
                </div> :
                <div className="about-box">
                    <div>
                        {formData.userName}
                    </div>
                    <label>
                        Bio
                        <div id="profile-bio">{formData.bio}</div>
                    </label>
                    <label>
                        Address
                        <div id="profile-address">{formData.address}</div>
                    </label>
                    <label>
                        Phone Number
                        <div id="profile-phone">{formData.phone}</div>
                    </label>
                    <div id="edit-profile">
                        <EditButton isOwn={userID === localStorage.getItem('userID')} handleClick={onClick} bodyText={"Edit Profile"}/>
                    </div>
                </div>
            }
            <ItemsButton isOwn={userID === localStorage.getItem('userID')}/>
        </>
    )
}