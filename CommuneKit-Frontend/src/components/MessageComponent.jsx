import {useState, useEffect} from 'react'
import {getUserById} from "../services/UserService.jsx";

export default function MessageComponent(message) {
    const [name, setName] = useState('')
    useEffect(() => {
        getUserById(JSON.stringify(message.message.senderID))
            .then (res =>
                setName(res.data.userName)
            )
            .catch (err => console.log(err))
    }, [])

    return (
            <tr>
                <td>
                    <div className="actual-message">
                    <b>{name}: </b>
                    {message.message.message}
                    <div className="message-timestamp">{message.message.timestamp}</div>
                    </div>
                </td>
            </tr>
    )
}