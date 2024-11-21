/* ItemPage: The page for viewing an item, that pops up when requested
   This is also the page that appears when creating and editing items
*  isMine: determines whether the item is your own item or another's */

import {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {updateItem, getItemById, deleteItem, updateItemImage} from "../services/ItemService.jsx";
import {createDateRequest, createRequest, getApprovedRequestsById} from "../services/RequestService.jsx";
import ReviewComponent from "../components/ReviewComponent.jsx";
import {getReviewsById} from "../services/ReviewService.jsx";
import RequestComponent from "../components/RequestComponent.jsx";
import {uploadImage} from "../services/ImageService.jsx";
import {Tooltip} from "react-tooltip";
import StarRating from "../components/UserReviewMaterial/StarRating.jsx";
import ItemUserDistance from "../components/ItemUserDistance.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";

function EditButton({isOwn, handleClick, bodyText, itemID}) {
    const navigate = useNavigate()
    function handleDelete() {
        deleteItem(itemID)
        navigate("/profile/" + localStorage.getItem("userID") + "/my-items")
    }
    if (isOwn === true) {
        return (
            <div>
            <button id="edit-item" onClick={handleClick}>{bodyText}</button>
            <button id="delete-item" onClick={handleDelete}>Delete</button>
            </div>
        )
    }
    else {
        return null
    }
}

export default function ItemPage() {
    const [isClicked, setClicked] = useState(false)
    let {itemID} = useParams();
    const [isOwn, setIsOwn] = useState(false);
    const [reviews, setReviews] = useState([])
    const [avgRating, setAvgRating] = useState(0)
    const [userID, setUserID] = useState('')
    const [uploadedImage, setUploadedImage] = useState(null);
    const today = new Date().toISOString().split("T")[0];

    const [itemData, setItemData] = useState({
        itemID: '',
        itemName: '',
        itemDescription: '',
        itemCategory: '',
        userID: '',
        picture: ''
    })
    const [requestData, setRequestData] = useState({
        startDate: "",
        endDate: "",
        message: "",
        itemID:''
    });
    const [hasBorrowed, setHasBorrowed] = useState(false)
    const [currentRequests, setCurrentRequests] = useState([])
    function compareID(currRequest) {
        return JSON.stringify(currRequest.borrowingUserId) === localStorage.getItem("userID")
    }

    function onClick() {
        setClicked(!isClicked);
    }
    const ItemPicture = ({ imageId }) => {
        if (!imageId) {
            return( <img src={'/no_image.jpg'}
                         alt="Item Picture"
                         style={{width: "150px", height: "150px", objectFit: "cover"}}/>)
        }
        return( <img src={`http://localhost:8080/api/image/fileId/${imageId}`}
                     alt="Item Picture"
                     style={{width: "150px", height: "150px", objectFit: "cover"}}/>);
    }
    const handleFileChange = (e) => {
        //console.log(e.target.file);
        setUploadedImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    useEffect(() => {
        console.log("itemId:" + itemID)

        //fetch single item
        getItemById(itemID)
            .then((res) => {
                setItemData(res.data);
                console.log("GET item data: " + JSON.stringify(res.data));
                //console.log("userid:" + JSON.stringify(res.data.userID))
                setUserID(res.data.userID);
                console.log();
                if (localStorage.getItem("userID") === JSON.stringify(res.data.userID)) {
                    setIsOwn((prev) => true);
                    console.log("isown:" + isOwn);
                }
                else {
                    console.log("not is own");
                }
            })
            .catch((error) => {
                console.log(error);
            })

        //fetch reviews
        getReviewsById(itemID)
            .then(res => {
                setReviews(res.data)
                setAvgRating(res.data.map(review => parseInt(review.rating)).reduce((a, b) => a + b)
                    / res.data.length);
            })
            .catch (err => console.log(err))

        //fetch requests
        getApprovedRequestsById(itemID)
            .then(res => {
                setCurrentRequests(res.data)
                //check if item has been borrowed by user before
                //console.log("current user:" + localStorage.getItem("userID"))
                setHasBorrowed(res.data.some(compareID))
            })
            .catch (err => console.log(err))
    }, [])


    const handleStartDateChange = (e) => {
        setRequestData({...requestData, ["startDate"]: e.target.value});
        // if (new Date(e.target.value) > new Date(requestData.endDate)) {
        //     setRequestData({...requestData, ["endDate"]: e.target.value});
        //     //setEndDate(e.target.value); // Reset end date if it's before the new start date
        // }
    };

    const handleEndDateChange = (e) => {
        setRequestData({...requestData, ["endDate"]: e.target.value});
    };



    const handleSubmitRequest = async(e) => {
        e.preventDefault();
        try {
            let requestJson = {
                borrowingUserId: localStorage.getItem('userID'),
                lendingUserId: userID,
                itemId:itemID,
                startDate: requestData.startDate,
                endDate: requestData.endDate,
                message: requestData.message,
                isApproved:null
            }
            console.log("trying to submit request: " + JSON.stringify(requestJson))
            const responseData = await createDateRequest(JSON.stringify(requestJson));
            console.log("submit:" + responseData);
        } catch (error) {
                if(error.status === 401||error.status === 500) {
                    console.log(error);
                    alert("Request with overlapping time already exists, please request a different time.");
                }
            console.log(error);
        }
        window.location.reload();
    }

    const handleUploadItem = async (e) => {
        e.preventDefault()
        try {
            console.log("STARTING ITEM UPLOAD")
            if (uploadedImage) {
                //if item pic has been changed, when submitting changes
                //  need to start by uploading new image
                const imageData = new FormData();
                imageData.append("image", uploadedImage);
                let newImageId = await uploadImage(imageData);
                console.log("uploaded image with imageID: " + newImageId.data)
                await updateItemImage( itemID, newImageId.data);
                setUploadedImage(null);
            }
            console.log("NOW UPLOADING: " + JSON.stringify(itemData))
            const responseData = await updateItem(itemID, itemData);
            //console.log("submit:" + responseData);
            setItemData(responseData.data)
            onClick()
        } catch (error) {
            console.log("ERROR when uploading/editing item")
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setRequestData({...requestData, [name]: value});
    };

    const handleItemChange = (e) => {
        const {name, value} = e.target;
        setItemData({...itemData, [name]: value})
    }

    return (
        <>
            {isClicked ?
                <>
                <div id="edit-item-button">
                    <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Cancel Edit"} itemID={itemData.itemID}/>
                </div>
                <div id="item-info">

                    <div id="item-image">
                        <>
                            <ItemPicture imageId={itemData.picture}/>
                            <div>
                                <label>Item picture upload:</label>
                                <input type="file" onChange={handleFileChange}/>
                            </div>
                        </>
                    </div>
                    <form onSubmit={handleUploadItem}>
                        <label htmlFor="itemName" className="item-member-label"><b>Item Name</b></label>
                        <input type="text" id="item-name" className="item-member" name="itemName"
                               defaultValue={itemData.itemName}
                               required onChange={handleItemChange}/>
                        <label htmlFor="itemDescription" className="item-member-label"><b>Description</b></label>
                        <textarea id="item-desc" className="item-member" name="itemDescription"
                                  defaultValue={itemData.itemDescription} maxLength="2000" required
                                  onChange={handleItemChange}/>

                        <label htmlFor="itemCategory" className="item-member-label"><b>Category</b></label>
                        <select id="item-cat" name="itemCategory" className="item-member" onChange={handleItemChange}
                                defaultValue={itemData.itemCategory} required>
                            <option value="Indoor">Indoor</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Party">Party</option>
                            <option value="Consumable">Consumable</option>
                        </select>
                        <button type="submit">Submit Changes</button>
                    </form>
                </div>
                </>
                :
                <div id="item-box">
                        <div id="edit-item-button">
                            <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Edit Item"}
                                    itemID={itemData.itemID}/>
                        </div>
                        <div>
                            <FavoriteButton itemID={itemData.itemID} userID={localStorage.getItem("userID")}/>
                        </div>
                        <div id="item-info">
                            <div id="item-name" className="item-member"><h2>{itemData.itemName}</h2></div>

                            <div id="item-image">
                                <ItemPicture imageId={itemData.picture}/>
                            </div>

                        {/*<div id="item-image">Item Image</div>*/}
                        <label htmlFor="itemName" className="item-member-label"><b>Item Name</b></label>
                        <div id="item-name" className="item-member">{itemData.itemName}</div>
                        <label htmlFor="itemDescription" className="item-member-label"><b>Description</b></label>
                        <div id="item-desc" className="item-member">{itemData.itemDescription}</div>
                        <label htmlFor="itemCategory"
                               className="item-member-label"><b>Category</b></label>
                        <div id="item-cat" className="item-member">{itemData.itemCategory}</div>
                    </div>

                </div>
            }
            {isOwn ?

                <table id="current-requests">
                    <thead>
                    <tr>
                        <td>Start Date</td>
                        <td>End Date</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        currentRequests.map(request => (
                            <RequestComponent data={request} isLending={false}/>
                        ))
                    }
                    </tbody>
                </table>
                : <div>
                    <div id="item-user">
                        <Link to={"/profile/" + itemData.userID}>
                            <button>To User Profile</button>
                        </Link>
                    </div>
                    <table id="current-requests">
                        <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            currentRequests.map(request => (
                                <RequestComponent key={request.requestId} data={request} isLending={false}/>
                            ))
                        }
                        </tbody>
                    </table>

                    <ItemUserDistance userID={userID} itemID={itemID}/>
                    <div id="request-form">
                        <form onSubmit={handleSubmitRequest}>
                            <div>
                                <label>
                                    Start Date:
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={requestData.startDate}
                                        min = {today.toString()}
                                        onChange={handleStartDateChange}
                                        required
                                    />
                                </label>
                                <br/>
                                <label>
                                    End Date:
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={requestData.endDate}
                                        min={requestData.startDate} // Set minimum end date to start date
                                        onChange={handleEndDateChange}
                                        required
                                    />
                                </label>
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea name="message" id="request-text" value={requestData.message}
                                          onChange={handleInputChange}
                                          required/>
                            </div>
                            <button type="submit">Request This Item</button>
                        </form>
                    </div>
                </div>
            }
            <div id="reviews-header">
                <h2>Reviews</h2>
                <div id="avg-rating-container">
                    <label><b>Average Rating</b></label>
                    <div id="item-avg">
                        <StarRating rating={avgRating}></StarRating>
                    </div>
                </div>
                <hr id="reviews-underline"></hr>
            </div>
            {hasBorrowed ?
                <div id="reviews-button">
                    <Link to={"/item/" + itemID + "/create-review"}>
                        <button>Leave a Review</button>
                    </Link>
                </div>
                :
                <div id="reviews-button">
                    <a className="review-anchor" data-tooltip-content={"You need to borrow an item before you can review it!"}>
                        <button>Leave a Review</button>
                    </a>
                    <Tooltip anchorSelect=".review-anchor" id="review-tooltip"/>
                </div>}
            <div id="reviews-box">

            <div id="reviews-section">
                    {
                        reviews.map(review => (
                            <ReviewComponent reviewDto={review}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}