import { useState, useEffect } from 'react'

export default function BorrowingHistory() {
    // Placeholder for borrower and lender data
    const [borrowedItems, setBorrowedItems] = useState([
        { id: 1, name: "Lawnmower", otherParty: "John Doe", dateBorrowed: "2024-11-01", dateReturned: "2024-11-10", rating: 4.5 },
        { id: 2, name: "Power Drill", otherParty: "Mike Johnson", dateBorrowed: "2024-09-05", dateReturned: "2024-09-08", rating: 4.0 },
    ]);
    const [lentItems, setLentItems] = useState([
        { id: 1, name: "Party Tent", otherParty: "Jane Smith", dateBorrowed: "2024-10-15", dateReturned: "2024-10-18", rating: 5.0 },
    ]);

    useEffect(() => {
        // Placeholder for API calls
        // Example for borrowers:
        // fetch("/api/borrow-events?role=borrower")
        //     .then((response) => response.json())
        //     .then((data) => setBorrowedItems(data))
        //     .catch((error) => console.error(error));
        //
        // Example for lenders:
        // fetch("/api/borrow-events?role=lender")
        //     .then((response) => response.json())
        //     .then((data) => setLentItems(data))
        //     .catch((error) => console.error(error));
    }, []);

    return (
        <div className="borrowing-history-page">
            <h1>Borrowing History</h1>

            <div className="history-section">
                <h2>Items Borrowed by You</h2>
                {borrowedItems.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Lender</th>
                            <th>Date Borrowed</th>
                            <th>Date Returned</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {borrowedItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.otherParty}</td>
                                <td>{item.dateBorrowed}</td>
                                <td>{item.dateReturned}</td>
                                <td>{item.rating}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No borrowed items found.</p>
                )}
            </div>

            <div className="history-section">
                <h2>Items Lent by You</h2>
                {lentItems.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Borrower</th>
                            <th>Date Borrowed</th>
                            <th>Date Returned</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.otherParty}</td>
                                <td>{item.dateBorrowed}</td>
                                <td>{item.dateReturned}</td>
                                <td>{item.rating}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No lent items found.</p>
                )}
            </div>
        </div>
    );
}
