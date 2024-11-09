import {useState, useEffect} from 'react'
import {getConversation, createMessage} from "../services/MessageService.jsx"
import MessageComponent from './MessageComponent.jsx'

export default function ConversationComponent(user2) {
    const [conversation, setConversation] = useState([])
    useEffect(() => {
        getConversation(user2)
            .then ((res) => {
                setConversation(res.data)
                console.log("got conversation" + JSON.stringify(res.data))
            })
            .catch (err => console.log(err))
    }, [])

    const [messageData, setMessageData] = useState({
        senderID:localStorage.getItem("userID"),
        receiverID:user2.user2,
        message:'',
    });

    const sendMessage = async (e) => {
        e.preventDefault()

        try {
            console.log("going to send " + JSON.stringify(messageData))
            const response = await createMessage(JSON.stringify(messageData))
            console.log("response: " + JSON.stringify(response.data))
        } catch (e) {
            console.log(e)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setMessageData({...messageData, [name]: value});
    }

    return (
        <div id="message-container">
            <table>
                <thead>
                    <tr>
                        <th>Messages</th>
                    </tr>
                </thead>
                <tbody>
                {conversation.map(message => (
                        <MessageComponent message={message}/>
                    ))}
                </tbody>
            </table>
            <form onSubmit={sendMessage}>
                <div id="message-bar">
                    <input type="text" name="message" onChange={handleInputChange}/>
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}