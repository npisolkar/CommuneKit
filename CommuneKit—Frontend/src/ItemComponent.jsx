import axios from 'axios';
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function ItemComponent({data}) {
    return (
        <>
            <tbody>
                <tr>
                    <td>{data.itemID}</td>
                    <td>{data.itemName}</td>
                    <td>{data.itemDescription}</td>
                    <td>{data.itemCategory}</td>
                    <td><Link to="">To Item Page</Link></td>
                </tr>
            </tbody>
        </>
    )
}