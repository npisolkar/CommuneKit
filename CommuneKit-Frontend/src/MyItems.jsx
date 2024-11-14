/* My Items: The page which contains all items associated
*  with your account, both posted and borrowed items. */
import ItemTable from "./components/ItemTable.jsx";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {getItemsByUser, getMyBorrows, createItem} from './services/ItemService.jsx'

export default function MyItems() {
    const [postedItems, setPostedItems] = useState([]);
    const [borrowedItems, setBorrowedItems] = useState([]);
    useEffect(() => {
        getItemsByUser(localStorage.getItem("userID"))
            .then (res => {
                setPostedItems(res.data);
                console.log(JSON.stringify(res.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        getMyBorrows(localStorage.getItem("userID"))
            .then (res => {
                setBorrowedItems(res.data);
                console.log(JSON.stringify(res.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <>
            <div className="home-items" id="profile-posted">
                <ItemTable headName={"my posted items"} items={postedItems} />
            </div>
            <div className="home-items" id="profile-borrowed">
                <ItemTable headName={"my borrowed items"} items={borrowedItems} />
            </div>
            <div id="create-item">
                <Link to="/newitem"><button>Create New Item</button></Link>
            </div>
        </>
    )
}