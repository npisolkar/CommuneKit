/* Home: The home page, containing lists of items. */
import './styles.css'
import ItemTable from './ItemTable.jsx'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {getAllItems, getItemsByUser, getMyBorrows} from "./services/ItemService.jsx";

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        console.log("userID found to be: " + userID);

        if (userID == null) {
            navigate('/login');
        }
    }, [navigate]);

    const [postedItems, setPostedItems] = useState([])
    const [borrowedItems, setBorrowedItems] = useState([])
    const [allItems, setAllItems] = useState([])
    useEffect(() => {
        getAllItems()
            .then (res => {
                setAllItems(res.data);
                console.log("all items: " + JSON.stringify(res.data))
            })
            .catch(function (error) {
                console.log(error);
            });

        getItemsByUser(localStorage.getItem("userID"))
            .then (res => {
                setPostedItems(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        getMyBorrows(localStorage.getItem("userID"))
            .then (res => {
                setBorrowedItems(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    return (
        <>
            <div className="home-items" id="posted-header">
                <ItemTable headName="My Posted Items" items={postedItems}/>
            </div>
            <div className="home-items" id="borrowed-header">
                <ItemTable headName="My Borrowed Items" items={borrowedItems}/>
            </div>
            <div className="home-items" id="suggested-items">
                <ItemTable headName="Suggested Items" items={allItems}/>
            </div>
        </>
    )
   // }
}