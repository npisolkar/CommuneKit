/* Profile: The page which contains all profile information for
*  certain user. The page's behavior should change based on
*  whether one is accessing one's own page or another's. */
import './styles.css'
import { useState } from 'react'
import {Link} from "react-router-dom";

function EditButton({isOwn, handleClick}) {
    if (isOwn) {
        return (
            <button onClick={handleClick}>Edit</button>
        )
    }
    else {
        return null
    }
}

export default function Profile({isOwn}) {
    const [isClicked, setClicked] = useState(false);

    function onClick() {
        setClicked(!isClicked);
    }
    return (
        <>
            {isClicked ?
                <div className="about-box">
                    <div>
                        <input type="text" id="profile-username" placeholder={"Firstname Lastname"}/>
                    </div>
                    <div>
                        <input type="text" style={{height: "200px", width: "200px"}} placeholder={"Bio..."}/>
                    </div>
                </div> :
                <div className="about-box">
                    <div>
                        <div>Firstname Lastname</div>
                    </div>
                    <div>
                        <div>Bio...</div>
                    </div>
                </div>
            }
            <div id="edit-profile">
                <EditButton isOwn={isOwn} handleClick={onClick}/>
            </div>
            <div id="my-items-button">
                <Link to="/profile/my-items">
                    <button>View My Items</button>
                </Link>
            </div>
            <div id="my-rating">
                <h2>Rating</h2>
            </div>
        </>
    )
}