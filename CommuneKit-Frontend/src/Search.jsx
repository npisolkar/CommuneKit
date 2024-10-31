import './styles.css';
import { search, getDistance, getRating } from "./services/ItemService.jsx";
import { useEffect, useState } from 'react';

export default function Search() {
    const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState('time-asc');
    const [results, setResults] = useState([]);
    const [distances, setDistances] = useState({});
    const [ratings, setRatings] = useState({});

    const userID = localStorage.getItem("userID");

    const handleSearch = async () => {
        if (userID) {
            try {
                const response = await search(userID, sort, keyword);
                setResults(response.data);
                fetchDistances(response.data);
                fetchRatings(response.data);
            } catch (error) {
                console.error("Search failed:", error);
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
        return (
            <div key={item.itemID} style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                border: '2px solid green',
                margin: '4px'
            }}>
                <div>Item Name: <a href={`/item/${item.itemID}`}>{item.itemName}</a></div>
                <div>Description: {item.itemDescription}</div>
                <div>Category: {item.itemCategory}</div>
                <div><a href={`/profile/${item.userID ?? 'unknown'}`}>User ID: {item.userID ?? 'N/A'}</a></div>
                <div>Distance: {distances[item.itemID] ? `${distances[item.itemID]} miles` : 'Loading...'}</div>
                <div>Rating: {ratings[item.itemID] !== undefined ? ratings[item.itemID] : 'Loading...'}</div>
            </div>
        );
    };

    return (
        <>
            <div className="search-bar">
                <div>
                    <input
                        type="text"
                        style={{height:"50px", width:"1000px"}}
                        className="search-input"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div id="search-toggles">
                <div className="search-toggle">
                    <h4>Sort</h4>
                    <select
                        name="sort-options"
                        id="sort-options"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="time-asc">Oldest</option>
                        <option value="time-desc">Newest</option>
                        <option value="rating">Rating</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                        <option value="distance">Distance</option>
                    </select>
                </div>
                <div className="search-toggle">
                    <h4>Filter</h4>
                    <select name="filter-options" id="filter-options">
                        <option value="10mi">10 miles</option>
                        <option value="5mi">5 miles</option>
                        <option value="2mi">2 miles</option>
                        <option value="1mi">1 mile</option>
                    </select>
                </div>
                <div className="search-toggle">
                    <h4>Toggles</h4>
                    <select name="toggle-options" id="toggle-options">
                        <option value="idk">IDK</option>
                    </select>
                </div>
            </div>

            <div className="search-results">
                {results.length > 0 ? (
                    results.map(item => formatItemResult(item))
                ) : (
                    <p>No items found. Please try another search.</p>
                )}
            </div>
        </>
    );
}
