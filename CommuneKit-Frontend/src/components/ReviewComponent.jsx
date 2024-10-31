/* A component that contains the JS necessary to render
*  a single review on an item's page */

import {useState, useEffect} from 'react'
import {getUserById} from "../services/UserService.jsx";
import {Link} from "react-router-dom";

export default function ReviewComponent({reviewDto}) {
    const [name, setName] = useState('')

    useEffect(() => {
        getUserById(reviewDto.reviewerID)
            .then (res => {
                setName(res.data.userName)
            })
            .catch (err => console.log(err))
    }, [])
    return (
        <div className="item-review">
            <Link to={"/profile/" + reviewDto.reviewerID}><button>{name}</button></Link>
            <p>Rating: {reviewDto.rating}</p>
            <p>{reviewDto.reviewText}</p>
        </div>
    )
}