/* A component that contains the JS necessary to render
*  a single review on an item's page */

import {useState, useEffect} from 'react'
import {getUserById} from "../services/UserService.jsx";
import {Link} from "react-router-dom";
import StarRating from "./UserReviewMaterial/StarRating.jsx"

export default function ReviewComponent({reviewDto}) {
    const [name, setName] = useState('')
    const [imageID, setImageID] = useState('')
    useEffect(() => {
        getUserById(reviewDto.reviewerID)
            .then (res => {
                setName(res.data.userName)
                setImageID(res.data.picture)
            })
            .catch (err => console.log(err))
    }, [])
    return (
        <div className="item-review">
            <div className="comp-row-2">
                <div className="pic-name">
                <Link to={"/profile/" + reviewDto.reviewerID}>
                    <button className="review-picture"> {!imageID ?
                        <img src={'../public/simplepfp.png'}
                             alt="Item Picture"
                             style={{width: "50px", height: "50px", objectFit: "cover"}}/>
                        :
                        <img src={`http://localhost:8080/api/image/fileId/${imageID}`}
                             alt="Item Picture"
                             style={{width: "50px", height: "50px", objectFit: "cover"}}/>
                    }</button>
                </Link>
                <h3>{name}</h3>
                </div>
                <StarRating rating={reviewDto.rating}/>
            </div>
            <p>{reviewDto.reviewText}</p>
        </div>
    )
}