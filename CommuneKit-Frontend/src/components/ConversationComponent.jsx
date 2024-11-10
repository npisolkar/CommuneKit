import {useState, useEffect, useRef} from 'react'
import {getConversation, createMessage} from "../services/MessageService.jsx"
import MessageComponent from './MessageComponent.jsx'

export default function ConversationComponent(user2) {
    const [conversation, setConversation] = useState([])
    const endRef = useRef(null)
    const sendMessage = async (e) => {
        e.preventDefault()
        try {
            console.log("going to send " + JSON.stringify(messageData))
            const response = await createMessage(JSON.stringify(messageData))
            console.log("response: " + JSON.stringify(response.data))
            e.target.reset();
        } catch (e) {
            console.log(e)
        }
    }

    const scrollToElement = () => {
        const {current} = endRef
        if (current !== null){
            current.scrollIntoView({behavior: "smooth"})
        }
    }

    useEffect(scrollToElement, [])

    useEffect(() => {
        getConversation(user2)
            .then ((res) => {
                setConversation(res.data)
            })
            .catch (err => console.log(err))
    }, [sendMessage])

    const [messageData, setMessageData] = useState({
        senderID:localStorage.getItem("userID"),
        receiverID:user2.user2,
        message:'',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setMessageData({...messageData, [name]: value});
    }

    return (
        <div>
            <div>Messages</div>
        <div id="message-container">
            <table>
                <thead>
                <tr>
                    <th id="messages-header">Messages</th>
                </tr>
                </thead>
                <tbody>
                {conversation.map(message => (
                    <MessageComponent message={message}/>
                ))}
                </tbody>
            </table>
        </div>
        <form onSubmit={sendMessage}>
            <div id="message-bar">
                <input type="text" name="message" onChange={handleInputChange}/>
                <button type="submit">Send</button>
            </div>
            </form>
        </div>
)
}