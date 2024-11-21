import {useState} from 'react'
import {createItem} from "./services/ItemService.jsx"
import {useNavigate} from "react-router-dom";

export default function NewItem() {
    const [itemData, setItemData] = useState({
        itemID: '',
        itemName: '',
        itemDescription: '',
        itemCategory: '',
        userID: localStorage.getItem("userID"),
        visible: true,
    })
    const navigate = useNavigate()

    const handleUploadItem = async(e) => {
        e.preventDefault()
        try {
            console.log("starting, trying" + JSON.stringify(itemData))
            const responseData =
                await createItem(JSON.stringify(itemData));
            console.log("submit: " + responseData);
            setItemData(responseData.data)
            navigate("/item/" + JSON.stringify(responseData.data.itemID))
            //navigate("/profile/" + String(localStorage.getItem("userID")) + "/my-items")
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
                <div id="create-image">Item Image</div>
                <label htmlFor="itemName" className="item-head">Item Name</label>
                <input type="text" name="itemName" className="new-item-input" defaultValue={itemData.itemName} required
                       onChange={handleItemChange}/>
                <label htmlFor="itemDescription" className="item-head">Description</label>
                <input type="text" name="itemDescription" className="new-item-input" defaultValue={itemData.itemDescription} required
                       onChange={handleItemChange}/>
                <label htmlFor="itemCategory" className="item-head">Category</label>
                <select name="itemCategory" onChange={handleItemChange} required>
                    <option value="Tools">Tools</option>
                    <option value="Games">Games</option>
                    <option value="Party">Party</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Moving">Moving</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="Baby">Baby</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
                <button type="submit">Create New Item</button>
            </form>
        </div>
    )
}