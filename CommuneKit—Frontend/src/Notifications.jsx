/* Notifications: The page containing an account's notifications */
import './styles.css'
import { useState, useEffect } from 'react'
import RequestComponent from './RequestComponent'
import {getBorrowingRequests, getLendingRequests} from './services/RequestService.jsx'

export default function Notifications(userId) {
    const [lendingRequests, setLendingRequests] = useState([])
    const [borrowRequests, setBorrowRequests] = useState([])
    useEffect(() => {
        getBorrowingRequests(userId)
            .then (res => {
                setLendingRequests(res.data);
            })
            .catch (err => console.log(err))
        getLendingRequests(userId)
            .then(res => {
                setBorrowRequests(res.data);
            })
            .catch(err => console.log(err))
    })
    return (
        <>
            <div id="notif-table">
            <table>
                <tbody>
                {lendingRequests.map(item => (
                    <RequestComponent data={item} isLending={true}/>
                ))}
                {borrowRequests.map(item => (
                    <RequestComponent data={item} isLending={false}/>
                ))}
                </tbody>
            </table>
            </div>
        </>
    )
}