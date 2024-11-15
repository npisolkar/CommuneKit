/* A component that contains the JS necessary to render
*  a single review on an item's page */

import {useState, useEffect} from 'react'
import {getUserById} from "../services/UserService.jsx";
import {Link} from "react-router-dom";

export default function UserReview({reviewDto}) {
    const [reviewerName, setReviewerName] = useState('')

    if (!reviewDto) return null

    useEffect(() => {
        getUserById(reviewDto.reviewerID)
            .then (res => {
                setReviewerName(res.data.userName)
            })
            .catch (err => console.log(err))
    }, [])
    return (
        <div className="item-review">
            <Link to={"/profile/" + reviewDto.reviewerID}><button>{reviewerName}</button></Link>
            <p>Rating: {reviewDto.rating}</p>
            <p>{reviewDto.reviewText}</p>
        </div>
    )
}