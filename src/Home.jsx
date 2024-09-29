import './styles.css'
import ItemTable from './ItemTable.jsx'
import { useState } from 'react'

export default function Home() {
    return (
        <>
            <div className="home-items" id="posted-header">
                <ItemTable headName="My Posted Items"/>
            </div>
            <div className="home-items" id="borrowed-header">
                <ItemTable headName="My Posted Items"/>
            </div>
            <div className="home-items" id="suggested-items">
                <ItemTable headName="Suggested Items"/>
            </div>
        </>
    )
}