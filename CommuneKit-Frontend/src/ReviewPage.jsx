import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {createReview} from './services/ReviewService.jsx'

export default function ReviewPage() {
    let {itemID} = useParams()
    const [review, setReview] = useState({
        reviewID:'',
        reviewer:'',
        rating:'',
        reviewText:'',
        isItem:'',
        targetID:''
    })

    async function onSubmit() {
        try {
            let submit = {
                reviewer:'',
                rating:review.rating,
                reviewText:review.reviewText,
                isItem:true,
                targetID:itemID
            }
            await createReview(submit)
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    return (
        <>
            <div>
                <h1>Leave A Review</h1>
                <form onSubmit={onSubmit}>
                    <input onChange={handleInputChange} name="rating" defaultValue={review.rating}></input>
                    <input onChange={handleInputChange} name="reviewText" defaultValue={review.reviewText}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}