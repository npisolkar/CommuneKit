/* Home: The home page, containing lists of items. */
import './styles.css'
import ItemTable from './ItemTable.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    if ( localStorage.getItem("userID") == null)  {
        navigate('/login');
    } else {
        return (
            <>
                <div className="home-items" id="posted-header">
                    <ItemTable headName="My Posted Items"/>
                </div>
                <div className="home-items" id="borrowed-header">
                    <ItemTable headName="My Borrowed Items"/>
                </div>
                <div className="home-items" id="suggested-items">
                    <ItemTable headName="Suggested Items"/>
                </div>
            </>
        )
    }
}