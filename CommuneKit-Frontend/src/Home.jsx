/* Home: The home page, containing lists of items. */
import './styles.css'
import ItemTable from './components/ItemTable.jsx'
import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {getAllItems, getItemsByUser, getMyBorrows, getMyLent, getSuggestedItems} from "./services/ItemService.jsx";

export default function Home() {
    const navigate = useNavigate();

    const [postedItems, setPostedItems] = useState([]);
    const [lentItems, setLentItems] = useState([]);
    const [borrowedItems, setBorrowedItems] = useState([]);
    const [suggestedItems, setSuggestedItems] = useState([]);



    useEffect(() => {
        const userID = localStorage.getItem("userID");
        console.log("userID found to be: " + userID);

        if (!userID) {
            navigate('/login');
        } else if (localStorage.getItem("role") === "ADMIN") {
            navigate('/admin');
        } else {
            loadItems(userID);
        }
    }, [navigate]);

    const loadItems = (userID) => {
        getItemsByUser(userID)
            .then(res => {
                setPostedItems(res.data);
                console.log("Posted items:", res.data);
            })
            .catch(error => {
                console.log("Error fetching posted items:", error);
            });

        getSuggestedItems(userID)
            .then(res => {
                setSuggestedItems(res.data);
            })
            .catch (err=>{console.log(err)})

        getMyBorrows(userID)
            .then(res=> {
                setBorrowedItems(res.data);
                console.log("My Borrows: " + JSON.stringify(res.data))
            })
            .catch(err=>{console.log(err)})

        getMyLent(userID)
            .then(res => {
                setLentItems(res.data)
            })
            .catch(err=>{console.log(err)})

    };

    return (
        <>
        <div id="home-home">
            <div className="home-row">
                <div className="home-items" id="posted-header">
                    <ItemTable headName="My Posted Items" items={postedItems} userID={localStorage.getItem("userID")}/>
                </div>
                {/*<div className="home-items" id="borrowed-header">*/}
                {/*    <ItemTable headName="My Borrowed Items" items={borrowedItems} userID={localStorage.getItem("userID")} />*/}
                {/*</div>*/}
                <div className="home-items">
                    <ItemTable headName="My Lent Items" items={lentItems} userID={localStorage.getItem("userID")}/>
                </div>
            </div>
            <div className="home-row">
                <div className="home-items">
                    <ItemTable headName="My Borrowed Items" items={borrowedItems}
                               userID={localStorage.getItem("userID")}/>
                </div>
                <div className="home-items" id="suggested-items">
                    <ItemTable headName="Suggested Items" items={suggestedItems}
                               userID={localStorage.getItem("userID")}/>
                </div>
            </div>

        </div>
    <div id="create-item-home">
        <Link to="/newitem">
            <button>Create New Item</button>
        </Link>
    </div>
    </>
)
    ;
}
