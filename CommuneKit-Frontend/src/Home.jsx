import './styles.css';
import ItemTable from './ItemTable.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllItems, getItemsByUser, getMyBorrows } from './services/ItemService.jsx';

export default function Home() {
    const navigate = useNavigate();
    const [postedItems, setPostedItems] = useState([]);
    const [borrowedItems, setBorrowedItems] = useState([]);
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
            })
            .catch(error => {
                console.log(error);
            });

        getItemsByUser(userID)
            .then(res => {
                setPostedItems(res.data);
            })
            .catch(error => {
                console.log(error);
            });

        getMyBorrows(userID)
            .then(res => {
                setBorrowedItems(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="home-items" id="posted-header">
                <ItemTable headName="My Posted Items" items={postedItems} userID={localStorage.getItem("userID")} />
            </div>
            <div className="home-items" id="borrowed-header">
                <ItemTable headName="My Borrowed Items" items={borrowedItems} userID={localStorage.getItem("userID")} />
            </div>
            <div className="home-items" id="suggested-items">
                <ItemTable headName="Suggested Items" items={allItems} userID={localStorage.getItem("userID")} />
            </div>
        </>
    );
}