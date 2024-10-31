import React, { useState, useEffect } from 'react';
import ItemComponent from './components/ItemComponent.jsx';
import { getItemsByPage } from './services/ItemService.jsx';

export default function ItemTable({ headName, items, userID }) {
    const [displayItems, setDisplayItems] = useState(items || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    useEffect(() => {
        if (items.length > 0) {
            setDisplayItems(items);
        } else if (userID) {
            loadItems(currentPage);
        }
    }, [currentPage, userID, items]);

    const loadItems = async (page) => {
        try {
            const response = await getItemsByPage(page, 5);
            if (response.data && Array.isArray(response.data)) {
                setDisplayItems(prevItems => [...prevItems, ...response.data]);
                setHasMoreItems(response.data.length === 5);
            }
        } catch (error) {
            console.error("Error loading items:", error);
        }
    };

    const loadMoreItems = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <h1>{headName}</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {displayItems.map(item => (
                    <ItemComponent key={`item-${item.itemID}-${userID}`} data={item} userID={userID} />
                ))}
                </tbody>
            </table>
            {hasMoreItems && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <button onClick={loadMoreItems}>Load More</button>
                </div>
            )}
        </>
    );
}
