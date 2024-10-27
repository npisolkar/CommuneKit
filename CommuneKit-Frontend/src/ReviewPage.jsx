import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {createReview} from './services/ReviewService.jsx'

export default function ReviewPage() {
    let {itemID} = useParams()
    const [review, setReview] = useState({
        reviewID:'',
        reviewer:'',
        rating:'',
        reviewText:'',
        targetID:''
    })
    const navigate = useNavigate()

    async function onSubmit() {
        navigate("/item/" + itemID)
        try {
            let submit = {
                reviewer:'',
                rating:review.rating,
                reviewText:review.reviewText,
                targetID:JSON.stringify(itemID)
            }
            await createReview(submit, itemID)
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    function cancel() {
        navigate("/item/" + itemID)
    }

    return (
        <>
            <div>
                <h1>Leave A Review</h1>
                <div id="rating-stars">
                    <img src="/istockphoto-1135769825-612x612.jpg" alt="star" className="star"/>
                    <img src="/istockphoto-1135769825-612x612.jpg" alt="star" className="star"/>
                    <img src="/istockphoto-1135769825-612x612.jpg" alt="star" className="star"/>
                    <img src="/istockphoto-1135769825-612x612.jpg" alt="star" className="star"/>
                    <img src="/istockphoto-1135769825-612x612.jpg" alt="star" className="star"/>
                </div>
                <form onSubmit={onSubmit}>
                    <input onChange={handleInputChange} name="rating" defaultValue={review.rating} required></input>
                    <input onChange={handleInputChange} name="reviewText" defaultValue={review.reviewText} required></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <button onClick={cancel}>Cancel</button>
            </div>
        </>
    )
}