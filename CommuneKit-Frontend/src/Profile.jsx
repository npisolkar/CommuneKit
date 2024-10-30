/* Profile: The page which contains all profile information for
*  certain user. The page's behavior should change based on
*  whether one is accessing one's own page or another's. */
import './styles.css'
import React, { useState, useEffect } from 'react'
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import {getUserById, updateUser} from "./services/UserService.jsx";
import {getImageById, uploadImage} from "./services/ImageService.jsx";

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

    //set to true when
    const [pfpChanged, setPfpChanged] = useState(false);

    //image ID for current profile picture that is displayed
    const [displayImageID, setDisplayImageID] = useState('');

    // File for new profile picture
    const [profilePicture, setProfilePicture] = useState(' ');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        //password: '',
        address: '',
        bio: '',
        phone: '',
        profilePicture: ''
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


    useEffect(() => {
       /* if (id === localStorage.getItem("userID")) {
            isOwn = true;
        }*/
        getUserById(localStorage.getItem("userID"))
            .then (res => {
                console.log("SETTING form data initially")
                setFormData(res.data)
                /*setFormData({
                    firstName: JSON.stringify(res.data.firstName),
                    lastName: JSON.stringify(res.data.lastName),
                    userName: JSON.stringify(res.data.userName),
                    email: JSON.stringify(res.data.email),
                    //password: '',
                    address: JSON.stringify(res.data.address),
                    bio: JSON.stringify(res.data.bio),
                    phone: JSON.stringify(res.data.phone),
                    profilePicture: JSON.stringify(res.data.profilePicture)}
                );*/

                //setFormData({ ...formData, ["userName"]: JSON.stringify(res.data.userName)})

                console.log("in get:" + JSON.stringify(res.data));
                // console.log("res.data.username" + res.data.userName);
                // console.log("username in get: " + formData.userName)
                // console.log("profilePicture id in formData: " + formData.profilePicture);
                // console.log("profilePicture id in res.data: " + res.data.profilePicture);
                console.log("formData now : " + JSON.stringify(formData));
                //if profilePicture is non-null in formData...
                if (res.data.profilePicture != null) {
                    //this state for displayImageId is used as the fileId param for the ProfileImage Component
                    setDisplayImageID(res.data.profilePicture || "1");
                    console.log("displayImageId has been set to: " + displayImageID);
                } else {
                    //default pfp is communekit logo
                    setDisplayImageID("1");
                }

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

    const handleFileChange = (e) => {
        console.log(e.target.file);
        setProfilePicture(e.target.files[0]);
        setPfpChanged(true);
    }


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

            //TODO: if profile pic has been changed, when submitting changes
            //  need to start by uploading new image, then set profile picture in
            //  formdata to be the id of the new picture,
            //  AND need to change with setProfilePicture
            if (pfpChanged) {
                let fdata = new FormData()
                fdata.append('image', profilePicture)
                const imageId = await uploadImage(fdata);

                //change ID in user profile to reflect new image ID
                setFormData({ ...formData, ["profilePicture"]: imageId });
                setPfpChanged(false); // note that is has been changed
                setDisplayImageID(imageId);
                setProfilePicture(null);
            }


            const fdata = new FormData();
            fdata.append('firstName', JSON.stringify(formData.firstName));
            fdata.append('lastName', formData.lastName);
            fdata.append('userName', formData.userName);
            fdata.append('password', formData.password);
            fdata.append('email', formData.email);
            fdata.append('password', formData.password);
            fdata.append('phone', formData.phone);
            fdata.append('address', formData.address);
            fdata.append('profilePicture', profilePicture);

            console.log("fdata: " + JSON.stringify(fdata));
            console.log("formData: " + JSON.stringify(formData))

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
                    <ProfileImage fileId={displayImageID}></ProfileImage>

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
                    <ProfileImage fileId={displayImageID}></ProfileImage>

                    <div>
                        <label>Username: </label>
                        {formData.userName}
                    </div>
                    <label>
                        Bio</label>
                        <div id="profile-bio">{formData.bio}</div>

                    <label>
                        Address</label>
                        <div id="profile-address">{formData.address}</div>

                    <label>
                        Phone Number  </label>
                        <div id="profile-phone">{formData.phone}</div>

                    <div id="edit-profile">
                        <EditButton isOwn={userID === localStorage.getItem('userID')} handleClick={onClick} bodyText={"Edit Profile"}/>
                    </div>
                </div>
            }
            <ItemsButton isOwn={userID === localStorage.getItem('userID')}/>
        </>
    )
}

const ProfileImage = ({ fileId }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                console.log("In ProfileImage getting image of fileId: " + fileId)
                const response = getImageById(fileId);

                // Convert binary data to blob and then to an object URL
                const blob = new Blob([response.data], { type: "image/png" });
                const imageUrl = URL.createObjectURL(blob);

                setImageSrc(imageUrl);
            } catch (error) {
                console.error("Error fetching the image", error);
            }
        };

        fetchImage();

        // Clean up the URL object when the component unmounts
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [fileId]);

    return (
        <div>
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt="User Profile"
                    style={{width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%"}}
                />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};