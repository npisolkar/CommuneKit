import './styles.css';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getUserById, updateUser} from "./services/UserService.jsx";

axios.defaults.baseURL = "http://localhost:8080/api/users";

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
function ReportButton({isOwn, onClick, bodyText}) {
    if (!isOwn) {
        return (
            <button onClick={onClick}>{bodyText}</button>
        )
    }
    else {
        return null
    }
}

function ItemsButton({ isOwn }) {
    if (isOwn) {
        return (
            <div id="my-items-button">
                <Link to={"/profile/" + localStorage.getItem("userID") + "/my-items"}>
                    <button>View My Items</button>
                </Link>
            </div>

        )
    } else {
        return null
    }
}

export default function Profile() {
    const navigate = useNavigate();
    const { userID } = useParams();
    const [isClicked, setClicked] = useState(false);
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

    useEffect(() => {
        getUserById(userID)
            .then(res => {
                console.log("formdata before fetch: " + JSON.stringify(formData))
                setFormData(res.data);
                console.log("User data fetched:", res.data);
                //console.log("isown:" + isOwn)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [navigate, isClicked])

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
            console.log("trying to submit " + JSON.stringify(formData))
            const profileResponse = await updateUser(userID, JSON.stringify(formData));
            const profileData = profileResponse.data;
            console.log("Profile updated:", profileData);
            setFormData(profileData);
            console.log("formData now set to: " + JSON.stringify(formData))
            onClick();
        }
        catch (error) {
            console.log(error);
        }
    };

    function navigateToResetPassword() {
        navigate('/reset-password');
    }

    const handleReportNav = () => {
        navigate('/report/'+userID)
    }


    return (
        <>
            <div id="profile-image" className="about-box"></div>
            <div><p>Your username: {formData.userName}</p></div>
            {isClicked ? (
                <div className="about-box">

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                <b>First Name</b>

                                <input id="firstName" type="text" name="firstName" value={formData.firstName}
                                   onChange={handleInputChange}/>
                            </label>
                            <label>
                                <b>Last Name</b>
                            </label>
                            <input type="text" name="lastName" value={formData.lastName}
                                   onChange={handleInputChange}/>
                            <label>
                                Email
                                <input type="email" name="email" value={formData.email}
                                       onChange={handleInputChange}/>
                            </label>
                            <label>
                                Bio
                                <input id="profile-bio" value={formData.bio} name="bio" type="text"
                                       onChange={handleInputChange}/>
                            </label>
                            <label>
                                Address
                                <div id="profile-address">{formData.address}</div>
                                <input id="address" value={formData.address} name="address" type="text"
                                       onChange={handleInputChange}/>
                            </label>
                            <label>
                                Phone Number
                                <input id="profile-phone" value={formData.phone} type="text" name="phone"
                                       onChange={handleInputChange}/>
                            </label>
                        </div>
                        <EditButton isOwn={userID === localStorage.getItem('userID')}
                                    handleClick={() => setClicked(!isClicked)} bodyText={"Cancel"}/>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            ) : (

                <div className="about-box">
                    <label>
                        <b>First Name</b>
                    </label>
                    <div>
                        {formData.firstName}
                    </div>
                    <label>
                        <b>Last Name</b>
                    </label>
                        <div>{formData.lastName} </div>

                    <label>
                        <b>Email</b>
                    </label>
                        <div>{formData.email}</div>
                    <label>
                        <b>Bio</b>
                        <div id="profile-bio">{formData.bio}</div>
                    </label>
                    <label>
                        <b>Address</b>
                        <div id="profile-address">{formData.address}</div>
                    </label>
                    <label>
                        <b>Phone Number</b>
                        <div id="profile-phone">{formData.phone}</div>
                    </label>
                    {/*<div id="edit-profile">*/}
                    {/*    <EditButton isOwn={userID === localStorage.getItem('userID')} handleClick={onClick}*/}
                    {/*                bodyText={"Edit Profile"}/>*/}
                    {/*</div>*/}
                    {/*THIS IS THE NEW BROKEN STUFF BELOW*/}

                    {/*<label>Bio*/}
                    {/*    <div>{formData.bio}</div>*/}
                    {/*</label>*/}
                    {/*<label>Address*/}
                    {/*    <div>{formData.address}</div>*/}
                    {/*</label>*/}
                    {/*<label>Phone Number*/}
                    {/*    <div>{formData.phone}</div>*/}
                    {/*</label>*/}
                    <EditButton isOwn={userID === localStorage.getItem('userID')}
                                handleClick={() => setClicked(!isClicked)} bodyText={"Edit Profile"}/>
                    <ItemsButton isOwn={userID === localStorage.getItem('userID')}/>
                    <div id="reset-password">
                        {userID === localStorage.getItem('userID') && (
                            <button onClick={navigateToResetPassword} className="reset-password-button">
                                Reset Password
                            </button>
                        )}
                    </div>
                    <ReportButton isOwn={userID === localStorage.getItem('userID')}
                                  onClick={handleReportNav} bodyText={"Report User"}/>
                </div>

            )}
        </>
    )
}