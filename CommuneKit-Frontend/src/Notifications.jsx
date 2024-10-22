import './styles.css'
import { useState, useEffect } from 'react'

export default function Notifications() {
    const [sentRequests, setSentRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [deniedRequests, setDeniedRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true); // To show a loading state while fetching

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const sentResponse = await fetch('http://localhost:8080/api/requests/sent-to/1');
                const sentData = await sentResponse.json();
                setSentRequests(sentData);

                const approvedResponse = await fetch('http://localhost:8080/api/requests/approved/1');
                const approvedData = await approvedResponse.json();
                setApprovedRequests(approvedData);

                const deniedResponse = await fetch('http://localhost:8080/api/requests/denied/1');
                const deniedData = await deniedResponse.json();
                setDeniedRequests(deniedData);

                const pendingResponse = await fetch('http://localhost:8080/api/requests/pending/1');
                const pendingData = await pendingResponse.json();
                setPendingRequests(pendingData);
            } catch (error) {
                console.error("Failed to fetch requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []); // Empty dependency array to only run this effect on component mount

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
                setPendingRequests(pendingRequests.filter(request => request.requestId !== requestId));

                // Optionally, you can add the request to the approved/denied list based on `isApproved`
                if (isApproved) {
                    const approvedRequest = pendingRequests.find(req => req.requestId === requestId);
                    setApprovedRequests([...approvedRequests, approvedRequest]);
                } else {
                    const deniedRequest = pendingRequests.find(req => req.requestId === requestId);
                    setDeniedRequests([...deniedRequests, deniedRequest]);
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
            <div>
                <h2>Sent Requests:</h2>
                {sentRequests.length > 0 ? (
                    <ul>
                        {sentRequests.map(request => (
                            <li key={request.requestId}>{formatRequest(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No sent requests.</p>
                )}

                <h2>Approved Requests:</h2>
                {approvedRequests.length > 0 ? (
                    <ul>
                        {approvedRequests.map(request => (
                            <li key={request.requestId}>{formatRequest(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No approved requests.</p>
                )}

                <h2>Denied Requests:</h2>
                {deniedRequests.length > 0 ? (
                    <ul>
                        {deniedRequests.map(request => (
                            <li key={request.requestId}>{formatRequest(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No denied requests.</p>
                )}

                <h2>Pending Requests:</h2>
                {pendingRequests.length > 0 ? (
                    <ul>
                        {pendingRequests.map(request => (
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
            </div>
        </>
    )
}
