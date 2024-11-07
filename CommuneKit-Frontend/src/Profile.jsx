import './styles.css';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getUserById, updateUser} from "./services/UserService.jsx";
import {getImageById, uploadImage} from "./services/ImageService.jsx";

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

const ProfilePicture = ({ imageId }) => {
   return( <img src={`http://localhost:8080/api/image/fileId/${imageId}`}
         alt="User Profile"
         style={{width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%"}}/>);
}

export default function Profile() {
    const navigate = useNavigate();
    const {userID} = useParams();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isClicked, setClicked] = useState(false);
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
        getUserById(userID)
            .then(res => {
                setFormData(res.data);
                console.log("User data fetched:", res.data);
                //console.log("isown:" + isOwn)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [isClicked])

    function onClick() {
        setClicked(!isClicked);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        console.log(e.target.file);
        setUploadedImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("username at beginning of upload: " + formData.userName)
        console.log("starting change submission routine...");
        try {
            if (uploadedImage) {
                //TODO: if profile pic has been changed, when submitting changes
                //  need to start by uploading new image, then set profile picture in
                //  formdata to be the id of the new picture,
                //  AND need to change with setProfilePicture
                const imageData = new FormData();
                imageData.append("image", uploadedImage);
                let newImageId = await uploadImage(imageData);

                console.log("newImageId: ");
                console.log(newImageId.data);
                console.log("formData before imageId amend: " + JSON.stringify(formData));
                //setFormData({ ...formData, profilePicture: newImageId.data });
                setFormData((prevFormData) => {
                    const updatedFormData = { ...prevFormData, profilePicture: newImageId.data };
                    console.log("Updated formData:", updatedFormData);

                    //setFormData(updatedFormData)
                    return updatedFormData;
                });
                console.log("formData after imageId amend: " + JSON.stringify(formData))
                setUploadedImage(null);

            }


            console.log("trying to submit " + JSON.stringify(formData))
            const profileResponse = await updateUser(userID, JSON.stringify(formData));
            const profileData = profileResponse.data;
            console.log("Profile updated:", profileData);
            setFormData(prev => (profileData));
            console.log("formData now set to: " + JSON.stringify(formData))
            onClick();
            //reload();

        }
        catch (error) {
            console.log(error);
        }
    };

    function navigateToResetPassword() {
        navigate('/reset-password');
    }

    const handleReportNav = () => {
        navigate('/report/' + userID)
    }


    return (
        <>
            <div id="profile-image" className="about-box"></div>
            <div><p>Your username: {formData.userName}</p></div>

            <ProfilePicture imageId={formData.profilePicture}/>

            {isClicked ? (<>
                <div className="form-group">
                    <label>Profile picture:</label>
                    <input type="file" onChange={handleFileChange}/>
                </div>
            </>) : (
                <></>
            )}

            {isClicked ? (
                <div className="about-box">
                    <div><p>Your username: {formData.userName}</p></div>
                    <form onSubmit={handleSubmit}>
                        <div>

                            <label>
                                <b>First Name</b>
                                <input id="firstName" type="text" name="firstName" value={formData.firstName}
                                       onChange={handleInputChange}/>
                            </label>
                            <label>
                                <b>Last Name</b>
                                <input id="profile-bio" value={formData.lastName} name="lastName" type="text"
                                       onChange={handleInputChange}/>
                            </label>
                            <label>
                                Email
                                <input type="email" name="email" value={formData.email}
                                       onChange={handleInputChange}/>
                            </label>
                            <label>
                                <b>Bio</b>
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
                        <div id="profile-bio"> {formData.lastName} </div>
                    </label>
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
};

