import {Link} from 'react-router-dom'

export default function ItemComponent({data}) {
    return (
        <>
            <tr>
                <td>{data.itemID}</td>
                <td>{data.itemName}</td>
                <td>{data.itemDescription}</td>
                <td>{data.itemCategory}</td>
                <td><Link to={"/item/" + `${data.itemID}`}><button>To Item Page</button></Link></td>
                <td><Link to="/profile"><button>To User Page</button></Link></td>
                <td><button>Favorite</button></td>
            </tr>
        </>
    )
}