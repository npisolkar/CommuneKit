import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {createUser, deleteUser} from "../services/UserService.jsx";
import {updateReports} from "../services/ReportService.jsx";

function OwnerPage() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('role')
    useEffect(() => {
         if (! (role === 'OWNER')) {
             navigate('/home');
         }
    }, []);
    const fetchReports = async () => {
        if(loading===true) {
            try {
                const adminResponse = await fetch(`http://localhost:8080/api/users/admins`);
                const adminData = await adminResponse.json();
                setAdmins(adminData);
            } catch (error) {
                console.error("Failed to fetch admins", error);
            } finally {
                setLoading(false);
            }
        }


    }
    fetchReports();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: 'ADMIN',
        lastName: 'ADMIN',
        userName: '',
        email: '',
        password: '',
        address: 'ADMIN',
        bio: 'ADMIN',
        role: 'ADMIN',
        phone: ''

    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService

            console.log(JSON.stringify(formData));
            const userData = await createUser(JSON.stringify(formData));
            console.log(userData)

            // Clear the form fields after successful registration
            setFormData({
                firstName: 'ADMIN',
                lastName: 'ADMIN',
                userName: '',
                email: '',
                password: '',
                address: 'ADMIN',
                bio: 'ADMIN',
                role: 'ADMIN',
                phone: ''
            });
            alert('Admin created successfully');

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while creating admin. try again');
        }
    };

    const formatAdmin = (user) => {
        return (
            <div>
                <div style={{
                    border: '2px solid green',
                    margin: '4px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '10px'
                    }}>
                        <div>Admin ID: {user.userId}</div>

                    </div>
                </div>
                <button onClick={() => handleDelete(user.userId)}>Remove Admin</button>
            </div>
        )
    }
    const handleDelete = async (userId) => {
        try {
            const response = await deleteUser(userId);
            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        window.location.reload();
    }

    return (
        <div className="admin-container">
            <div className="admin-box">
                <h2>Admin Creation</h2>
                <form onSubmit={handleSubmit}>

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
                        <label>Phone number:</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange}
                               placeholder="Enter your phone number" required/>
                    </div>

                    <button type="submit">Create Admin</button>
                </form>
            </div>
            <div className="admin-box">
                <h2>Current Admins</h2>
                {admins.length > 0 ? (
                    <ul>
                        {admins.map(user => (
                            <li key={user.userId}>{formatAdmin(user)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No Admins.</p>
                )}
            </div>

        </div>
    );
}

export default OwnerPage;