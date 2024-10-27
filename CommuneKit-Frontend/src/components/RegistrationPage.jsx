import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from "../services/UserService.jsx";

function RegistrationPage() {
    const navigate = useNavigate();
    //const [profilePicture, setProfilePicture] = useState(' ');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        address: '',
        bio: '',
        phone: '',
        profilePicture: null,

    });

    //followed this for explanation: https://www.youtube.com/watch?v=YOGgaYUW1OA
    // const handleFileChange = (e) => {
    //     console.log(e.target.file)
    //     setProfilePicture(e.target.files[0]);
    // }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService

            //const token = localStorage.getItem('token');

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


            console.log("formData: " + JSON.stringify(formData));
            console.log("fData: " + JSON.stringify(fData));
            const userData = await createUser(JSON.stringify(fData));
            console.log(userData)
            localStorage.setItem('token', "LoggedIn")
            localStorage.setItem('role', userData.data.role) //
            localStorage.setItem('userID', userData.data.userId)

            // Clear the form fields after successful registration
            setFormData({
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                address: '',
                bio: '',
                phone: ''
            });
            alert('User registered successfully');
            //localStorage.setItem('token', "LoggedIn")
            //localStorage.setItem('userID', userData.userId)
            navigate('/home');

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user. try again');
        }
    };

    return (
        <div className="auth-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Profile picture:</label>
                    <input type="file" onChange={handleFileChange}/>
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                           required/>
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                           required/>
                </div>
                <div className="form-group">
                    <label>userName:</label>
                    <input type="text" name="userName" value={formData.userName} onChange={handleInputChange}
                           required/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                           required/>
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="address" name="address" value={formData.address} onChange={handleInputChange}
                           placeholder="Enter your address" required/>
                </div>
                <div className="form-group">
                    <label>Bio:</label>
                    <input type="text" name="bio" value={formData.bio} onChange={handleInputChange}
                           placeholder="Enter your bio" required/>
                </div>
                <div className="form-group">
                    <label>Phone number:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange}
                           placeholder="Enter your phone number" required/>
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
);
}

export default RegistrationPage;