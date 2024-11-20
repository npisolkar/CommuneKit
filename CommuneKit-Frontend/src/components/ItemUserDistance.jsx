import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ItemUserDistance({ userID, itemID }) {
    const [isOwn, setIsOwn] = useState(false);
    const [itemDistance, setItemDistance] = useState(null);

    useEffect(() => {
        if (!userID) {
            console.error("User ID is undefined or null");
            return;
        }
        setIsOwn(localStorage.getItem("userID") === userID)
        console.log("isOwn = " + isOwn)
        // Fetch favorite status when component loads
        const gettingdistance = async () => {
            try {
                // Fetch all favorite items for the user
                const response = await
                    axios.get(`http://localhost:8080/api/items/distance/${itemID}/${userID}`);
                const distance = response.data;
                setItemDistance(distance);
            } catch (error) {
                console.error("Error fetching favorite status:", error);
            }
        };
        try {
            gettingdistance().then(r => console.log(r));
        } catch (error) {
            console.log(error);
        }
    }, [userID, itemID]);

    return (
        <>
            {!isOwn ? (
                <>
                    <div id="item-page-distance">
                    <h3>Your address is {itemDistance} miles away</h3>
                    </div>
                </>
                )
                :
                null
            }
        </>
    );
}
