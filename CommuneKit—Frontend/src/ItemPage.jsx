/* ItemPage: The page for viewing an item, that pops up when requested
   This is also the page that appears when creating and editing items
*  isMine: determines whether the item is your own item or another's */
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {updateItem, getItemById} from "./services/ItemService.jsx";
import {createRequest} from "./services/RequestService.jsx";

function EditButton({isOwn, handleClick, bodyText}) {
    if (isOwn) {
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

function RequestForm({isOwn}, itemData, handleSubmit, handleInputChange) {
    if (isOwn) {
        return (
                <div id="request-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Start Day</label>
                            <input type="text" name="startDay" value={itemData.startDay}
                                   onChange={handleInputChange}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>Start Month</label>
                            <input type="text" name="startMonth" value={itemData.startMonth}
                                   onChange={handleInputChange}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>Start Year</label>
                            <input type="text" name="startYear" value={itemData.startYear}
                                   onChange={handleInputChange}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>End Day</label>
                            <input type="text" name="endDay" value={itemData.endDay} onChange={handleInputChange}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>End Month</label>
                            <input type="text" name="endMonth" value={itemData.endMonth}
                                   onChange={handleInputChange}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>End Year</label>
                            <input type="text" name="endYear" value={itemData.endYear} onChange={handleInputChange}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <input type="text" name="message" value={itemData.message} onChange={handleInputChange}
                                   required/>
                        </div>
                        <button type="submit">Request This Item</button>
                    </form>
                </div>
        )}
    else {
        return null
    }
}

function ReviewBox(itemID) {
    return (
        <>
                <div id="reviews">
                    <Link to="/item/1/create-review"><button>Leave a Review</button></Link>
                </div>
        </>
    )
}

export default function ItemPage(itemID, userID) {
    const [isClicked, setClicked] = useState(false);
    let params = useParams();
    const [isOwn, setIsOwn] = useState(false);
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

    function onClick() {
        setClicked(!isClicked);
    }

    useEffect(() => {
        if (isOwn === false) {
            setIsOwn(true);
        }
        getItemById({itemID: '1'})
            .then((res) => {
                setItemData(res.data);
                console.log(JSON.stringify(res.data));
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    async function handleSubmit() {
        try {
            let requestJson = {
                borrowingUserId: '1',
                lendingUserId: '1',
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
    return (
        <>
        <div id="item-page-header">
                <h2>Item Page</h2>
            </div>
            <div id="edit-item-button">
                <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Edit Item"}/>
            </div>
            <RequestForm isOwn={isOwn} itemData={itemData} handleSubmit={handleSubmit}
                         handleInputChange={handleInputChange}/>
            <div id="item-reviews">
                <ReviewBox itemID={itemID}/>
            </div>
            {isClicked ?
                <div id="item-info">
                <form onSubmit={handleUploadItem}>
                    <div id="item-image">Item Image</div>
                    <input type="text" name="itemName" defaultValue={itemData.itemName} required/>
                    <input type="text" name="itemDescription" defaultValue={itemData.itemDescription} required/>
                    <input type="text" name="itemCategory" defaultValue={itemData.itemCategory} required/>
                    <button type="submit">Submit Changes</button>
                </form>
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
        </>
    )
}