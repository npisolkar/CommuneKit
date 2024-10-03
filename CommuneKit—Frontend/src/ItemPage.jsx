/* ItemPage: The page for viewing an item, that pops up when requested
   This is also the page that appears when creating and editing items
*  isMine: determines whether the item is your own item or another's */
import {useEffect, useState} from 'react';

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

export default function ItemPage({isOwn, itemID}) {
    const [isClicked, setClicked] = useState(false);

    function onClick() {
        setClicked(!isClicked);
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
                <div className="item-column">
                    <div id="item-image">Item Image</div>
                    <input type="text" id="item-name" placeholder={"Item Name"}/>
                    <input type="text" id="item-desc" placeholder={"Item Desc"}/>
                    <div id="additional-info-header"><h2>Additional Info</h2></div>
                    <input type="text" id="additional-info" placeholder={"Info"}/>
                </div> :
                <div className="item-column">
                    <div id="item-image">Item Image</div>
                    <div id="item-name">Item Name</div>
                    <div id="item-desc">Item Desc</div>
                    <div id="additional-info-header"><h2>Additional Info</h2></div>
                    <div id="additional-info">Info</div>
                </div>
            }
            {isClicked ?
                <div className="item-column">
                    <div id="condition-head"><h2>Condition</h2></div>
                    <input type="text" id="condition-box" placeholder={"Placeholder"}/>
                    <div id="start-date-head"><h2>Start Date</h2></div>
                    <input type="text" id="start-date-box" placeholder={"Placeholder"}/>
                    <div id="end-date-head"><h2>End Date</h2></div>
                    <input type="text" id="end-date-box" placeholder={"Placeholder"}/>
                </div> :
                <div className="item-column">
                    <div id="condition-head"><h2>Condition</h2></div>
                    <div id="condition-box">Placeholder</div>
                    <div id="start-date-head"><h2>Start Date</h2></div>
                    <div id="start-date-box">Placeholder</div>
                    <div id="end-date-head"><h2>End Date</h2></div>
                    <div id="end-date-box">Placeholder</div>
                </div>
            }
        </>
    )
}