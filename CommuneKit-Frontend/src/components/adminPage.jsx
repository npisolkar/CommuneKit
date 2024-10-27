import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {getReports} from "../services/ReportService.jsx";
export default function adminPage(){
    const navigate = useNavigate();
    const [pendingReports, setPendingReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try{
                const pendingReportResponse = await fetch(`http://localhost:8080/api/reports`);
                const pendingReportData = await pendingReportResponse.json();
                setPendingReports(pendingReportData);
            } catch (error) {
                console.error("Failed to fetch requests:", error);
            } finally {
                setLoading(false);
            }


        }
        fetchReports();
    })
    const formatReports = (report) => {
        return(
            <div style = {{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                border: '2px solid green',
                margin: '4px'
            }}>
                <div>Report ID: {report.reportID}</div>
                <div><a href={"/profile/"+report.reportingUserID}>Reporting User ID: {report.reportingUserID}</a></div>
                <div><a href={"/profile/"+report.reportedUserID}>Reported ID: {report.reportedUserID}</a></div>


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
        </div>

    )
};
