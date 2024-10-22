/* My Items: The page which contains all items associated
*  with your account, both posted and borrowed items. */
import ItemTable from "./ItemTable.jsx";
import ItemPage from "./ItemPage.jsx";
import {Link} from "react-router-dom";

export default function MyItems() {
    return (
        <>
            <div className="home-items" id="profile-posted">
                <ItemTable headName={"My Posted Items"}/>
                <div className="my-item">
                    <Link to="/profile/my-items/dummypage">
                        <button>Dummy Item</button>
                    </Link>
                </div>
            </div>
            <div className="home-items" id="profile-borrowed">
                <ItemTable headName={"My Borrowed Items"}/>
            </div>
        </>
    )
}