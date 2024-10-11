/* Profile: The page which contains all profile information for
*  certain user. The page's behavior should change based on
*  whether one is accessing one's own page or another's. */
import './styles.css'
import { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
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
        getUserById({userId:'1'})
            .then (res => {
                setData(res.data);
                console.log(JSON.stringify(res.data));
            })
            .catch(function (error) {
                console.log(error);
            });
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

    async function uploadProfileInfo(formData) {
        try {
            let profileJson = {
                name: formData.userName,
                password: formData.password,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                isBanned: false,
                isAdmin: false,
                isOwner: false,
            }
            const profileData = await updateUser(userID, JSON.stringify(profileJson));
            console.log("submit:" + profileData);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div id="profile-image" className="about-box"></div>
            {isClicked ?
                <div className="about-box">
                    <form onSubmit={uploadProfileInfo}>
                    <div>
                            <input type="text" defaultValue={data.userName} name="userName" id="profile-username" placeholder={data.userName}
                                   onChange={(e) => setData({...data, [e.target.userName]: e.target.value})}/>
                    </div>
                    <div>
                        <label>
                            Bio
                            <input id="profile-bio" defaultValue={data.bio} name="bio" type="text"
                            onChange={(e) => setData({...data, [e.target.bio]: e.target.value})}/>
                        </label>
                        <label>
                            Address
                            <input id="profile-address" defaultValue={data.address} name="address" type="text"
                                   onChange={(e) => setData({...data, [e.target.address]: e.target.value})}/>
                        </label>
                        <label>
                            Phone Number
                            <input id="profile-phone" defaultValue={data.phone} type="text" name="phone"
                                   onChange={(e) => setData({...data, [e.target.phone]: e.target.value})}/>
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
                        {data.userName}
                    </div>
                    <label>
                        Bio
                        <div id="profile-bio">{data.bio}</div>
                    </label>
                    <label>
                        Address
                        <div id="profile-address">{data.address}</div>
                    </label>
                    <label>
                        Phone Number
                        <div id="profile-phone">{data.phone}</div>
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