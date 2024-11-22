// src/components/Search.jsx
import './styles.css';
import { search, getDistance, getRating, getCategories } from "./services/ItemService.jsx";
import { useEffect, useState } from 'react';

export default function Search() {
    const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState('time-asc');
    const [category, setCategory] = useState('');
    const [distanceRange, setDistanceRange] = useState('');
    const [ratingRange, setRatingRange] = useState('');
    const [results, setResults] = useState([]);
    const [distances, setDistances] = useState({});
    const [ratings, setRatings] = useState({});
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const userID = localStorage.getItem("userID");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setError("Could not load categories.");
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = async () => {
        if (userID) {
            setIsLoading(true);
            try {
                const response = await search(userID, sort, keyword, category, ratingRange, distanceRange);
                setResults(response.data);
                fetchDistances(response.data);
                fetchRatings(response.data);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.error("User ID is not available in localStorage.");
        }
    };

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

    const formatItemResult = (item) => {
        const distance = distances[item.itemID];
        const rating = ratings[item.itemID];
        return (
            <div key={item.itemID} className="search-result-item">
                <div>Item Name: <a href={`/item/${item.itemID}`}>{item.itemName}</a></div>
                <div>Description: {item.itemDescription}</div>
                <div>Category: {item.itemCategory}</div>
                <div><a href={`/profile/${item.userID ?? 'unknown'}`}>User ID: {item.userID ?? 'N/A'}</a></div>
                <div>Distance: {distance !== undefined ? `${distance} miles` : 'Loading...'}</div>
                <div>Rating: {rating !== undefined ? rating : 'Loading...'}</div>
            </div>
        );
    };

    return (
        <div id="search-component">
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search for items..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div id="search-toggles">
                <div className="search-toggle">
                    <h4>Sort</h4>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="time-asc">Oldest</option>
                        <option value="rating">Rating</option>
                        <option value="distance">Distance</option>
                    </select>
                </div>

                <div className="search-toggle">
                    <h4>Category</h4>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="search-toggle">
                    <h4>Distance</h4>
                    <select value={distanceRange} onChange={(e) => setDistanceRange(e.target.value)}>
                        <option value="">All</option>
                        <option value="1">Less than 1 mile</option>
                        <option value="2">Less than 2 miles</option>
                        <option value="5">Less than 5 miles</option>
                        <option value="10">Less than 10 miles</option>
                    </select>
                </div>

                <div className="search-toggle">
                    <h4>Rating</h4>
                    <select value={ratingRange} onChange={(e) => setRatingRange(e.target.value)}>
                        <option value="">All</option>
                        <option value="1">≥ 1 Star</option>
                        <option value="2">≥ 2 Stars</option>
                        <option value="3">≥ 3 Stars</option>
                        <option value="4">≥ 4 Stars</option>
                    </select>
                </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div id="search-results">
                {isLoading ? (
                    <p>Loading...</p>
                ) : results.length > 0 ? (
                    results.map(item => formatItemResult(item))
                ) : (
                    <p>No items found. Please try another search.</p>
                )}
            </div>
        </div>
    );
}
