import './styles.css'
import { useState, useEffect } from 'react'

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
        try {
            const response = await fetch(`http://localhost:8080/api/requests/${requestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isApproved }),
            });

            if (response.ok) {
                // Successfully updated, now remove or update the request in the pending list
                setLenderPendingRequests(lenderPendingRequests.filter(request => request.requestId !== requestId));

                // Optionally, you can add the request to the approved/denied list based on `isApproved`
                if (isApproved) {
                    const approvedRequest = lenderPendingRequests.find(req => req.requestId === requestId);
                    setLenderApprovedRequests([...lenderApprovedRequests, approvedRequest]);
                } else {
                    const deniedRequest = lenderPendingRequests.find(req => req.requestId === requestId);
                    setLenderDeniedRequests([...lenderDeniedRequests, deniedRequest]);
                }
            } else {
                console.error("Failed to update the request");
            }
        } catch (error) {
            console.error("Error while approving/denying request:", error);
        }
    };

    const formatRequest = (request) => {
        return `Request ID: ${request.requestId}, Borrowing User ID: ${request.borrowingUserId}, Lending User ID: ${request.lendingUserId}, Item ID: ${request.itemId}, Start Date: ${request.startDay}/${request.startMonth}/${request.startYear}, End Date: ${request.endDay}/${request.endMonth}/${request.endYear}, Message: ${request.message}`;
    };

    if (loading) {
        return <h2>Loading notifications...</h2>;
    }

    return (
        <>
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
                            <li key={request.requestId}>{formatRequest(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No pending requests.</p>
                )}

                <h3>Approved Requests:</h3>
                {borrowerApprovedRequests.length > 0 ? (
                    <ul>
                        {borrowerApprovedRequests.map(request => (
                            <li key={request.requestId}>{formatRequest(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No approved requests.</p>
                )}

                <h3>Denied Requests:</h3>
                {borrowerDeniedRequests.length > 0 ? (
                    <ul>
                        {borrowerDeniedRequests.map(request => (
                            <li key={request.requestId}>{formatRequest(request)}</li>
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
                            <li key={request.requestId}>
                                {formatRequest(request)}
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
                            <li key={request.requestId}>{formatRequest(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No approved requests.</p>
                )}

                <h3>Denied Requests:</h3>
                {lenderDeniedRequests.length > 0 ? (
                    <ul>
                        {lenderDeniedRequests.map(request => (
                            <li key={request.requestId}>{formatRequest(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No denied requests.</p>
                )}
            </div>
        </>
    )
}
