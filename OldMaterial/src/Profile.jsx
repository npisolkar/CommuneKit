/* Profile: The page which contains all profile information for
*  certain user. The page's behavior should change based on
*  whether one is accessing one's own page or another's. */
import './styles.css'
import { useState } from 'react'
import ItemTable from "./ItemTable.jsx";
import { BrowserRouter as Link} from "react-router-dom";

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

export function ToggleTextField({height, width, placeholder}) {
        return (
            <>
                <input type="text" style={{height:height, width:width,}} placeholder={placeholder}/>
            </>
        )
}

export default function Profile({isOwn}) {
    const [isClicked, setClicked] = useState(false);

    function onClick() {
        setClicked(!isClicked);
    }
    return (
        <>
            <div className="about-box">
                <div>
                    <ToggleTextField id="profile-username" placeholder={"Firstname Lastname"}/>
                </div>
                <div>
                    <ToggleTextField height={"200px"} width={"200px"} placeholder={"Bio..."}/>
                </div>
            </div>
            <div id="edit-profile">
                <EditButton isOwn={isOwn} handleClick={onClick}/>
            </div>
            <div id="my-items-button">
                <Link to="/profile/my-items"><button>View My Items</button></Link>
            </div>
            <div id="my-rating">
                <h2>Rating</h2>
            </div>
            <script>

            </script>
        </>
    )
}