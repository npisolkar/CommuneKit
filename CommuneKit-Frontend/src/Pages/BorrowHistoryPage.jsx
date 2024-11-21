import React, { useState, useEffect } from 'react';

export default function BorrowingHistory() {
    const userID = localStorage.getItem("userID"); // Get userID from localStorage
    const [borrowedItems, setBorrowedItems] = useState([]);
    const [lentItems, setLentItems] = useState([]);
    const [borrowedRatings, setBorrowedRatings] = useState({});
    const [lentRatings, setLentRatings] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                // Fetch borrowing history
                const borrowResponse = await fetch(`http://localhost:8080/api/requests/History/borrow/${userID}`);
                const borrowData = await borrowResponse.json();
                setBorrowedItems(borrowData);

                // Fetch lending history
                const lendResponse = await fetch(`http://localhost:8080/api/requests/History/lend/${userID}`);
                const lendData = await lendResponse.json();
                setLentItems(lendData);

                // Fetch ratings for borrowed items
                const borrowedRatings = {};
                for (const item of borrowData) {
                    const ratingResponse = await fetch(`http://localhost:8080/api/reviews/rating/${item.itemId}/${userID}`);
                    const ratingData = await ratingResponse.text(); // Use .text() for plain number response
                    console.log(`Borrowed - ItemID: ${item.itemId}, UserID: ${userID}, Rating:`, ratingData);
                    borrowedRatings[item.requestId] = parseFloat(ratingData) || "N/A"; // Parse the number and handle invalid cases
                }
                setBorrowedRatings(borrowedRatings);

                // Fetch ratings for lent items
                const lentRatings = {};
                for (const item of lendData) {
                    const ratingResponse = await fetch(`http://localhost:8080/api/reviews/rating/${item.itemId}/${item.borrowingUserId}`);
                    const ratingData = await ratingResponse.text(); // Use .text() for plain number response
                    console.log(`Lent - ItemID: ${item.itemId}, BorrowingUserID: ${item.borrowingUserId}, Rating:`, ratingData);
                    lentRatings[item.requestId] = parseFloat(ratingData) || "N/A"; // Parse the number and handle invalid cases
                }
                setLentRatings(lentRatings);

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

            {/* Borrowed Items Section */}
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
                            <th>Rating</th>
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
                                <td>{borrowedRatings[item.requestId]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>You haven't borrowed any items yet.</p>
                )}
            </div>

            {/* Lent Items Section */}
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
                            <th>Rating</th>
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
                                <td>{lentRatings[item.requestId]}</td>
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
