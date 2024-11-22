import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ItemUserDistance({ userID, itemID }) {
    const [isOwn, setIsOwn] = useState(false);
    const [itemDistance, setItemDistance] = useState(null);

    useEffect(() => {

        setIsOwn(localStorage.getItem("userID") === userID)
        console.log("isOwn = " + isOwn)
        // Fetch favorite status when component loads
        const gettingdistance = async () => {
            try {
                // Fetch all favorite items for the user
                let apistr = `http://localhost:8080/api/items/distance/${itemID}/${userID}`
                console.log(apistr);
                const response = await
                    axios.get(apistr);
                console.log("DISTANCE response: ", response)
                const distance = response.data;
                console.log(distance);
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
            {isOwn ?
                <>
                    <div id="item-page-distance">
                        <h3>Your address is {itemDistance} miles away</h3>
                    </div>
                </>
                :
                (
                    <>
                        <div id="item-page-distance">
                            <h3>Your address is {itemDistance} miles away</h3>
                        </div>
                    </>
                )
            }
        </>
    );
}
