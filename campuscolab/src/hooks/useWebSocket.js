import { useEffect, useState } from "react";

const useWebSocket = (userId, group) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://127.0.0.1:8000/ws/chat/");
        
        ws.onopen = () => {
            console.log("Connected to WebSocket");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.history) {
                // ✅ Load chat history
                setMessages(data.history);
            } else {
                // ✅ Append new message
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        };

        ws.onclose = () => {
            console.log("Disconnected from WebSocket");
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [group]); // ✅ Reconnect if group changes

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ message }));
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;
