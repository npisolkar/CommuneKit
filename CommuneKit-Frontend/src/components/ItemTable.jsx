import React, { useState, useEffect } from 'react';
import ItemComponent from './ItemComponent.jsx';
import { getItemsByPage } from '../services/ItemService.jsx';

export default function ItemTable({ headName, items, userID }) {
    const [displayItems, setDisplayItems] = useState(items || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreItems, setHasMoreItems] = useState(false);


    useEffect(() => {
        if (items.length > 0) {
            setDisplayItems(items);
        } else if (userID) {
            loadItems(currentPage)
                .catch (err => console.log(err));
        }
    }, [currentPage, userID, items]);

    const loadItems = async (page) => {
        try {
            const response = await getItemsByPage(page, 5);
            if (response.data && Array.isArray(response.data)) {
                setDisplayItems(prevItems => [...prevItems, ...response.data]);
                //setHasMoreItems(response.data.length === 5);
            }
        } catch (error) {
            console.error("Error loading items:", error);
        }
    };

    const loadMoreItems = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <div className="table-container">
            <div className="table-head"><b>{headName}</b></div>
            <table className="item-table">
                <thead>
                    <tr>
                        <th></th>
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
        </div>
    );
}
