/* My Items: The page which contains all items associated
*  with your account, both posted and borrowed items. */
import ItemTable from "./ItemTable.jsx";

export default function MyItems() {
    return (
        <>
            <div className="home-items" id="profile-posted">
                <ItemTable headName={"My Posted Items"}/>
            </div>
            <div className="home-items" id="profile-borrowed">
                <ItemTable headName={"My Borrowed Items"}/>
            </div>
        </>
    )
}