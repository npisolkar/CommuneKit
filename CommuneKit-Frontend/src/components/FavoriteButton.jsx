import { useState, useEffect } from 'react';
import {favoriteItem, removeFavorite} from '../services/ItemService.jsx';
import axios from 'axios';

export default function FavoriteButton({ itemID, userID }) {
    const [favorite, setFavorite] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!userID) {
            console.error("User ID is undefined or null");
            return;
        }
        // Fetch favorite status when component loads
        const fetchFavoriteStatus = async () => {
            setLoading(true)
            try {
                // Fetch all favorite items for the user
                const response = await axios.get(`http://localhost:8080/api/favorites/${userID}`);
                const favoriteItems = response.data;
                const isItemFavorite = favoriteItems.some(item => item.itemID === itemID);
                setFavorite(isItemFavorite);
            } catch (error) {
                console.error("Error fetching favorite status:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchFavoriteStatus()
            .catch (err => console.log(err));
    }, [userID, itemID]);

    const handleAddFavorite = async () => {
        setLoading(true);
        try {
            await favoriteItem(userID, itemID);
            setFavorite(true);
        } catch (error) {
            console.error("Error adding to favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async () => {
        setLoading(true);
        try {
            await removeFavorite(userID, itemID);
            setFavorite(false);
        } catch (error) {
            console.error("Error removing from favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="item-page-favorite-button">
            {loading ? (
                <button disabled>Loading...</button>
            ) : favorite ? (
                <button onClick={handleRemoveFavorite} className="fav-button"><img src="/full-bookmark.jpg" alt="star"
                                                                                   style={{width: "30px", height: "40px", objectFit: "cover"}}/></button>
            ) : (
                <button onClick={handleAddFavorite} className="fav-button"><img src="/empty-bookmark.jpg" alt="star"
                                                                                style={{width: "30px", height: "40px", objectFit: "cover"}}/></button>
            )}
        </div>
    );
}
