import { useEffect, useState } from 'react';
import { getFavoriteItems, removeFavorite, getDistance, getRating } from '../services/ItemService.jsx';

export default function FavoritePage() {
    const [favorites, setFavorites] = useState([]);
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [distanceFilter, setDistanceFilter] = useState('');
    const [distances, setDistances] = useState({});
    const [ratings, setRatings] = useState({});
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        if (!userID) {
            console.error("User ID is not provided.");
            return;
        }

        const fetchFavorites = async () => {
            try {
                const res = await getFavoriteItems(userID);
                const data = res.data;

                setFavorites(data);
                setFilteredFavorites(data);

                fetchDistances(data);
                fetchRatings(data);
            } catch (error) {
                console.error("Error fetching favorite items:", error);
            }
        };

        fetchFavorites();
    }, [userID]);

    const fetchDistances = async (items) => {
        const newDistances = {};
        for (let item of items) {
            try {
                const response = await getDistance(item.itemID, userID);
                newDistances[item.itemID] = response.data;
            } catch (error) {
                console.error(`Failed to fetch distance for item ${item.itemID}:`, error);
            }
        }
        setDistances(newDistances);
    };

    const fetchRatings = async (items) => {
        const newRatings = {};
        for (let item of items) {
            try {
                const response = await getRating(item.itemID);
                newRatings[item.itemID] = response.data;
            } catch (error) {
                console.error(`Failed to fetch rating for item ${item.itemID}:`, error);
            }
        }
        setRatings(newRatings);
    };

    const handleRemoveFavorite = async (itemID) => {
        try {
            await removeFavorite(userID, itemID);
            const updatedFavorites = favorites.filter(item => item.itemID !== itemID);
            setFavorites(updatedFavorites);
            setFilteredFavorites(updatedFavorites);
            console.log(`Removed favorite item ${itemID}`);
        } catch (error) {
            console.error(`Failed to remove favorite item ${itemID}:`, error);
        }
    };

    const handleSearch = () => {
        let filtered = favorites.filter(item =>
            item.itemName.toLowerCase().includes(keyword.toLowerCase())
        );
        if (categoryFilter) {
            filtered = filtered.filter(item => item.itemCategory === categoryFilter);
        }
        if (ratingFilter) {
            filtered = filtered.filter(item => ratings[item.itemID] >= parseInt(ratingFilter));
        }
        if (distanceFilter) {
            filtered = filtered.filter(item => distances[item.itemID] <= parseFloat(distanceFilter));
        }
        setFilteredFavorites(filtered);
    };

    const handleSort = () => {
        let sorted = [...filteredFavorites];
        if (sortOption === 'A-Z') {
            sorted.sort((a, b) => a.itemName.localeCompare(b.itemName));
        } else if (sortOption === 'distance') {
            sorted.sort((a, b) => distances[a.itemID] - distances[b.itemID]);
        } else if (sortOption === 'rating') {
            sorted.sort((a, b) => ratings[b.itemID] - ratings[a.itemID]);
        } else if (sortOption === 'recentlyAdded') {
            sorted.sort((a, b) => b.itemID - a.itemID);
        }
        setFilteredFavorites(sorted);
    };

    useEffect(() => {
        handleSearch();
    }, [keyword, categoryFilter, ratingFilter, distanceFilter]);

    useEffect(() => {
        handleSort();
    }, [sortOption]);

    return (
        <>
            <h2>Your Favorites</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Search favorites..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="A-Z">A-Z</option>
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="recentlyAdded">Recently Added</option>
                </select>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Outdoor Gear">Outdoor Gear</option>
                    <option value="Party Supplies">Party Supplies</option>
                    <option value="Furniture">Furniture</option>
                </select>
                <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                    <option value="">All Ratings</option>
                    <option value="1">1+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                </select>
                <select value={distanceFilter} onChange={(e) => setDistanceFilter(e.target.value)}>
                    <option value="">All Distances</option>
                    <option value="1">1 mile</option>
                    <option value="5">5 miles</option>
                    <option value="10">10 miles</option>
                    <option value="20">20 miles</option>
                </select>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                {filteredFavorites.length === 0 ? (
                    <p>You have no favorite items.</p>
                ) : (
                    <table style={{ width: '100%' }}>
                        <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Distance (miles)</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredFavorites.map(item => (
                            <tr key={`favorite-${item.itemID}`}>
                                <td>{item.itemID}</td>
                                <td>{item.itemName}</td>
                                <td>{item.itemCategory}</td>
                                <td>{distances[item.itemID] !== undefined ? `${distances[item.itemID]} miles` : 'N/A'}</td>
                                <td>{ratings[item.itemID] !== undefined ? ratings[item.itemID] : 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleRemoveFavorite(item.itemID)}>
                                        Remove Favorite
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
