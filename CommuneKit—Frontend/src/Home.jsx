/* Home: The home page, containing lists of items. */
import './styles.css'
import ItemTable from './ItemTable.jsx'
import { useState, useEffect } from 'react'
import {getItemsByUser, getMyBorrows, getAllItems} from "./services/ItemService.jsx";

export default function Home() {
    const [postedItems, setPostedItems] = useState([])
    const [borrowedItems, setBorrowedItems] = useState([])
    const [allItems, setAllItems] = useState([])
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
            })
            .catch(function (error) {
                console.log(error);
            })
        getAllItems({userId:'1'})
            .then (res => {
                setAllItems(res.data);
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
}