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

                const approvedResponse = await fetch('http://localhost:8080/api/requests/approved/3');
                const approvedData = await approvedResponse.json();
                setApprovedRequests(approvedData);

                const deniedResponse = await fetch('http://localhost:8080/api/requests/denied/3');
                const deniedData = await deniedResponse.json();
                setDeniedRequests(deniedData);

                const pendingResponse = await fetch('http://localhost:8080/api/requests/pending/3');
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

    if (loading) {
        return <h2>Loading notifications...</h2>;
    }

    const formatRequest = (request) => {
        return `Request ID: ${request.requestId}, Borrowing User ID: ${request.borrowingUserId}, Lending User ID: ${request.lendingUserId}, Item ID: ${request.itemId}, Start Date: ${request.startDay}/${request.startMonth}/${request.startYear}, End Date: ${request.endDay}/${request.endMonth}/${request.endYear}, Message: ${request.message}`;
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
                            <li key={request.requestId}>{formatRequest(request)}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No pending requests.</p>
                )}
            </div>
        </>
    )
}
