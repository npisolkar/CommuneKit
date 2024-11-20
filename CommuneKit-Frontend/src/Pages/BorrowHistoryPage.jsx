import React, { useState, useEffect } from 'react';

export default function BorrowingHistory() {
    const userID = localStorage.getItem("userID"); // Get userID from localStorage
    const [borrowedItems, setBorrowedItems] = useState([]);
    const [lentItems, setLentItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const borrowResponse = await fetch(`http://localhost:8080/api/requests/History/borrow/${userID}`);
                const borrowData = await borrowResponse.json();
                setBorrowedItems(borrowData);

                const lendResponse = await fetch(`http://localhost:8080/api/requests/History/lend/${userID}`);
                const lendData = await lendResponse.json();
                setLentItems(lendData);
            } catch (err) {
                setError("Failed to fetch borrowing or lending history.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [userID]);

    if (loading) return <p>Loading borrowing history...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="borrowing-history-page">
            <h1>Borrowing History</h1>

            <div className="history-section">
                <h2>Items Borrowed by You</h2>
                {borrowedItems.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Lender</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Message</th>
                        </tr>
                        </thead>
                        <tbody>
                        {borrowedItems.map((item) => (
                            <tr key={item.requestId}>
                                <td>{item.itemId}</td>
                                <td>{item.lendingUserId}</td>
                                <td>{`${item.startDay}/${item.startMonth}/${item.startYear}`}</td>
                                <td>{`${item.endDay}/${item.endMonth}/${item.endYear}`}</td>
                                <td>{item.message}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>You haven't borrowed any items yet.</p>
                )}
            </div>

            {/* Lending Section */}
            <div className="history-section">
                <h2>Items Lent by You</h2>
                {lentItems.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Borrower</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Message</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lentItems.map((item) => (
                            <tr key={item.requestId}>
                                <td>{item.itemId}</td>
                                <td>{item.borrowingUserId}</td>
                                <td>{`${item.startDay}/${item.startMonth}/${item.startYear}`}</td>
                                <td>{`${item.endDay}/${item.endMonth}/${item.endYear}`}</td>
                                <td>{item.message}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>You haven't lent any items yet.</p>
                )}
            </div>
        </div>
    );
}
