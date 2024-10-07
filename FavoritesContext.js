import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (itemId) => {
        setFavorites((prev) => [...prev, itemId]);
    };

    const removeFavorite = (itemId) => {
        setFavorites((prev) => prev.filter((id) => id !== itemId));
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
