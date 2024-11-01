/* Home: The home page, containing lists of items. */
import './styles.css'
import ItemTable from './ItemTable.jsx'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {getAllItems, getItemsByUser, getMyBorrows} from "./services/ItemService.jsx";

export default function Home() {
    const navigate = useNavigate();

    const [postedItems, setPostedItems] = useState([]);
   // const [borrowedItems, setBorrowedItems] = useState([]);
    const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        console.log("userID found to be: " + userID);

        if (!userID) {
            navigate('/login');
        } else {
            loadItems(userID);
        }
    }, [navigate]);

    const loadItems = (userID) => {
        getAllItems()
            .then(res => {
                setAllItems(res.data);
                console.log("All items:", res.data);
            })
            .catch(error => {
                console.log("Error fetching all items:", error);
            });

        getItemsByUser(userID)
            .then(res => {
                setPostedItems(res.data);
                console.log("Posted items:", res.data);
            })
            .catch(error => {
                console.log("Error fetching posted items:", error);
            });

        // getMyBorrows(userID)
        //     .then(res => {
        //         setBorrowedItems(res.data);
        //         console.log("Borrowed items:", res.data);
        //     })
        //     .catch(error => {
        //         console.log("Error fetching borrowed items:", error);
        //     });
    };

    return (
        <>
            <div className="home-items" id="posted-header">
                <ItemTable headName="My Posted Items" items={postedItems} userID={localStorage.getItem("userID")} />
            </div>
            {/*<div className="home-items" id="borrowed-header">*/}
            {/*    <ItemTable headName="My Borrowed Items" items={borrowedItems} userID={localStorage.getItem("userID")} />*/}
            {/*</div>*/}
            <div className="home-items" id="suggested-items">
                <ItemTable headName="Suggested Items" items={allItems} userID={localStorage.getItem("userID")} />
            </div>
        </>
    )
   // }
}