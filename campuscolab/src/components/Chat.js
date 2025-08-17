import React, { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";

const Chat = ({ userId, group }) => {
    const { messages, sendMessage } = useWebSocket(userId, group);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage(""); // Clear input
        }
    };

    return (
        <div className="chat-container">
            <h2>Group Chat: {group}</h2>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
