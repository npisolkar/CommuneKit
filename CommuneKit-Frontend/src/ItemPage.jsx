/* ItemPage: The page for viewing an item, that pops up when requested
   This is also the page that appears when creating and editing items
*  isMine: determines whether the item is your own item or another's */

import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {updateItem, getItemById, getItemsByUser} from "./services/ItemService.jsx";
import {createRequest} from "./services/RequestService.jsx";
import ReviewComponent from "./components/ReviewComponent.jsx";
import {getReviewsById} from "./services/ReviewService.jsx";

function EditButton({isOwn, handleClick, bodyText}) {
    if (isOwn === true) {
        return (
            <div>
            <button onClick={handleClick}>{bodyText}</button>
            <button>Delete</button>
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
        message: ""
    });
    const [hasBorrowed, setHasBorrowed] = useState(false)
    const [userItems, setUserItems] = useState([])
    function compareItem(currID) {
        return currID === itemID
    }

    function onClick() {
        setClicked(!isClicked);
    }

    useEffect(() => {
        console.log("itemId:" + itemID)

        //fetch single item
        getItemById({itemID: itemID})
            .then((res) => {
                setItemData(res.data);
                console.log(JSON.stringify(res.data));
                setUserID(res.data.userID)
                console.log("local storage " + localStorage.getItem("userID"))
                console.log("id: " + itemID)
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

        //check if item has been borrowed by user before
        getItemsByUser(localStorage.getItem("userID"))
            .then (res => {
                setUserItems(res.data);
                setHasBorrowed(userItems.some(compareItem))
                console.log("id: " + itemID)
                console.log("hasBorrowed:" + hasBorrowed)
            })
            .catch (err =>console.log(err))
    }, [])

    async function handleSubmit() {
        try {
            let requestJson = {
                borrowingUserId: localStorage.getItem('userID'),
                lendingUserId: userID,
                startDay: requestData.startDay,
                startMonth: requestData.startMonth,
                startYear: requestData.startYear,
                endDay: requestData.endDay,
                endMonth: requestData.endMonth,
                endYear: requestData.endYear,
                message: requestData.message
            }
            const requestData = await createRequest(JSON.stringify(requestJson));
            console.log("submit:" + requestData);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUploadItem() {
        try {
            let itemJson = {
                itemName: itemData.itemName,
                itemDescription: itemData.itemDescription,
                itemCategory: itemData.itemCategory,
            }
            const responseData = await updateItem(userID, JSON.stringify(itemJson));
            console.log("submit:" + responseData);
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
    return (
        <>
            <div id="item-page-header">
                <h2>Item Page</h2>
            </div>
            <div id="edit-item-button">
                <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Edit Item"}/>
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
                    <div >
                        <button className="delete-button">Delete Item</button>
                    </div>
                </div>
                :
                <div>
                    <div className="item-column">
                        <div id="item-image">{itemData.itemName}</div>
                        <div id="item-name">{itemData.itemDescription}</div>
                        <div id="item-desc">{itemData.itemCategory}</div>
                    </div>
                </div>
            }
            {isOwn ?
                null
                : <div>
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
                            <input type="text" name="endYear" value={requestData.endYear} onChange={handleInputChange}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <input type="text" name="message" value={requestData.message} onChange={handleInputChange}
                                   required/>
                        </div>
                        <button type="submit">Request This Item</button>
                    </form>
                </div>
                <div id="reviews-button">
                    <Link to="/item/1/create-review"><button>Leave a Review</button></Link>
                </div>
                </div>
            }
            <div id="reviews-section">
                <h2>Reviews</h2>
                {
                    reviews.map(review => (
                        <ReviewComponent userID={id} itemID={itemData.itemID} reviewDto={review}/>
                    ))
                }
            </div>
        </>
    )
}