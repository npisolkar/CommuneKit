import './styles.css'
import { useState, useEffect } from 'react'
import {updateRequest} from "./services/RequestService.jsx";

export default function Notifications() {
    const [borrowerPendingRequests, setBorrowerPendingRequests] = useState([]);
    const [borrowerApprovedRequests, setBorrowerApprovedRequests] = useState([]);
    const [borrowerDeniedRequests, setBorrowerDeniedRequests] = useState([]);
    const [lenderPendingRequests, setLenderPendingRequests] = useState([]);
    const [lenderApprovedRequests, setLenderApprovedRequests] = useState([]);
    const [lenderDeniedRequests, setLenderDeniedRequests] = useState([]);
    const [loading, setLoading] = useState(true); // To show a loading state while fetching

    // Get the userID from localStorage
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                // Borrower APIs (sent by me)
                const borrowerPendingResponse = await fetch(`http://localhost:8080/api/requests/borrower/pending/${userID}`);
                const borrowerPendingData = await borrowerPendingResponse.json();
                setBorrowerPendingRequests(borrowerPendingData);

                const borrowerApprovedResponse = await fetch(`http://localhost:8080/api/requests/borrower/approved/${userID}`);
                const borrowerApprovedData = await borrowerApprovedResponse.json();
                setBorrowerApprovedRequests(borrowerApprovedData);

                const borrowerDeniedResponse = await fetch(`http://localhost:8080/api/requests/borrower/denied/${userID}`);
                const borrowerDeniedData = await borrowerDeniedResponse.json();
                setBorrowerDeniedRequests(borrowerDeniedData);

                // Lender APIs (sent to me)
                const lenderPendingResponse = await fetch(`http://localhost:8080/api/requests/lender/pending/${userID}`);
                const lenderPendingData = await lenderPendingResponse.json();
                setLenderPendingRequests(lenderPendingData);

                const lenderApprovedResponse = await fetch(`http://localhost:8080/api/requests/lender/approved/${userID}`);
                const lenderApprovedData = await lenderApprovedResponse.json();
                setLenderApprovedRequests(lenderApprovedData);

                const lenderDeniedResponse = await fetch(`http://localhost:8080/api/requests/lender/denied/${userID}`);
                const lenderDeniedData = await lenderDeniedResponse.json();
                setLenderDeniedRequests(lenderDeniedData);
            } catch (error) {
                console.error("Failed to fetch requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [userID]); // Add userID as a dependency so it re-fetches if the userID changes

    const handleApproval = async (requestId, isApproved) => {
        const requestBody = {
            isApproved: isApproved, // field you want to update
        };

        try {
            const response = await updateRequest(requestId, requestBody);

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            if(error.status === 401||error.status === 500){
                alert("Request with overlapping time already exists, cannot approve request");

            }
            console.error('Error:', error);
        }
        window.location.reload();
    };

    const formatRequestBorrower = (request) => {
        return(
            <div style = {{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                border: '2px solid green',
                margin: '4px'
            }}>
                <div>Request ID: {request.requestId}</div>
                <div><a href={"/profile/"+request.lendingUserId}>Lender ID: {request.lendingUserId}</a></div>
                <div><a href={"/item/"+request.itemId}>Item ID: {request.itemId}</a></div>
                <div>Start Date: {request.startDay}/{request.startMonth}/{request.startYear}</div>
                <div>End Date: {request.endDay}/{request.endMonth}/{request.endYear}</div>


            </div>

        )
        // Lending User ID: ${request.lendingUserId}, Item ID: ${request.itemId}, Start Date: ${request.startDay}/${request.startMonth}/${request.startYear}, End Date: ${request.endDay}/${request.endMonth}/${request.endYear}, Message: ${request.message}`;
    };
    const formatRequestLender = (request) => {
        return(
            <div style = {{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                border: '2px solid green',
                margin: '4px'
            }}>
                <div>Request ID: {request.requestId}</div>
                <div><a href={"/profile/"+request.borrowingUserId}>Borrower ID: {request.borrowingUserId}</a></div>
                <div><a href={"/item/"+request.itemId}>Item ID: {request.itemId}</a></div>
                <div>Start Date: {request.startDay}/{request.startMonth}/{request.startYear}</div>
                <div>End Date: {request.endDay}/{request.endMonth}/{request.endYear}</div>
            </div>

        )
        // Lending User ID: ${request.lendingUserId}, Item ID: ${request.itemId}, Start Date: ${request.startDay}/${request.startMonth}/${request.startYear}, End Date: ${request.endDay}/${request.endMonth}/${request.endYear}, Message: ${request.message}`;
    };

    if (loading) {
        return <h2>Loading notifications...</h2>;
    }

    return (
        <div id="notifs-box">
            <div id="notif-title">
                <h1>Notifications</h1>
            </div>

            {/* Section for Requests Sent by Me (Borrower) */}
            <div>
                <h2>Sent by Me (Borrower)</h2>

                <h3>Pending Requests:</h3>
                {borrowerPendingRequests.length > 0 ? (
                    <ul>
                        {borrowerPendingRequests.map(request => (
                            <li key={request.requestId}>{formatRequestBorrower(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No pending requests.</p>
                )}

                <h3>Approved Requests:</h3>
                {borrowerApprovedRequests.length > 0 ? (
                    <ul>
                        {borrowerApprovedRequests.map(request => (
                            <li key={request.requestId}>{formatRequestBorrower(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No approved requests.</p>
                )}

                <h3>Denied Requests:</h3>
                {borrowerDeniedRequests.length > 0 ? (
                    <ul>
                        {borrowerDeniedRequests.map(request => (
                            <li key={request.requestId}>{formatRequestBorrower(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No denied requests.</p>
                )}
            </div>

            {/* Section for Requests Sent to Me (Lender) */}
            <div>
                <h2>Sent to Me (Lender)</h2>

                <h3>Pending Requests:</h3>
                {lenderPendingRequests.length > 0 ? (
                    <ul>
                        {lenderPendingRequests.map(request => (
                            <li style={{
                                paddingBottom: '10px'
                            }}
                                key={request.requestId}>
                                {formatRequestLender(request)}
                                <button onClick={() => handleApproval(request.requestId, true)}>Approve</button>
                                <button onClick={() => handleApproval(request.requestId, false)}>Deny</button>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No pending requests.</p>
                )}

                <h3>Approved Requests:</h3>
                {lenderApprovedRequests.length > 0 ? (
                    <ul>
                        {lenderApprovedRequests.map(request => (
                            <li key={request.requestId}>{formatRequestLender(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No approved requests.</p>
                )}

                <h3>Denied Requests:</h3>
                {lenderDeniedRequests.length > 0 ? (
                    <ul>
                        {lenderDeniedRequests.map(request => (
                            <li key={request.requestId}>{formatRequestLender(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No denied requests.</p>
                )}
            </div>
        </div>
    )
}
