import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function LoadProfile() {
    const navigate = useNavigate()
    useEffect(() => {

        navigate("/profile/" + localStorage.getItem("userID"))
    }, [])

    return (
        <>
            <h1>Loading...</h1>
        </>
    )
}