import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {createReview} from '../services/ReviewService.jsx'
import {getItemById} from "../services/ItemService.jsx";

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
    const [stars, setStars] = useState([
        {id: 0, "src":"/dark_star.jpg"},
        {id: 1, "src":"/dark_star.jpg"},
        {id: 2, "src":"/dark_star.jpg"},
        {id: 3, "src":"/dark_star.jpg"},
        {id: 4, "src":"/dark_star.jpg"}
    ])
    useEffect(() => {
        getItemById(itemID)
            .then(res => {
                setUserID(res.data.userID)
                console.log("itemID:" + itemID)
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
            console.log(thing)
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

    function Stars() {

        function onClick(ind) {
            console.log("clicked at " + ind)
            setStars(stars.map((star, index) => {
                if (ind >= star.id) {
                    return {
                        ...star,
                        src:"/gold_star.jpg"
                    }
                }
                else {
                    return {
                        ...star,
                        src:"/dark_star.jpg"
                    }
                }
            }))
            setReview({...review, rating:ind+1})
        }

        return (
            <div id="rating-stars">
                {stars.map((star, index) => (
                    <img src={star.src} alt="star" className="star" onMouseDown={() => onClick(index)}/>
                ))}
            </div>
        )
    }

    return (
        <>
            <div>
                <h1>Leave A Review</h1>
                <form onSubmit={onSubmit}>
                    <Stars/>
                    <textarea onChange={handleInputChange} name="reviewText" defaultValue={review.reviewText} required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <button onClick={cancel}>Cancel</button>
            </div>
        </>
    )
}