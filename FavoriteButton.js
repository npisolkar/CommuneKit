import React from 'react';
import { useFavorites } from './FavoritesContext';

const FavoriteButton = ({ itemId }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const isFavorited = favorites.includes(itemId);

    const handleClick = () => {
        if (isFavorited) {
            removeFavorite(itemId);
        } else {
            addFavorite(itemId);
        }
    };

    return (
        <button onClick={handleClick}>
            {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
};

export default FavoriteButton;
