/* My Items: The page which contains all items associated
*  with your account, both posted and borrowed items. */
import ItemTable from "./ItemTable.jsx";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ItemComponent from "./components/ItemComponent.jsx";
import {getItemsByUser, getAllItems} from './services/ItemService.jsx'

export default function MyItems(userID) {
    const [postedItems, setPostedItems] = useState([]);
    const [borrowedItems, setBorrowedItems] = useState([]);
    useEffect(() => {
        getAllItems()
            .then (res => {
                setPostedItems(res.data);
                console.log(JSON.stringify(res.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        getAllItems()
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
                <div className="my-item">
                    <Link to="/profile/my-items/dummypage">
                        <button>Dummy Item</button>
                    </Link>
                </div>
            </div>
            <div className="home-items" id="profile-borrowed">
                <ItemTable headName={"my borrowed items"} items={borrowedItems} />
            </div>
            <div>
                <button>Create New Item</button>
            </div>
        </>
    )
}