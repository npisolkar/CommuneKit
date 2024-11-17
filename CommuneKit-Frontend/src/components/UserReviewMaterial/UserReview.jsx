/* A component that contains the JS necessary to render
*  a single review on an item's page */

import {useState, useEffect} from 'react'
import {getUserById} from "../../services/UserService.jsx";
import {Link, useNavigate} from "react-router-dom";
import StarRating from "./StarRating.jsx";

export default function UserReview({reviewDto}) {
    const [reviewerName, setReviewerName] = useState('')
    const [directingAway, setDirectingAway] = useState(false)
    const navigate = useNavigate();


    if (!reviewDto) return null

    useEffect(() => {
        getUserById(reviewDto.reviewerID)
            .then (res => {
                setReviewerName(res.data.userName)
            })
            .catch (err => console.log(err))
        if (directingAway) {
            setDirectingAway(false);
            navigate(`/profile/${reviewDto.reviewerID}`)
        }
    }, [directingAway])

    function goAway() {
        setDirectingAway(true)
    }

    return (
        <div className="user-review">
            <div className="user-review-header">
                <StarRating rating={reviewDto.rating}></StarRating>
                <p className="rating">Rating: {reviewDto.rating}</p>
                {/*<Link to={"/profile/" + reviewDto.reviewerID}>*/}
                    <button className="profile-button"
                        onClick={goAway}>{reviewerName}</button>
                {/*</Link>*/}
            </div>
            <p className="review-text">{reviewDto.reviewText}</p>
        </div>
        // <div className="user-review">
        //     <Link to={"/profile/" + reviewDto.reviewerID}><button>{reviewerName}</button></Link>
        //     <p>Rating: {reviewDto.rating}</p>
        //     <p>{reviewDto.reviewText}</p>
        // </div>
    )
}