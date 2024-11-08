import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {getReports, updateReports} from "../services/ReportService.jsx";
import {updateRequest} from "../services/RequestService.jsx";
import {banUser, unbanUser} from "../services/UserService.jsx";
export default function AdminPage(){
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [pendingReports, setPendingReports] = useState([]);
    const [pendingBanned, setPendingBanned] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bannedLoading, setBannedLoading] = useState(true);

    useEffect(() => {
        if (! (role === 'ADMIN')) {
            navigate('/home');
        }

        const fetchReports = async () => {
            try{
                const pendingReportResponse = await fetch(`http://localhost:8080/api/reports/pending`);
                const pendingReportData = await pendingReportResponse.json();
                setPendingReports(pendingReportData);
            } catch (error) {
                console.error("Failed to fetch requests:", error);
            } finally {
                setLoading(false);
            }


        }
        fetchReports();
        const fetchBanned = async () => {
            try{
                const pendingBannedResponse = await fetch(`http://localhost:8080/api/users/banned`);
                const pendingBannedData = await pendingBannedResponse.json();
                setPendingBanned(pendingBannedData);
            } catch (error) {
                console.error("Failed to fetch banned users:", error);
            } finally {
                setBannedLoading(false);
            }


        }
        fetchBanned();
    },[])
    const handleBan = async (reportID, reportedUserID) => {
        const requestBody = {
            status: "banned" // field you want to update
        };
        try {
            const response = await updateReports(reportID, requestBody);
            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        try {
            const response = await banUser(reportedUserID, requestBody);
            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }


    };
    const handleDismiss = async (reportID) => {
        const requestBody = {
            status: "dismissed" // field you want to update
        };
        try {
            const response = await updateReports(reportID, requestBody);
            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleUnban = async (userID) => {

        try {
            const response = await unbanUser(userID);
            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formatReports = (report) => {
        return(
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
                        <div>Report ID: {report.reportID}</div>
                        <div><a href={"/profile/" + report.reportingUserID}>Reporting User ID: {report.reportingUserID}</a>
                        </div>
                        <div><a href={"/profile/" + report.reportedUserID}>Reported ID: {report.reportedUserID}</a></div>

                    </div>
                    <div>Reason: {report.reason}</div>
                </div>
                    <button onClick={() => handleBan(report.reportID, report.reportedUserID)}>Ban</button>
                    <button onClick={() => handleDismiss(report.reportID)}>Dismiss</button>
            </div>



        )
        // Lending User ID: ${request.lendingUserId}, Item ID: ${request.itemId}, Start Date: ${request.startDay}/${request.startMonth}/${request.startYear}, End Date: ${request.endDay}/${request.endMonth}/${request.endYear}, Message: ${request.message}`;
    };
    const formatBanned = (user) => {
        return(
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
                        <div>User ID: {user.userId}</div>

                    </div>
                </div>
                <button onClick={() => handleUnban(user.userId)}>Unban</button>
            </div>



        )
        // Lending User ID: ${request.lendingUserId}, Item ID: ${request.itemId}, Start Date: ${request.startDay}/${request.startMonth}/${request.startYear}, End Date: ${request.endDay}/${request.endMonth}/${request.endYear}, Message: ${request.message}`;
    };


    return (
        <div>
            <h3>Pending Reports:</h3>
            {pendingReports.length > 0 ? (
                <ul>
                    {pendingReports.map(report => (
                        <li key={report.reportID}>{formatReports(report)}</li>
                    ))}
                </ul>
            ) : (
                <p>No pending reports.</p>
            )}
            <h3>BannedUsers:</h3>
            {pendingBanned.length > 0 ? (
                <ul>
                    {pendingBanned.map(user => (
                        <li key={user.userId}>{formatBanned(user)}</li>
                    ))}
                </ul>
            ) : (
                <p>No banned users.</p>
            )}
        </div>

    )
};
