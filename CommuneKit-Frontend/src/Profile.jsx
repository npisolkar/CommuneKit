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

function ItemsButton({isOwn}) {
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
/*
    if (userID === localStorage.getItem('userID')) {
        const isOwn = true;
    } else {
        const isOwn = false;
    }

 */
    useEffect(() => {
        getUserById(userID)
            .then(res => {
                setFormData(res.data);
                console.log("User data fetched:", res.data);
                //console.log("isown:" + isOwn)
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
            /*const profileJson = {
                userName: formData.userName,
                password: formData.password,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                isBanned: false
            }*/
            //console.log("profileJSON" + JSON.stringify(profileJson))
            console.log("trying to submit " + JSON.stringify(formData))
            //console.log("username:" + formData.userName)
            const profileResponse = await updateUser(userID, JSON.stringify(formData));
            const profileData = profileResponse.data;
            console.log("Profile updated:", profileData);
            setFormData(profileData);
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
            {isClicked ? (
                <div className="about-box">
                    <div><p>Your username: {formData.userName}</p></div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                First Name
                                <input type="text" name="firstName" defaultValue={formData.firstName}
                                       onChange={handleInputChange}/>
                            </label>
                            <label>
                                Last Name
                                <input type="text" name="lastName" defaultValue={formData.lastName}
                                       onChange={handleInputChange}/>
                            </label>
                            <label>
                                Email
                                <input type="email" name="email" defaultValue={formData.email}
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
                        <EditButton isOwn={userID === localStorage.getItem('userID')} handleClick={onClick}
                                    bodyText={"Edit Profile"}/>
                    </div>
                    {/*THIS IS THE NEW BROKEN STUFF BELOW*/}
                    <div>{formData.userName}</div>
                    <label>Bio
                        <div>{formData.bio}</div>
                    </label>
                    <label>Address
                        <div>{formData.address}</div>
                    </label>
                    <label>Phone Number
                        <div>{formData.phone}</div>
                    </label>
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