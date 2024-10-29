import './styles.css';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserById, updateUser } from './services/UserService.jsx';

axios.defaults.baseURL = "http://localhost:8080/api/users";

function EditButton({ isOwn, handleClick, bodyText }) {
    if (isOwn) {
        return (
            <button onClick={handleClick}>{bodyText}</button>
        );
    }
    return null;
}

function ItemsButton({ isOwn }) {
    if (isOwn) {
        return (
            <div id="my-items-button">
                <Link to="/profile/my-items">View My Items</Link>
            </div>
        );
    }
    return null;
}

export default function Profile({ isOwn }) {
    const navigate = useNavigate();
    const { userID } = useParams();
    const [isClicked, setClicked] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        address: '',
        bio: '',
        phone: ''
    });

    useEffect(() => {
        const loggedInUserID = localStorage.getItem("userID");
        if (userID === loggedInUserID) {
            isOwn = true;
        }

        getUserById(loggedInUserID)
            .then(res => {
                setFormData(res.data);
                console.log("User data fetched:", res.data);
            })
            .catch(error => console.log(error));
    }, [userID, isOwn]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const uploadProfileInfo = async () => {
        try {
            const profileJson = {
                userName: formData.userName,
                password: formData.password,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                isBanned: false
            };
            const profileResponse = await updateUser(userID, JSON.stringify(profileJson));
            const profileData = profileResponse.data;
            console.log("Profile updated:", profileData);
            setFormData(profileData);
            setClicked(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const navigateToResetPassword = () => {
        navigate('/reset-password');
    };

    return (
        <>
            <div id="profile-image" className="about-box"></div>
            {isClicked ? (
                <div className="about-box">
                    <div>Your username: {formData.userName}</div>
                    <form onSubmit={(e) => { e.preventDefault(); uploadProfileInfo(); }}>
                        <div>
                            <label>
                                First Name
                                <input type="text" name="firstName" defaultValue={formData.firstName} onChange={handleInputChange} />
                            </label>
                            <label>
                                Last Name
                                <input type="text" name="lastName" defaultValue={formData.lastName} onChange={handleInputChange} />
                            </label>
                            <label>
                                Email
                                <input type="email" name="email" defaultValue={formData.email} onChange={handleInputChange} />
                            </label>
                            <label>
                                Bio
                                <input type="text" name="bio" defaultValue={formData.bio} onChange={handleInputChange} />
                            </label>
                            <label>
                                Address
                                <input type="text" name="address" defaultValue={formData.address} onChange={handleInputChange} />
                            </label>
                            <label>
                                Phone Number
                                <input type="text" name="phone" defaultValue={formData.phone} onChange={handleInputChange} />
                            </label>
                        </div>
                        <EditButton isOwn={isOwn} handleClick={() => setClicked(!isClicked)} bodyText={"Cancel"} />
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            ) : (
                <div className="about-box">
                    <EditButton isOwn={isOwn} handleClick={() => setClicked(!isClicked)} bodyText={"Edit Profile"} />
                    <ItemsButton isOwn={isOwn} />
                </div>
            )}
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
