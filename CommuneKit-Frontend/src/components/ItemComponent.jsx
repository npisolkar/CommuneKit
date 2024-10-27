/* Contains the HTML element that displays an item's information */
import {Link} from 'react-router-dom'
import {deleteItem} from "../services/ItemService.jsx"

export default function ItemComponent({data}, isOwn) {

    function handleClick() {
        deleteItem(JSON.stringify(data.itemID))
    }
    return (
        <>
            <tr>
                <td>{data.itemID}</td>
                <td>{data.itemName}</td>
                <td>{data.itemDescription}</td>
                <td>{data.itemCategory}</td>
                <td><Link to={"/item/" + `${data.itemID}`}><button>To Item Page</button></Link></td>
                <td><Link to={"/profile/" + `${data.userID}`}><button>To User Page</button></Link></td>
                <td><button>Favorite</button></td>
                {isOwn ?
                    <td>
                        <button onClick={handleClick}>Delete</button>
                    </td>
                    :
                    null
                }
            </tr>
        </>
    )
}