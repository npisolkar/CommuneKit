import { useEffect, useState } from 'react';
import { getFavoriteItems, removeFavorite } from '../services/ItemService.jsx';

export default function FavoritePage() {
    const [favorites, setFavorites] = useState([]);
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        if (!userID) {
            console.error("User ID is not provided.");
            return;
        }

        getFavoriteItems(userID)
            .then(res => {
                setFavorites(res.data);
            })
            .catch(error => {
                console.error("Error fetching favorite items:", error);
            });
    }, [userID]);

    const handleRemoveFavorite = async (itemID) => {
        try {
            await removeFavorite(userID, itemID);
            setFavorites(favorites.filter(item => item.itemID !== itemID));
            console.log(`Removed favorite item ${itemID}`);
        } catch (error) {
            console.error(`Failed to remove favorite item ${itemID}:`, error);
        }
    };

    return (
        <>
            <h2>Your Favorites</h2>
            {favorites.length === 0 ? (
                <p>You have no favorite items.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {favorites.map(item => (
                        <tr key={`favorite-${item.itemID}`}>
                            <td>{item.itemID}</td>
                            <td>{item.itemName}</td>
                            <td>
                                <button onClick={() => handleRemoveFavorite(item.itemID)}>Remove Favorite</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}