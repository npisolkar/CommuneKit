// Home: The home page, containing lists of items.
import './styles.css';
import ItemTable from './ItemTable.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllItems, getItemsByUser, getMyBorrows } from './services/ItemService.jsx';

export default function Home() {
    const navigate = useNavigate();
    const [postedItems, setPostedItems] = useState([]);
    const [suggestedItems, setSuggestedItems] = useState([]);

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
                setSuggestedItems(res.data);
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
    };

    return (
        <>
            <div className="home-items" id="posted-header">
                <ItemTable headName="My Posted Items" items={postedItems} userID={localStorage.getItem("userID")} />
            </div>
            <div className="home-items" id="suggested-items">
                <ItemTable headName="Suggested Items" items={suggestedItems} userID={localStorage.getItem("userID")} />
            </div>
        </>
    );
}
