import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {createReview} from './services/ReviewService.jsx'
import {getItemById} from "./services/ItemService.jsx";

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
    const [userID, setUserID] = useState('')
    const [rating, setRating] = useState(review.rating)

    useEffect(() => {
        getItemById(itemID)
            .then(res => {
                setUserID(res.data.userID)
            })
            .catch(err => console.log(err))
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let submit = {
                reviewerID: userID,
                rating: review.rating,
                reviewText:review.reviewText,
                itemID:itemID
            };
            const thing = await createReview(submit, itemID);
            navigate("/item/" + String(itemID));
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
                <form onSubmit={onSubmit}>
                    <Stars/>
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

function Star() {
    return (
        <>
            <img src="/istockphoto-1135769825-612x612.jpg" alt="star" className="star"/>
        </>
    )
}

function Stars() {
    let stars = ([<Star/>, <Star/>, <Star/>, <Star/>, <Star/>])
    return (
        <div id="rating-stars">
            {
                stars.map(star => (
                    star
                ))
            }
        </div>
    )
}