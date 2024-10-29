import './styles.css';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { getUserById, updateUser } from "./services/UserService.jsx";

axios.defaults.baseURL = "http://localhost:8080/api/users";

function EditButton({ isOwn, handleClick, bodyText }) {
    if (isOwn) {
        return (
            <button onClick={handleClick}>{bodyText}</button>
        );
    }
    else {
        return null;
    }
}

function ItemsButton({ isOwn }) {
    if (isOwn) {
        return (
            <div id="my-items-button">
                <Link to="/profile/my-items">
                    <button>View My Items</button>
                </Link>
            </div>
        );
    } else {
        return null;
    }
}

export default function Profile({ isOwn }) {
    const navigate = useNavigate();
    const { userID } = useParams();
    const [isClicked, setClicked] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        address: '',
        bio: '',
        phone: ''
    });

    useEffect(() => {
        if (userID === localStorage.getItem("userID")) {
            isOwn = true;
        }
        getUserById(localStorage.getItem("userID"))
            .then(res => {
                setFormData(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [userID, isOwn]);

    function onClick() {
        setClicked(!isClicked);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function uploadProfileInfo() {
        try {
            const profileJson = {
                name: formData.userName,
                password: formData.password,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                isBanned: false,
                isAdmin: false,
                isOwner: false,
            };
            await updateUser(userID, JSON.stringify(profileJson));
        }
        catch (error) {
            console.log(error);
        }
    }

    const navigateToResetPassword = () => {
        navigate('/reset-password');
    };

    return (
        <>
            <div id="profile-image" className="about-box"></div>
            {isClicked ? (
                <div className="about-box">
                    <form onSubmit={uploadProfileInfo}>
                        <div>
                            <input type="text" defaultValue={formData.userName} name="userName" id="profile-username"
                                   onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>
                                Bio
                                <input id="profile-bio" defaultValue={formData.bio} name="bio" type="text"
                                       onChange={handleInputChange} />
                            </label>
                            <label>
                                Address
                                <input id="profile-address" defaultValue={formData.address} name="address" type="text"
                                       onChange={handleInputChange} />
                            </label>
                            <label>
                                Phone Number
                                <input id="profile-phone" defaultValue={formData.phone} type="text" name="phone"
                                       onChange={handleInputChange} />
                            </label>
                        </div>
                        <div id="edit-profile">
                            <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Cancel"} />
                        </div>
                        <div id="submit-profile">
                            <button type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            ) : (
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
                        <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Edit Profile"} />
                    </div>
                </div>
            )}
            <ItemsButton isOwn={isOwn} />
            <div id="reset-password">
                {isOwn && (
                    <button onClick={navigateToResetPassword} className="reset-password-button">
                        Reset Password
                    </button>
                )}
            </div>
            <div id="my-rating">
                <h2>Rating</h2>
            </div>
        </>
    );
}
