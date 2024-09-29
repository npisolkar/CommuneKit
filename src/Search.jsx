import './styles.css'
import { useState } from 'react'
import {ToggleTextField} from "./Profile.jsx";

export default function Search() {
    return (
        <>
            <div className="search-bar">
                <div>
                    <ToggleTextField height={"50px"} width={"1000px"} className="search-input"/>
                </div>
                <div>
                    <button>Search</button>
                </div>
            </div>
            <div id="search-toggles">
            <div className="search-toggle">
                <h4>Sort</h4>
                <select name="sort-options" id="sort-options">
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                    <option value="rate-asc">Rating</option>
                    <option value="time-asc">Oldest</option>
                    <option value="time-desc">Newest</option>
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
        </>
    )
}