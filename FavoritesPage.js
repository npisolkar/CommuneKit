import React, { useEffect, useState } from 'react';
import { useFavorites } from './FavoritesContext';

const FavoritesPage = () => {
    const { favorites, clearFavorites } = useFavorites();
    const [favoriteItems, setFavoriteItems] = useState([]);

    useEffect(() => {
        const fetchFavoriteItems = async () => {
            const responses = await Promise.all(
                favorites.map((itemId) => fetch(`/api/items/${itemId}`).then((res) => res.json()))
            );
            setFavoriteItems(responses);
        };

        fetchFavoriteItems();
    }, [favorites]);

    return (
        <div>
            <h1>Your Favorite Items</h1>
            <button onClick={clearFavorites}>Clear All Favorites</button>
            <ul>
                {favoriteItems.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesPage;
