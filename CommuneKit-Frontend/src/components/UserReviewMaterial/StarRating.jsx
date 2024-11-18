import React from 'react';

const StarRating = ({ rating }) => {
    const roundedRating = Math.round(rating); // Round the rating to the nearest integer
    const maxStars = 5; // Total stars to display
    const goldStars = Array(roundedRating).fill("../gold_star.jpg"); // Array of gold stars
    const darkStars = Array(maxStars - roundedRating).fill("../dark_star.jpg"); // Array of dark stars
    console.log(roundedRating, goldStars, darkStars);

    return (
        <div className="star-rating">
            {goldStars.map((star, index) => (
                <img key={`gold-${index}`} src={star} alt="Gold Star" className="star"/>
            ))}
            {darkStars.map((star, index) => (
                <img key={`dark-${index}`} src={star} alt="Dark Star" className="star" />
            ))}
        </div>
    );
};

export default StarRating;
