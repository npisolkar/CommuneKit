import './styles.css'
import { useState } from 'react'
import ItemTable from "./ItemTable.jsx";
import { BrowserRouter as Router, Route, Link, Routes,} from "react-router-dom";

function EditButton({isOwn}) {
    if (isOwn) {
        return (
            <button>Edit</button>
        )
    }
    else {
        return null
    }
}

export function ToggleTextField({height, width}) {
        return (
            <>
                <input type="text" style={{height:height, width:width}}/>
            </>
        )
}

export default function Profile({isOwn}) {
    return (
        <>
            <div className="about-box">
                <div>
                <h2 id="profile-username">Firstname Lastname</h2>
                </div>
                <div>
                <ToggleTextField height={"200px"} width={"200px"} />
                </div>
            </div>
            <div id="edit-profile">
                <EditButton isOwn={isOwn}/>
            </div>
            <div className="home-items" id="profile-posted">
                <ItemTable headName={"My Posted Items"} />
            </div>
            <div className="home-items" id="profile-borrowed">
                <ItemTable headName={"My Borrowed Items"} />
            </div>
            <script>

            </script>
        </>
    )
}