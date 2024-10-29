import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { favoriteItem, removeFavorite } from '../services/ItemService.jsx';
import axios from 'axios';

export default function ItemComponent({ data, userID }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userID) {
            console.error("User ID is undefined or null");
            return;
        }

        // Fetch favorite status when component loads
        const fetchFavoriteStatus = async () => {
            try {
                // Fetch all favorite items for the user
                const response = await axios.get(`http://localhost:8080/api/favorites/${userID}`);
                const favoriteItems = response.data;
                const isItemFavorite = favoriteItems.some(item => item.itemID === data.itemID);
                setIsFavorite(isItemFavorite);
            } catch (error) {
                console.error("Error fetching favorite status:", error);
            }
        };
        fetchFavoriteStatus();
    }, [userID, data.itemID]);

    const handleAddFavorite = async () => {
        if (!userID) {
            console.error("User ID is undefined or null");
            return;
        }

        setLoading(true);
        try {
            await favoriteItem(userID, data.itemID);
            setIsFavorite(true);
        } catch (error) {
            console.error("Error adding to favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async () => {
        if (!userID) {
            console.error("User ID is undefined or null");
            return;
        }

        setLoading(true);
        try {
            await removeFavorite(userID, data.itemID);
            setIsFavorite(false);
        } catch (error) {
            console.error("Error removing from favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <tr key={`item-${data.itemID}`}> {/* Using itemID as a unique key */}
            <td>{data.itemID}</td>
            <td>{data.itemName}</td>
            <td>{data.itemDescription}</td>
            <td>{data.itemCategory}</td>
            <td><Link to={`/item/${data.itemID}`}><button>To Item Page</button></Link></td>
            <td><Link to="/profile"><button>To User Page</button></Link></td>
            <td>
                {loading ? (
                    <button disabled>Loading...</button>
                ) : isFavorite ? (
                    <button onClick={handleRemoveFavorite}>Remove Favorite</button>
                ) : (
                    <button onClick={handleAddFavorite}>Favorite</button>
                )}
            </td>
        </tr>
    );
}
