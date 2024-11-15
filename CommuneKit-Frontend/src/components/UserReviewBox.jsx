import ReviewComponent from "./ReviewComponent.jsx";
import {useState, useEffect} from 'react'
import {createUserReview, getUserRatingById, getUserReviewsByUser} from "../services/UserReviewService.jsx";
import UserReview from "./UserReview.jsx";

export default function UserReviewBox({userID, isOwn}) {
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0)

    const [newReview, setNewReview] = useState({
        reviewerID: localStorage.getItem("userID"),
        userID: userID,
        review_text: '',
        rating: 0
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
                setAvgRating(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const submitReview = async (e) => {
        e.preventDefault()

        if (newReview.review_text.length < 2) {
            console.log("need longer message")
            alert("please have a descriptive message accompanying your review")
        }

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


    return (
        <>
            <div>
                <p>User's average rating: {avgRating}</p>
            </div>
            <div>
                {isOwn ?
                    <form onSubmit={submitReview}>
                        <div id="message-bar" className="conversation">
                            <input type="number" min="0" max="5" step="1" name="rating"
                                   value={newReview.rating} onChange={handleInputChange}/>

                            <input type="text" name="review_text"
                                   value={newReview.review_text} onChange={handleInputChange}/>
                            <button type="submit">Send</button>
                        </div>
                    </form>
                    : null}
            </div>
            <div id="reviews-header">
                <h2>Reviews</h2>
            </div>
            <div id="reviews-box">
                <div id="reviews-section">
                    {
                        reviews.map(review => (
                            <UserReview reviewo={review}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}



