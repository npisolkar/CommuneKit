import {useState} from 'react'
import {createItem} from "./services/ItemService.jsx"
import {useNavigate} from "react-router-dom";

export default function NewItem() {
    const [itemData, setItemData] = useState({
        itemID: '',
        itemName: '',
        itemDescription: '',
        itemCategory: '',
        userID: '',
    })
    const navigate = useNavigate()

    async function handleUploadItem() {
        try {
            console.log("starting")
            navigate("/profile/" + localStorage.getItem("userID") + "/my-items")
            let itemJson = {
                itemName: itemData.itemName,
                itemDescription: itemData.itemDescription,
                itemCategory: itemData.itemCategory,
                userID: localStorage.getItem("userID")
            }
            const responseData =
                await createItem(JSON.stringify(itemJson));
            console.log("submit: " + responseData);
        } catch (error) {
            console.log(error);
        }
    }

    const handleItemChange = (e) => {
        const {name, value} = e.target;
        setItemData({...itemData, [name]: value});
    };

    return (
        <div id="new-item-info">
            <form onSubmit={handleUploadItem}>
                <div id="item-image">Item Image</div>
                <input type="text" name="itemName" defaultValue={itemData.itemName} required
                       onChange={handleItemChange}/>
                <input type="text" name="itemDescription" defaultValue={itemData.itemDescription} required
                       onChange={handleItemChange}/>
                <input type="text" name="itemCategory" defaultValue={itemData.itemCategory} required
                       onChange={handleItemChange}/>
                <button type="submit">Submit Changes</button>
            </form>
        </div>
    )
}