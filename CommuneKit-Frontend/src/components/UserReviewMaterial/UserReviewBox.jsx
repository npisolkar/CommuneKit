import ReviewComponent from "../ReviewComponent.jsx";
import {useState, useEffect} from 'react'
import {createUserReview, getUserRatingById, getUserReviewsByUser} from "../../services/UserReviewService.jsx";
import UserReview from "./UserReview.jsx";
import StarRating from "./StarRating.jsx";
import {useNavigate} from "react-router-dom";


export default function UserReviewBox({username, userID, isOwn}) {
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const navigate = useNavigate();
    const [newReview, setNewReview] = useState({
        reviewerID: localStorage.getItem("userID"),
        userID: userID,
        reviewText: "",
        rating: ''
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewReview({...newReview, [name]: value})
    }

    useEffect(() => {
        getUserReviewsByUser(userID)
            .then(res => {
                setReviews(res.data)
            })
            .catch(err => console.log(err))

        getUserRatingById(userID)
            .then(res => {
                setAvgRating(Math.round(100 * res.data)/100)
            })
            .catch(err => console.log(err))

        setNewReview({
            reviewerID: localStorage.getItem("userID"),
            userID: userID,
            reviewText: "",
            rating: ''
        })
    }, [userID])

    const submitReview = async (e) => {
        e.preventDefault()

        if (newReview.review_text === "") {
            console.log("need longer message")
            alert("please have a descriptive message accompanying your review")
        } else {

            try {
                console.log("NOW POSTING: " + JSON.stringify(newReview))
                const responseData = await createUserReview(newReview);
                //console.log("submit:" + responseData);

                setNewReview({
                    reviewerID: localStorage.getItem("userID"),
                    userID: userID,
                    review_text: '',
                    rating: 0
                })
            } catch (error) {
                console.log("ERROR when uploading/editing item")
                console.log(error);
            }
        }

    }


    return (
        <>
            <div>
                <p>{username ? username : "This user"}'s average rating: {avgRating}</p>
                <StarRating rating={avgRating}></StarRating>
            </div>
            {/*<div>*/}
            {/*    {!(userID===localStorage.getItem("userID")) ?*/}
            {/*        <form onSubmit={submitReview}>*/}
            {/*            <div id="user-review-form">*/}
            {/*                <input type="number" min="0" max="5" step="1" name="rating"*/}
            {/*                       value={newReview.rating} onChange={handleInputChange}/>*/}

            {/*                <input type="text" name="reviewText"*/}
            {/*                       value={newReview.review_text} onChange={handleInputChange}/>*/}
            {/*                <button type="submit">Send</button>*/}
            {/*            </div>*/}
            {/*        </form>*/}
            {/*        : null}*/}
            {/*</div>*/}
            <div className = "leave_review_section">
                {!(userID === localStorage.getItem("userID")) && (
                    <>
                    <h3>Leave a Review!</h3>
                    <form className="user_review_form" onSubmit={submitReview}>
                        <div >
                            <input
                                type="number"
                                min="1"
                                max="5"
                                step="1"
                                name="rating"
                                value={newReview.rating}
                                onChange={handleInputChange}
                                placeholder="Rating (1-5)"
                                required
                            />
                            <textarea
                                name="reviewText"
                                value={newReview.review_text}
                                onChange={handleInputChange}
                                placeholder="Write your review here..."
                                required
                            />
                            <button type="submit">Send</button>
                        </div>

                    </form>
                    </>
                )}
            </div>
            <div className="reviews_box">
                {reviews.length > 0 ?
                    reviews.map(review => (
                        <UserReview key={review.reviewID} reviewDto={review}/>
                    ))
                    : <p>No Reviews of this user yet. Let us know how they are!</p>
                }
            </div>
        </>
    )
}



