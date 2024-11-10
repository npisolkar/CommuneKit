/* ItemPage: The page for viewing an item, that pops up when requested
   This is also the page that appears when creating and editing items
*  isMine: determines whether the item is your own item or another's */

import {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {updateItem, getItemById, deleteItem} from "./services/ItemService.jsx";
import {createRequest, getApprovedRequestsById} from "./services/RequestService.jsx";
import ReviewComponent from "./components/ReviewComponent.jsx";
import {getReviewsById} from "./services/ReviewService.jsx";
import RequestComponent from "./components/RequestComponent.jsx";

function EditButton({isOwn, handleClick, bodyText, itemID}) {
    const navigate = useNavigate()
    function handleDelete() {
        deleteItem(itemID)
        navigate("/profile/" + localStorage.getItem("userID") + "/my-items")
    }
    if (isOwn === true) {
        return (
            <div>
            <button onClick={handleClick}>{bodyText}</button>
            <button onClick={handleDelete}>Delete</button>
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
    const [userID, setUserID] = useState('')
    const [itemData, setItemData] = useState({
        itemID: '',
        itemName: '',
        itemDescription: '',
        itemCategory: '',
        userID: '',
    })
    const [requestData, setRequestData] = useState({
        startDay: '',
        startMonth: '',
        startYear: '',
        endDay: '',
        endMonth: '',
        endYear: '',
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

    useEffect(() => {
        console.log("itemId:" + itemID)

        //fetch single item
        getItemById(itemID)
            .then((res) => {
                setItemData(res.data);
                console.log(JSON.stringify(res.data));
                console.log("userid:" + JSON.stringify(res.data.userID))
                setUserID(res.data.userID)
                if (localStorage.getItem("userID") === JSON.stringify(res.data.userID)) {
                    setIsOwn(true);
                    console.log("isown:" + isOwn)
                }
                else {
                    console.log("not is own")
                }
            })
            .catch((error) => {
                console.log(error);
            })

        //fetch reviews
        getReviewsById(itemID)
            .then(res => {
                setReviews(res.data)
            })
            .catch (err => console.log(err))

        //fetch requests
        getApprovedRequestsById(itemID)
            .then(res => {
                setCurrentRequests(res.data)
                console.log("requests: " + JSON.stringify(res.data))
                //check if item has been borrowed by user before
                console.log("current user:" + localStorage.getItem("userID"))
                setHasBorrowed(res.data.some(compareID))
            })
            .catch (err => console.log(err))
    }, [])

    async function handleSubmit() {
        try {
            let requestJson = {
                borrowingUserId: localStorage.getItem('userID'),
                lendingUserId: userID,
                itemId:itemID,
                startDay: requestData.startDay,
                startMonth: requestData.startMonth,
                startYear: requestData.startYear,
                endDay: requestData.endDay,
                endMonth: requestData.endMonth,
                endYear: requestData.endYear,
                message: requestData.message,
                isApproved:null
            }
            console.log("trying to submit request: " + JSON.stringify(requestJson))
            const responseData = await createRequest(JSON.stringify(requestJson));
            console.log("submit:" + responseData);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUploadItem() {
        try {
            console.log("trying to submit " + JSON.stringify(itemData))
            const responseData = await updateItem(itemID, itemData);
            console.log("submit:" + responseData);
            setItemData(responseData.data)
            onClick()
        } catch (error) {
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

    const [isIllegalClicked, setIllegalClick] = useState(false)
    function handleIllegalClick() {
        setIllegalClick(!isIllegalClicked)
    }
    return (
        <>
            <div id="item-page-header">
                <h2>Item Page</h2>
            </div>
            <div id="edit-item-button">
                <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Edit Item"} itemID={itemData.itemID}/>
            </div>
            {isClicked ?
                <div id="item-info">
                    <form onSubmit={handleUploadItem}>
                        <div id="item-image">Item Image</div>
                        <input type="text" name="itemName" defaultValue={itemData.itemName} required onChange={handleItemChange}/>
                        <input type="text" name="itemDescription" defaultValue={itemData.itemDescription} required onChange={handleItemChange}/>
                        <input type="text" name="itemCategory" defaultValue={itemData.itemCategory} required onChange={handleItemChange}/>
                        <button type="submit">Submit Changes</button>
                    </form>
                </div>
                :
                <div>
                    <div id="item-info">
                        <div id="item-name" className="item-member">{itemData.itemName}</div>
                        <div id="item-desc" className="item-member">{itemData.itemDescription}</div>
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
                    <div id="request-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Start Day</label>
                                <input type="text" name="startDay" value={requestData.startDay}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>Start Month</label>
                                <input type="text" name="startMonth" value={requestData.startMonth}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>Start Year</label>
                                <input type="text" name="startYear" value={requestData.startYear}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>End Day</label>
                                <input type="text" name="endDay" value={requestData.endDay} onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>End Month</label>
                                <input type="text" name="endMonth" value={requestData.endMonth}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>End Year</label>
                                <input type="text" name="endYear" value={requestData.endYear}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <input type="text" name="message" value={requestData.message}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <button type="submit">Request This Item</button>
                        </form>
                    </div>
                    {hasBorrowed ?
                        <div id="reviews-button">
                            <Link to={"/item/" + itemID + "/create-review"}>
                                <button>Leave a Review</button>
                            </Link>
                        </div>
                        :
                        <div id="reviews-button">
                            <button onClick={handleIllegalClick}>Leave a Review</button>
                            <CantReviewNotif isClicked={isIllegalClicked}/>
                        </div>}
                </div>
            }
            <div id="reviews-header">
                <h2>Reviews</h2>
            </div>
            <div id="reviews-section">
                {
                    reviews.map(review => (
                        <ReviewComponent reviewDto={review}/>
                    ))
                }
            </div>
            <div id="item-user">
                <Link to={"/profile/" + itemData.userID}>
                    <button>To User Profile</button>
                </Link>
            </div>
        </>
    )
}

function CantReviewNotif(isClicked) {
    return (
        <>
            {isClicked ?
        <div id="cant-review">
            You need to borrow an item before you can review it.
        </div> :
                null}
            </>
    )
}