import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://campuscolab.onrender.com/api";

const Chatbox = ({ userDetails }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedReceiver, setSelectedReceiver] = useState("All"); // Default to "All"
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const token = sessionStorage.getItem("accessToken");
  

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { name, role } = userDetails;

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.reverse());
      } else {
        console.error("Failed to fetch messages:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;
  
    console.log("Sending Message as:", name, "Role:", role);  // Debugging
  
    const messageData = {
      sender: name,
      receiver: selectedReceiver,
      content: inputMessage,
      message_type: "group", 
      role: role,  // Ensure role is being sent correctly
    };
  
    try {
      const response = await fetch(`${API_URL}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      });
  
      if (response.ok) {
        setInputMessage("");
        fetchMessages();
      } else {
        const errorData = await response.json();
        console.error("Error sending message:", errorData);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  return (
    <div className="chat-container shadow-lg p-3 rounded d-flex flex-column" style={{ height: "87vh", marginTop:"100px",width: "480px", background: "#e3f2fd", borderRadius: "12px" }}>
      <h5 className="text-center text-primary fw-bold">Campus Chat</h5>

      <div className="chat-box border rounded p-2 flex-grow-1 d-flex flex-column" style={{ background: "#fff", overflowY: "auto", borderRadius: "10px", padding: "10px" }} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message-container ${msg.sender_name === name ? "user-message" : "other-message"}`}>
            <div className="message-header">
              <strong>{msg.sender_name || msg.sender} ({msg.role || "No Role"})</strong>
            </div>
            <div className="message-body">{msg.content}</div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="receiver-selection my-2">
        <select className="form-select" value={selectedReceiver} onChange={(e) => setSelectedReceiver(e.target.value)}>
          <option value="All">All</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
      </div>

      <div className="input-group mt-2">
        <input
          type="text"
          className="form-control rounded-start"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          autoFocus
        />
        <button className="btn btn-primary rounded-end" onClick={sendMessage}>
          <i className="bi bi-send"></i>
        </button>
      </div>

      <style>
        {`
          .message-container {
            max-width: 75%;
            padding: 12px;
            margin-bottom: 8px;
            border-radius: 12px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          }
          .user-message {
            background: linear-gradient(135deg, #42a5f5, #1e88e5);
            color: white;
            align-self: flex-end;
            text-align: right;
            border-top-right-radius: 0;
          }
          .other-message {
            background: #f1f1f1;
            color: black;
            align-self: flex-start;
            text-align: left;
            border-top-left-radius: 0;
          }
          .message-header {
            font-size: 0.85rem;
            font-weight: bold;
            opacity: 0.8;
          }
          .message-body {
            font-size: 1rem;
            margin-top: 5px;
          }
          .chat-box::-webkit-scrollbar {
            width: 6px;
          }
          .chat-box::-webkit-scrollbar-thumb {
            background: #90caf9;
            border-radius: 3px;
          }
        `}
      </style>
    </div>
  );
};

export default Chatbox;
