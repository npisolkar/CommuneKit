/* Profile: The page which contains all profile information for
*  certain user. The page's behavior should change based on
*  whether one is accessing one's own page or another's. */
import './styles.css'
import { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import {getUserById} from "./UserService.jsx";

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

function ItemsButton({isOwn}) {
    if (isOwn) {
        return (
                <div id="my-items-button">
                    <Link to="/profile/my-items">
                        <button>View My Items</button>
                    </Link>
                </div>

        )
    } else {
        return (
                <div id="my-items-button">
                    <Link to="/profile/my-items">
                        <button>View Items</button>
                    </Link>
                </div>
        )
    }
}

export default function Profile({isOwn, userID}) {
    const [isClicked, setClicked] = useState(false);
    const [url, setUrl] = useState(axios.defaults.baseURL);
    const [data, setData] = useState({});

    useEffect(() => {
        getUserById(userID)
            .then (res => {
                setData(res.data);
                console.log(res);
            })
    }, [])

    function onClick() {
        setClicked(!isClicked);
    }

    function uploadImage({image}) {
        axios ({
            method:'POST',
            url:url + userID,
            data: {
                image:image,
            }
        });
    }

    function uploadProfileInfo(formData) {
        axios.post(url + "/" + userID, {
            name: formData.get("name"),
            password: data[2],
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            isBanned:false,
            isAdmin:false,
            isOwner:false,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div>{userID}</div>
            <div>{data.email}</div>
            <div id="profile-image" className="about-box"></div>
            {isClicked ?
                <div className="about-box">
                    <form action={uploadProfileInfo}>
                    <div>
                            <input type="text" name="userName" id="profile-username" placeholder={"Firstname Lastname"}/>
                    </div>
                    <div>
                        <label>
                            Bio
                            <input id="profile-bio" name="bio" type="text" placeholder={"Bio..."}/>
                        </label>
                        <label>
                            Address
                            <input id="profile-address" name="address" type="text" placeholder={"Address"}/>
                        </label>
                        <label>
                            Phone Number
                            <input id="profile-phone" type="text" name="phone" placeholder={"Phone Number"}/>
                        </label>
                    </div>
                    <div id="edit-profile">
                        <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Cancel"}/>
                    </div>
                    <div id="submit-profile">
                        <button type="submit">Save Changes</button>
                    </div>
                    </form>
                </div> :
                <div className="about-box">
                    <div>
                        {data[1]}
                    </div>
                    <label>
                        Bio
                        <div id="profile-bio">{data[6]}</div>
                    </label>
                    <label>
                        Address
                        <div id="profile-address">{data[5]}</div>
                    </label>
                    <label>
                        Phone Number
                        <div id="profile-phone">{data[4]}</div>
                    </label>
                    <div id="edit-profile">
                        <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Edit Profile"}/>
                    </div>
                </div>
            }
            <ItemsButton isOwn={isOwn}/>
            <div id="my-rating">
                <h2>Rating</h2>
            </div>
        </>
    )
}