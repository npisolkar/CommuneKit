/* ItemPage: The page for viewing an item, that pops up when requested
   This is also the page that appears when creating and editing items
*  isMine: determines whether the item is your own item or another's */
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {updateUser} from "./services/UserService.jsx";
import {updateItem} from "./services/ItemService.jsx";

function EditButton({isOwn, handleClick, bodyText}) {
    if (isOwn) {
        return (
            <button onClick={handleClick}>{bodyText}</button>
        )
    }
    else {
        return null
    }
}

function ReviewBox(isClicked) {
    return (
        <>
            {isClicked ? null :
            <div id="reviews">
                <h1>Reviews</h1>
            </div>
            }
        </>
    )
}

export default function ItemPage({isOwn, itemID, userID}){
    const [isClicked, setClicked] = useState(false);
    let params = useParams();
    const [itemData, setItemData] = useState({
        startDay:'',
        startMonth:'',
        startYear:'',
        endDay:'',
        endMonth:'',
        endYear:'',
        message:""
    });

    function onClick() {
        setClicked(!isClicked);
    }

    async function handleSubmit(formData) {
        try {
            let itemJson = {
                startDay:formData.startDay,
                startMonth:formData.startMonth,
                startYear:formData.startYear,
                endDay:formData.endDay,
                endMonth:formData.endMonth,
                endYear:formData.endYear,
                message:formData.message
            }
            const itemData = await updateItem(userID, JSON.stringify(itemJson));
            console.log("submit:" + itemData);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function handleUploadItem(formData){
        try {
            let itemJson = {
                itemName:formData.itemName,
                itemDescription:formData.itemDescription,
                itemCategory:formData.itemCategory,
            }
            const itemData = await updateItem(userID, JSON.stringify(itemJson));
            console.log("submit:" + itemData);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemData({ ...itemData, [name]: value });
    };
    return (
        <>
            <div id="item-page-header">
                <h2>Item Page</h2>
            </div>
            <div id="edit-item-button">
                <EditButton isOwn={isOwn} handleClick={onClick} bodyText={"Edit Item"}/>
            </div>
            {isClicked ?
                <div>
                <form onSubmit={handleUploadItem}>
                    <div id="item-image">Item Image</div>
                    <input type="text" name="itemName" defaultValue={"Item Name"} required/>
                    <input type="text" name="itemDescription" defaultValue={"Item Desc"} required/>
                    <input type="text" name="itemCategory" defaultValue={"Category"} required/>
                    <button type="submit">Submit Changes</button>
                </form>
                </div>
                :
                <div>
                    <div className="item-column">
                        <div id="item-image">Item Image</div>
                        <div id="item-name">Item Name</div>
                        <div id="item-desc">Item Desc</div>
                        <div id="additional-info-header"><h2>Additional Info</h2></div>
                        <div id="additional-info">Info</div>
                    </div>
                    <div id="request-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Start Day</label>
                                <input type="text" name="startDay" value={formData.startDay}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>Start Month</label>
                                <input type="text" name="startMonth" value={formData.startMonth}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>Start Year</label>
                                <input type="text" name="startYear" value={formData.startYear}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>End Day</label>
                                <input type="text" name="endDay" value={formData.endDay} onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>End Month</label>
                                <input type="text" name="endMonth" value={formData.endMonth}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>End Year</label>
                                <input type="text" name="endYear" value={formData.endYear} onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <input type="text" name="message" value={formData.message} onChange={handleInputChange}
                                       required/>
                            </div>
                            <button type="submit">Request This Item</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}