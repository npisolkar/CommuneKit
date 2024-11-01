
import { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ReportPage() {
    let {userID} = useParams();
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const navigateToProfile = () => {
        navigate('/profile/'+userID);
    };

    const handleReport = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/reports', {
                reportedUserID: userID,
                reportingUserID: localStorage.getItem('userID'),
                reason: reason,
                status: "Pending"
            });

            navigateToProfile();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Report failed.');
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Reporting User {userID}</h2>

            <form onSubmit={handleReport}>
                <div>
                    <label>Reason:</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Submit Report</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
