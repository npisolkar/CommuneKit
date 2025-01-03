import {useState, useEffect, useRef} from 'react'
import {getConversation, createMessage} from "../services/MessageService.jsx"
import MessageComponent from './MessageComponent.jsx'

export const ConversationComponent = (user2) => {
    const [conversation, setConversation] = useState([])
    const endRef = useRef(null)
    const sendMessage = async (e) => {
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
            endRef.current.scrollTo(0, endRef.current.scrollHeight)
        }
    }

    const [messageData, setMessageData] = useState({
        senderID:localStorage.getItem("userID"),
        receiverID:user2.user2,
        message:'',
    });

    useEffect(
        scrollToElement
    , [conversation])

    useEffect(() => {
        getConversation(user2)
            .then ((res) => {
                setConversation(res.data)
            })
            .catch (err => console.log(err))
    }, [])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setMessageData({...messageData, [name]: value});
    }

    return (
        <div>
            <div id="messages-header" className="conversation">Messages</div>
        <div id="message-container" className="conversation" ref={endRef}>
            <table>
                <tbody>
                {conversation.map(message => (
                    <MessageComponent message={message}/>
                ))}
                </tbody>
            </table>
        </div>
        <form onSubmit={sendMessage}>
            <div id="message-bar" className="conversation">
                <input type="text" name="message" onChange={handleInputChange}/>
                <button type="submit">Send</button>
            </div>
            </form>
        </div>
)
}