/* A component that contains the JS necessary to render
*  a single review on an item's page */

import {useState, useEffect} from 'react'
import {getUserById} from "../services/UserService.jsx";

export default function ReviewComponent({reviewDto}) {
    const [name, setName] = useState('')

    useEffect(() => {
        getUserById(reviewDto.reviewerID)
            .then (res => {
                setName(res.data.userName)
                console.log(JSON.stringify(reviewDto))
            })
            .catch (err => console.log(err))
    }, [])
    return (
        <div className="item-review">
            <p>{name}</p>
            <p>Rating: {reviewDto.rating}</p>
            <p>{reviewDto.reviewText}</p>
        </div>
    )
}