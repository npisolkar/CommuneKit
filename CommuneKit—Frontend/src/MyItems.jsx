/* My Items: The page which contains all items associated
*  with your account, both posted and borrowed items. */
import ItemTable from "./ItemTable.jsx";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {getUserById} from './services/UserService.jsx'
import ItemComponent from "./ItemComponent.jsx";

export default function MyItems({userID}) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getUserById(userID)
            .then (res => {
                setItems(res.data.items);
                console.log(JSON.stringify(res.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    })
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
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        items.map(item => (
                            <ItemComponent data={item} />
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}